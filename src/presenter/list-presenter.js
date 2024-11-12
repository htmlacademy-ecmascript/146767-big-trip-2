import ListContainerView from '../view/list-container-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {headerContainer, filtersContainer, mainContainer} from '../main.js';
import {render} from '../framework/render.js';
import {generateFilter} from '../mocks/filter.js';
import {sortDateDown, sortPriceDown} from '../utils/task.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../constants.js';

export default class ListPresenter {
  #pointsModel = null;
  #listSort = null;
  #listPoints = [];
  #sourcedListPoints = [];
  #currentSortType = SortType.DAY;

  #listContainer = new ListContainerView();
  #listEmpty = new ListEmptyView();
  #eventAddButton = new EventAddButtonView();
  #pointPresenters = new Map();

  constructor({pointsModel}) {
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.getPoints()];
    this.#sourcedListPoints = [...this.#pointsModel.getPoints()];

    this.#renderApp();
  }

  #renderFilters() {
    const filters = generateFilter(this.#listPoints);

    render(new ListFilterView({filters}), filtersContainer);
  }

  #renderAddButton() {
    render(this.#eventAddButton, headerContainer);
  }

  #renderListEmpty() {
    render(this.#listEmpty, mainContainer);
  }

  #renderSort() {
    this.#listSort = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#listSort, mainContainer);
  }

  #renderPointsList() {
    render(this.#listContainer, mainContainer);

    this.#listPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderApp() {
    this.#renderFilters();
    this.#renderAddButton();

    if (!this.#listPoints.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME.type:
        this.#listPoints.sort(sortDateDown);
        break;
      case SortType.PRICE.type:
        this.#listPoints.sort(sortPriceDown);
        break;
      default:
        this.#listPoints = [...this.#sourcedListPoints];
    }

    this.#currentSortType.type = sortType;
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#listContainer,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType.type === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatePoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };
}
