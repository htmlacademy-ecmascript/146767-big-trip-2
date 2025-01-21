import dayjs from 'dayjs';
import {
  SORT_DATE_FORMAT,
  DIFF_DATE_FORMAT
} from '../constants.js';

export const humanizeTaskDueDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);

const getDateWeight = (date) => {
  const dateFrom = humanizeTaskDueDate(date.dateFrom, SORT_DATE_FORMAT);
  const dateTo = humanizeTaskDueDate(date.dateTo, SORT_DATE_FORMAT);

  return dayjs(dateTo).diff(dayjs(dateFrom));
};

export const sortDateDesc = (previousDate, nextDate) => {
  const weightPreviousDate = getDateWeight(previousDate);
  const weightNextDate = getDateWeight(nextDate);

  return weightNextDate - weightPreviousDate;
};

export const sortPriceDesc = (previousPrice, nextPrice) =>
  nextPrice.basePrice - previousPrice.basePrice;

export const getDateDiff = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), DIFF_DATE_FORMAT);
  const minutes = Math.floor(diffInMinutes % 60);
  const hours = Math.floor(diffInMinutes / 60);
  const days = Math.floor(hours / 24);

  const addZero = (num) => num.toString().padStart(2, '0');

  if (!diffInMinutes) {
    return '';
  }

  if (hours < 1) {
    return `
      ${addZero(diffInMinutes)}M
    `;
  }

  if (days < 1) {
    return `
      ${addZero(hours)}H
      ${addZero(minutes)}M
    `;
  }

  return `
    ${addZero(days)}D
    ${addZero(hours % 24)}H
    ${addZero(minutes)}M
  `;
};
