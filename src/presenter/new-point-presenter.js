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
      defaultPoint: this.#pointsModel.newPoint,
      defaultDestination: this.#pointsModel.newDestination,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      isEditMode: false,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDestroy: this.#handleDeleteClick
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: 'test', ...point}
    );
    this.destroy();
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
