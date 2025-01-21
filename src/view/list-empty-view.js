import AbstractView from '../framework/view/abstract-view.js';
import {FilterType, ERROR_MESSAGE_TEXT} from '../constants.js';

const ListEmptyTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

function createListEmptyTemplate(filterType, errorMessage) {
  const ListEmptyTextValue = ListEmptyTextType[filterType];

  return `<p class="trip-events__msg">
    ${errorMessage ? ERROR_MESSAGE_TEXT : ListEmptyTextValue}
  </p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  #errorMessage = null;

  constructor({filterType, errorMessage}) {
    super();
    this.#filterType = filterType;
    this.#errorMessage = errorMessage;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType, this.#errorMessage);
  }
}
