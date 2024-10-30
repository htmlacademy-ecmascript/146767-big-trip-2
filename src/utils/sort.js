import {SortType} from '../constants.js';

export const sort = {
  [SortType.DAY.value]: (points) => points,
  [SortType.EVENT.value]: (points) => points,
  [SortType.TIME.value]: (points) => points,
  [SortType.PRICE.value]: (points) => points,
  [SortType.OFFERS.value]: (points) => points,
};
