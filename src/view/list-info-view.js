import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const getTotalPrice = (points, addedOffers) => {
  const pointsPrice = points
    .reduce((totalPrice, point) => totalPrice + point.basePrice, 0);

  let totalOffersPrice = 0;

  addedOffers.forEach((offer) => {
    offer.map((point) => {
      totalOffersPrice += point.price;
    });
  });

  return pointsPrice + totalOffersPrice;
};

const getTotalDate = (points) => {
  const startDate = dayjs(points[0].dateFrom).format('DD MMM');
  const endDate = dayjs(points[points.length - 1].dateTo).format('DD MMM');

  return (
    `${startDate} &mdash;&nbsp;${endDate}`
  );
};

const getCityById = (destinations, cityId) =>
  destinations.find((destination) => destination.id === cityId).name;

const getFirstAndLastPoint = (points, destinations) => {
  const firstCityId = points[0].destination;
  const secondCityId = points.length > 1 ? points[1].destination : null;
  const lastCityId = points[points.length - 1].destination;

  if (!points.length) {
    return '';
  }

  if (points.length === 1) {
    return getCityById(destinations, firstCityId);
  }

  if (points.length === 2) {
    return (
      `${getCityById(destinations, firstCityId)}
        &mdash;&nbsp;
      ${getCityById(destinations, secondCityId)}
    `);
  }

  if (points.length === 3) {
    return (
      `${getCityById(destinations, firstCityId)}
        &mdash;&nbsp;
      ${getCityById(destinations, secondCityId)}
        &mdash;&nbsp;
      ${getCityById(destinations, lastCityId)}
    `);
  }

  if (points.length > 3) {
    return (
      `${getCityById(destinations, firstCityId)}
        &mdash;&nbsp;
        ...
        &mdash;&nbsp;
      ${getCityById(destinations, lastCityId)}
    `);
  }
};

function createListInfoTemplate(points, addedOffers, destinations) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${getFirstAndLastPoint(points, destinations)}
        </h1>

        <p class="trip-info__dates">${getTotalDate(points)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points, addedOffers)}</span>
      </p>
    </section>`
  );
}

export default class ListInfoView extends AbstractView {
  #points = [];
  #addedOffers = [];
  #destinations = [];

  constructor({points, addedOffers, destinations}) {
    super();
    this.#points = points;
    this.#addedOffers = addedOffers;
    this.#destinations = destinations;
  }

  get template() {
    return createListInfoTemplate(
      this.#points,
      this.#addedOffers,
      this.#destinations
    );
  }
}
