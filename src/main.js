import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

export const headerContainer = document.querySelector('.trip-main');
export const filtersContainer = document.querySelector('.trip-controls__filters');
export const mainContainer = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic aB1deF23Ghi4jkl5m';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const listPresenter = new ListPresenter({
  pointsModel,
  filterModel
});

listPresenter.init();
pointsModel.init();
