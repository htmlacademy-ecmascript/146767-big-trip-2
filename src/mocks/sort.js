import {sort} from '../utils/sort.js';

export const generateSort = (points) => Object.entries(sort).map(
  ([sortType, sortPoints]) => ({
    type: sortType,
    point: sortPoints(points)
  })
);
