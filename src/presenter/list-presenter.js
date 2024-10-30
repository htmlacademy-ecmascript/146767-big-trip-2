import ListContainerView from '../view/list-container-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventAddButtonView from '../view/event-add-button-view.js';
import {headerContainer, filtersContainer, mainContainer} from '../main.js';
import {render, replace} from '../framework/render.js';
import {generateFilter} from '../mocks/filter.js';

export default class ListPresenter {
  #pointsModel = null;
  #listPoints = [];

  #listComponent = new ListContainerView();
  #listEmpty = new ListEmptyView();
  #eventAddButton = new EventAddButtonView();

  constructor({pointsModel}) {
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.getPoints()];

    this.#renderList();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destination: this.#pointsModel.getDestinationById(
        point.destination),
      offers: this.#pointsModel.getOfferById(
        point.type,
        point.offers
      ),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      destination: this.#pointsModel.getDestinationById(
        point.destination),
      destinations: this.#pointsModel.getDestinations(),
      offers: this.#pointsModel.getOffers(),
      isEditMode: true,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
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
    render(this.#listComponent, mainContainer);

    this.#listPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
