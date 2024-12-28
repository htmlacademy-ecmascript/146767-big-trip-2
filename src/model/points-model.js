import Observable from '../framework/observable.js';
import {points} from '../mocks/points.js';
import {offers} from '../mocks/offers.js';
import {destinations} from '../mocks/destinations.js';
import dayjs from 'dayjs';

export default class PointsModel extends Observable {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor() {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get newPoint() {
    return {
      id: 'new-point',
      basePrice: 0,
      dateFrom: dayjs().toISOString(),
      dateTo: dayjs().toISOString(),
      offers: [],
      type: 'flight'
    };
  }

  get newDestination() {
    return {
      name: '',
      description: '',
      pictures: []
    };

  }

  getOfferByType(type) {
    return this.offers
      .find((offer) => offer.type === type);
  }

  getOfferById(type, itemIds) {
    return this.getOfferByType(type).offers
      .filter((item) => itemIds
        .find((id) => id === item.id));
  }

  getDestinationById(id) {
    return this.destinations
      .find((item) => item.id === id);
  }

  updatePoint(updateType, update) {
    this.#points = this.#points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }
}
