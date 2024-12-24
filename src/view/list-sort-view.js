import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../constants.js';

const createSortItemTemplate = ({value, state}, currentSortType) => (
  `<div class="trip-sort__item  trip-sort__item--${value}">
    <input
      id="sort-${value}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="${value}"
      ${value === currentSortType ? 'checked' : ''}
      ${state === 'enabled' ? '' : 'disabled'}
    >
    <label
      class="trip-sort__btn"
      for="sort-${value}">
      ${value}
    </label>
  </div>`
);

const createListSortTemplate = (sortItems, currentSortType) => {
  const sortItemsTemplate = Object
    .entries(sortItems)
    .map((sortValues) => createSortItemTemplate(sortValues[1], currentSortType))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
};

export default class ListSortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(SortType, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.value);
  };
}
