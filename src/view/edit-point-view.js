import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  EDIT_POINT_BUTTON_TEXT,
  NEW_POINT_BUTTON_TEXT
} from '../constants.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';

import'flatpickr/dist/flatpickr.min.css';

const createEventItemTemplate = (offers, checkedType) =>
  offers.map(({type}) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden"  type="radio" name="event-type" value="${type}" ${checkedType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}"  for="event-type-${type}-1">${type}</label>
    </div>`
  ).join('');

const createDestinationItemTemplate = (destinations) =>
  destinations.map(({name}) =>
    `<option value="${name}"></option>`
  ).join('');

const createOfferItemTemplate = (offersByType, point, type) =>
  offersByType.offers.map(({id, title, price}) => {
    const isChecked = point.offers.includes(id)
      ? 'checked'
      : '';

    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer-${type}-${id}"
          value="${id}"
          ${isChecked}
        />
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');

const createOffersContainerTemplate = (offers, point, type) => {
  const offersByType = offers.find((offer) => offer.type === type);

  if (!offersByType.offers.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOfferItemTemplate(offersByType, point, type)}
      </div>
    </section>`
  );
};

const createDescriptionItemTemplate = (description) => {
  if (!description) {
    return '';
  }

  return (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>`
  );
};

const createImageItemTemplate = (images) => {
  if (!images.length) {
    return '';
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${images.map(({src}) =>`<img class="event__photo" src="${src}" alt="Event photo">`)
      .join('')}
      </div>
    </div>`
  );
};

const createDestinationContainerTemplate = (description, pictures) => {
  if (!description && !pictures?.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      ${createDescriptionItemTemplate(description)}
      ${createImageItemTemplate(pictures)}
    </section>`
  );
};

const createRollupButtonTemplate = (isEditMode) => {
  if (!isEditMode) {
    return '';
  }

  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
};

const getResetButtonText = (isEditMode) =>
  isEditMode
    ? EDIT_POINT_BUTTON_TEXT
    : NEW_POINT_BUTTON_TEXT;

function createEditPointTemplate(
  point,
  destinations,
  offers,
  isEditMode,
) {
  const {
    id,
    type,
    basePrice,
    dateFrom,
    dateTo
  } = point;

  const destination = destinations.find((currentDestination) =>
    currentDestination.id === point.destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventItemTemplate(offers, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${createDestinationItemTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${he.encode(String(basePrice))}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">
            ${getResetButtonText(isEditMode)}
          </button>
          ${createRollupButtonTemplate(isEditMode)}
        </header>
        <section class="event__details">

          ${createOffersContainerTemplate(offers, point, type)}

          ${createDestinationContainerTemplate(destination?.description, destination?.pictures)}
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;
  #destinations = null;
  #offers = null;
  #isEditMode = null;
  #handleFormSubmit = null;
  #handleButtonRollupClick = null;
  #handleDeleteClick = null;

  constructor({
    point,
    destinations,
    offers,
    isEditMode,
    onFormSubmit,
    onButtonRollupClick,
    onDeleteClick,
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isEditMode = isEditMode;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonRollupClick = onButtonRollupClick;
    this.#handleDeleteClick = onDeleteClick;

    this._setState(EditPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    if (this.element.querySelector('.event__section--offers')) {
      this.element.querySelector('.event__section--offers')
        .addEventListener('change', this.#offerChangeHandler);
    }

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#buttonRollupHandler);
    }

    this.#setDatepicker();
  }

  get template() {
    return createEditPointTemplate(
      this._state,
      this.#destinations,
      this.#offers,
      this.#isEditMode
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const currentDestination = this.#destinations
      .find((destination) => destination.name === evt.target.value);

    if (!currentDestination) {
      return;
    }

    this.updateElement({
      destination: currentDestination.id
    });
  };

  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    const currentOffer = evt.target.value;

    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, currentOffer]
      });
    } else {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== currentOffer)
      });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #buttonRollupHandler = (evt) => {
    evt.preventDefault();

    this.#handleButtonRollupClick();
  };

  #setDatepicker = () => {
    const [dateFromEl, dateToEl] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromEl,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToEl,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({dateFrom: dayjs(userDate).toISOString()});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({dateTo: dayjs(userDate).toISOString()});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {
      ...point
    };
  }

  static parseStateToPoint(state) {
    const point = {
      ...state
    };

    return point;
  }
}
