import {createElement} from '../render.js';

function createItemContainerTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class ItemContainerView {
  getTemplate() {
    return createItemContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
