import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

export const headerContainer = document.querySelector('.trip-main');
export const filtersContainer = document.querySelector('.trip-controls__filters');
export const mainContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const listPresenter = new ListPresenter({
  pointsModel,
  filterModel
});

listPresenter.init();
