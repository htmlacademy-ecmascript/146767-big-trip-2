import {FilterType} from '../constants.js';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => {
    if (dayjs(point.dateFrom).diff(dayjs()) > 0) {
      return point;
    }
  }),
  [FilterType.PRESENT]: (points) => points.filter((point) => {
    if (
      dayjs(point.dateFrom).diff(dayjs()) <= 0 &&
      dayjs(point.dateTo).diff(dayjs()) >= 0
    ) {
      return point;
    }
  }),
  [FilterType.PAST]: (points) => points.filter((point) => {
    if (dayjs(point.dateTo).diff(dayjs()) < 0) {
      return point;
    }
  }),
};
