import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

export default class ListPresenter {
  init() {
    render(new ListFilterView(), filtersContainer);
    render(new ListSortView(), sortContainer);
  }
}
