import ListFilterView from './view/list-filter-view.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');

export default class ListPresenter {
  init() {
    render(new ListFilterView(), filtersContainer);
  }
}
