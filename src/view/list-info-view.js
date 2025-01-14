import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const getTotalPrice = (points) =>
  points
    .reduce((totalPrice, point) => totalPrice + point.basePrice, 0);

const getTotalDate = (points) => {
  const startDate = dayjs(points[0].dateFrom).format('DD');
  const endDate = dayjs(points[points.length - 1].dateTo).format('DD MMM');

  return (
    `${startDate} &mdash;&nbsp;${endDate}`
  );
};

function createListInfoTemplate(points) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Starting point &mdash; ... &mdash; Ending point</h1>

        <p class="trip-info__dates">${getTotalDate(points)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
      </p>
    </section>`
  );
}

export default class ListInfoView extends AbstractView {
  #points = [];

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createListInfoTemplate(this.#points);
  }
}
