export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'MMM DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD';
export const SORT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DIFF_DATE_FORMAT = 'm';
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

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
