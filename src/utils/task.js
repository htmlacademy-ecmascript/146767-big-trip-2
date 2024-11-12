import dayjs from 'dayjs';
import {SORT_DATE_FORMAT} from '../constants.js';

export function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const getDateWeight = (date) => {
  const dateFrom = humanizeTaskDueDate(date.dateFrom, SORT_DATE_FORMAT);
  const dateTo = humanizeTaskDueDate(date.dateTo, SORT_DATE_FORMAT);

  return dayjs(dateTo).diff(dayjs(dateFrom));
};

const getWeightComparison = (a, b) => {
  if (a < b) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  return 0;
};

export const sortDateDown = (a, b) => {
  const weightA = getDateWeight(a);
  const weightB = getDateWeight(b);

  return getWeightComparison(weightA, weightB);
};

export const sortPriceDown = (a, b) => getWeightComparison(a.basePrice, b.basePrice);
