import ListContainerView from '../view/list-container-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {headerContainer, filtersContainer, mainContainer} from '../main.js';
import {render} from '../framework/render.js';
import {generateFilter} from '../mocks/filter.js';
import {updateItem} from '../utils/common.js';

export default class ListPresenter {
  #pointsModel = null;
  #listPoints = [];

  #listContainer = new ListContainerView();
  #listEmpty = new ListEmptyView();
  #eventAddButton = new EventAddButtonView();
  #pointPresenters = new Map();

  constructor({pointsModel}) {
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.getPoints()];

    this.#renderList();
  }

  #renderList() {
    const filters = generateFilter(this.#listPoints);

    render(new ListFilterView({filters}), filtersContainer);
    render(this.#eventAddButton, headerContainer);

    if (!this.#listPoints.length) {
      render(this.#listEmpty, mainContainer);
      return;
    }

    render(new ListSortView(), mainContainer);
    render(this.#listContainer, mainContainer);

    this.#listPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #handlePointChange = (updatePoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointsModel.clear();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#listContainer,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
