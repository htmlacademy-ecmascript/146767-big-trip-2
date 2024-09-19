import ListPresenter from './presenter/list-presenter.js';
import ExistPointsModel from './model/exist-points-model.js';

const existPointsModel = new ExistPointsModel();
const listPresenter = new ListPresenter({
  existPointsModel,
});

listPresenter.init();
