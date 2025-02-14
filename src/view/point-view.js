import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeTaskDueDate,
  getDateDiff
} from '../utils/task.js';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT
} from '../constants.js';
import he from 'he';

const isFavoritePoint = (favorite) => Boolean(favorite);

const getFavoriteClassName = (favorite) => isFavoritePoint(favorite)
  ? '--active'
  : '';

const createOffersTemplate = (offers) => offers.map(({title, price}) =>
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
).join('');

function createItemTemplate(point, destination, offers) {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite
  } = point;
  const date = humanizeTaskDueDate(dateFrom, DATE_FORMAT);
  const dateTime = humanizeTaskDueDate(dateFrom, DATE_TIME_FORMAT);
  const timeFrom = humanizeTaskDueDate(dateFrom, TIME_FORMAT);
  const timeTo = humanizeTaskDueDate(dateTo, TIME_FORMAT);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateTime}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${destination?.name ?? ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${getDateDiff(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(String(basePrice))}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offers)}
        </ul>
        <button class="event__favorite-btn event__favorite-btn${getFavoriteClassName(isFavorite)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, destination, offers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createItemTemplate(
      this.#point,
      this.#destination,
      this.#offers
    );
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
