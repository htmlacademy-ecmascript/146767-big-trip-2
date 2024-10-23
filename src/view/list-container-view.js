import AbstractView from '../framework/view/abstract-view.js';

function createListContainerTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListContainerView extends AbstractView {
  get template() {
    return createListContainerTemplate();
  }
}
