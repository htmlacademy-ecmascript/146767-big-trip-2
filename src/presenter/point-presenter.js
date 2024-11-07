import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #listContainer = null;
  #pointsModel = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#pointsModel.getDestinationById(
        this.#point.destination),
      offers: this.#pointsModel.getOfferById(
        this.#point.type,
        this.#point.offers
      ),
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destination: this.#pointsModel.getDestinationById(
        this.#point.destination),
      destinations: this.#pointsModel.getDestinations(),
      offers: this.#pointsModel.getOffers(),
      isEditMode: true,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer.element);
      return;
    }

    if (this.#listContainer.contsains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listContainer.contsains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }
}
