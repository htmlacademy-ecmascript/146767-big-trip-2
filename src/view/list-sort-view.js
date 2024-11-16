import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../constants.js';

const createSortItemTemplate = ({value, state}, isChecked) => (
  `<div class="trip-sort__item  trip-sort__item--${value}">
    <input
      id="sort-${value}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="${value}"
      ${isChecked ? 'checked' : ''}
      ${state === 'enabled' ? '' : 'disabled'}
    >
    <label
      class="trip-sort__btn"
      for="sort-${value}">
      ${value}
    </label>
  </div>`
);

const createListSortTemplate = (sortItems) => {
  const sortItemsTemplate = Object
    .entries(sortItems)
    .map((sortValues, index) => createSortItemTemplate(sortValues[1], index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
};

export default class ListSortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(SortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.value);
  };
}
