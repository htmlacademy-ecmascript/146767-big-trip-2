import EditPointView from '../view/edit-point-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../constants.js';

export default class NewPointPresenter {
  #pointsModel = null;
  #ListContainer = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ListContainer, pointsModel, onDataChange, onDestroy}) {
    this.#pointsModel = pointsModel;
    this.#ListContainer = ListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      point: this.#pointsModel.newPoint,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      isEditMode: false,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointEditComponent, this.#ListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    if (
      !point.destination ||
      !point.basePrice ||
      point.basePrice < 0 ||
      point.dateFrom === point.dateTo
    ) {
      this.destroy();
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
