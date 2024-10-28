import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = ({type}, disabledSortItems, isChecked) => (
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      ${isChecked ? 'checked' : ''}
      ${disabledSortItems.includes(type) ? 'disabled' : ''}
    >
    <label
      class="trip-sort__btn"
      for="sort-${type}">
      ${type}
    </label>
  </div>`
);

const createListSortTemplate = (sortItems, disabledSortItems) => {
  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItemTemplate(sort, disabledSortItems, index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
};

export default class ListSortView extends AbstractView {
  #sorts = [];
  #disabledSorts = [];

  constructor({sorts}, disabledSorts) {
    super();
    this.#sorts = sorts;
    this.#disabledSorts = disabledSorts;
  }

  get template() {
    return createListSortTemplate(
      this.#sorts,
      this.#disabledSorts
    );
  }
}
