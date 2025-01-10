import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';
import dayjs from 'dayjs';

export default class PointsModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
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

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = this.#points.map((point) => point.id === update.id ? update : point);

      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error('Can\'t update task');
    }
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

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const offers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch (error) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
