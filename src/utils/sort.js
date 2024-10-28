import {SortType} from '../constants.js';

export const sort = {
  [SortType.DAY]: (points) => points.sort(),
  [SortType.EVENT]: (points) => points.sort(),
  [SortType.TIME]: (points) => points.sort(),
  [SortType.PRICE]: (points) => points.sort(),
  [SortType.OFFERS]: (points) => points.sort(),
};
