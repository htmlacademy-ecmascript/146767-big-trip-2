import dayjs from 'dayjs';
import {SORT_DATE_FORMAT} from '../constants.js';

export const humanizeTaskDueDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);

const getDateWeight = (date) => {
  const dateFrom = humanizeTaskDueDate(date.dateFrom, SORT_DATE_FORMAT);
  const dateTo = humanizeTaskDueDate(date.dateTo, SORT_DATE_FORMAT);

  return dayjs(dateTo).diff(dayjs(dateFrom));
};

export const sortDateDesc = (a, b) => {
  const weightA = getDateWeight(a);
  const weightB = getDateWeight(b);

  return weightB - weightA;
};

export const sortPriceDesc = (a, b) => b.basePrice - a.basePrice;
