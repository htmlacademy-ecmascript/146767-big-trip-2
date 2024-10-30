export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'MMM DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD';
export const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const DEFAULT_POINT_COUNT = 0;
export const EDIT_POINT_BUTTON_TEXT = 'Delete';
export const NEW_POINT_BUTTON_TEXT = 'Cancel';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DAY: {
    value: 'day',
    state: 'enabled'
  },
  EVENT: {
    value: 'event',
    state: 'disabled'
  },
  TIME: {
    value: 'time',
    state: 'enabled'
  },
  PRICE: {
    value: 'price',
    state: 'enabled'
  },
  OFFERS: {
    value: 'offers',
    state: 'disabled'
  },
};
