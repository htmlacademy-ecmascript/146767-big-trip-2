import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import ListContainerView from './view/list-container-view.js';
import ItemView from './view/item-view.js';
import EditPointView from './view/edit-point-view.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

export default class ListPresenter {
  listComponent = new ListContainerView();

  init() {
    render(new ListFilterView(), filtersContainer);
    render(new ListSortView(), sortContainer);
    render(this.listComponent, sortContainer);
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ItemView(), this.listComponent.getElement());
    }
  }
}
