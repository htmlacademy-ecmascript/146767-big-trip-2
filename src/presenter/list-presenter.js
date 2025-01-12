import ListContainerView from '../view/list-container-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {headerContainer, filtersContainer, mainContainer} from '../main.js';
import {remove, render} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import {sortDateDesc, sortPriceDesc} from '../utils/task.js';
import {
  SortType,
  UpdateType,
  UserAction,
  FilterType,
  TimeLimit
} from '../constants.js';

export default class ListPresenter {
  #pointsModel = null;
  #filterModel = null;
  #filterPresenter = null;
  #newPointPresenter = null;
  #listSort = null;
  #listEmpty = null;
  #eventAddButton = null;
  #currentSortType = SortType.DAY.value;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #loadingContainer = new LoadingView();
  #listContainer = new ListContainerView();
  #pointPresenters = new Map();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({pointsModel, filterModel}) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      ListContainer: this.#listContainer,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewFormClose
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME.value:
        return filteredPoints.sort(sortDateDesc);
      case SortType.PRICE.value:
        return filteredPoints.sort(sortPriceDesc);
    }

    return filteredPoints;
  }

  init() {
    this.#renderApp();
  }

  #renderFilters() {
    this.#filterPresenter = new FilterPresenter({
      filterContainer: filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });

    this.#filterPresenter.init();
  }

  #renderAddButton() {
    this.#eventAddButton = new EventAddButtonView({
      onClick: this.#handleEventAddButtonClick
    });

    render(this.#eventAddButton, headerContainer);
  }

  #renderListEmpty() {
    this.#listEmpty = new ListEmptyView({
      filterType: this.#filterType
    });

    render(this.#listEmpty, mainContainer);
  }

  #renderSort() {
    this.#listSort = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#listSort, mainContainer);
  }

  #renderNewPoint() {
    this.#currentSortType = SortType.DAY.value;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#listContainer,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    render(this.#listContainer, mainContainer);

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderLoading() {
    render(this.#loadingContainer, mainContainer);
  }

  #renderApp() {
    const pointsCount = this.points.length;

    this.#renderFilters();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderAddButton();

    if (!pointsCount) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }

  #clearList({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#filterPresenter.filterComponent);
    remove(this.#eventAddButton);
    remove(this.#loadingContainer);
    remove(this.#listSort);

    if (this.#listEmpty) {
      remove(this.#listEmpty);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.value;
    }
  }

  #handleNewFormClose = () => {
    this.#eventAddButton.element.disabled = false;
  };

  #handleEventAddButtonClick = () => {
    this.#renderNewPoint();

    this.#eventAddButton.element.disabled = true;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderApp();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();

        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }

        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();

        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();

        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }

        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderApp();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderApp();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearList();
        this.#renderApp();
        break;
    }
  };
}
