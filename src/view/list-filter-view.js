import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = ({type, count}, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value=${type}
      ${type === currentFilterType ? 'checked' : ''}
      ${count ? '' : 'disabled'}
    >
    <label
      class="trip-filters__filter-label"
      for="filter-${type}">
      ${type}
    </label>
  </div>`
);

const createListFilterTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class ListFilterView extends AbstractView {
  #filters = [];
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createListFilterTemplate(
      this.#filters,
      this.#currentFilter
    );
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
