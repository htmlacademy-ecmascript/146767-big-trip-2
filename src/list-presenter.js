import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import ListContainerView from './view/list-container-view.js';
import ItemContainerView from './view/item-container-view.js';
import ItemView from './view/item-view.js';
import NewPointView from './view/new-point-view.js';
import NewPointWithoutOffersView from './view/new-point-without-offers-view.js';
import NewPointWithoutDestinationView from './view/new-point-without-destination-view.js';
import EditPointView from './view/edit-point-view.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const getLastItem = () => {
  const items = document.querySelectorAll('.trip-events__item');

  return items[items.length - 1];
};

export default class ListPresenter {
  listComponent = new ListContainerView();

  init() {
    render(new ListFilterView(), filtersContainer);
    render(new ListSortView(), sortContainer);
    render(this.listComponent, sortContainer);
    render(new ItemContainerView(), this.listComponent.getElement());
    render(new EditPointView(), getLastItem());

    for (let i = 0; i < 3; i++) {
      render(new ItemContainerView(), this.listComponent.getElement());
      render(new ItemView(), getLastItem());
    }

    render(new ItemContainerView(), this.listComponent.getElement());
    render(new NewPointView(), getLastItem());
    render(new ItemContainerView(), this.listComponent.getElement());
    render(new NewPointWithoutOffersView(), getLastItem());
    render(new ItemContainerView(), this.listComponent.getElement());
    render(new NewPointWithoutDestinationView(), getLastItem());
  }
}
