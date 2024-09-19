import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListContainerView from '../view/list-container-view.js';
import EditPointView from '../view/edit-point-view.js';
import ItemView from '../view/item-view.js';
import {render} from '../render.js';
import {getDefaultPoint, getDefaultDestination} from '../view/edit-point-view.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

export default class ListPresenter {
  listComponent = new ListContainerView();

  constructor({existPointsModel}) {
    this.existPointsModel = existPointsModel;
  }

  init() {
    this.listPoints = [...this.existPointsModel.getPoints()];

    render(new ListFilterView(), filtersContainer);
    render(new ListSortView(), sortContainer);
    render(this.listComponent, sortContainer);

    render(new EditPointView({
      points: getDefaultPoint(),
      destination: getDefaultDestination(),
      destinations: this.existPointsModel.getDestinations(),
      offers: this.existPointsModel.getOfferByType(
        getDefaultPoint().type
      )
    }), this.listComponent.getElement());

    render(new EditPointView({
      points: this.listPoints[0],
      destination: this.existPointsModel.getDestinationById(
        this.listPoints[0].destination),
      destinations: this.existPointsModel.getDestinations(),
      offers: this.existPointsModel.getOfferByType(
        this.listPoints[0].type
      ),
      addedOffers: [...this.existPointsModel.getOfferById(
        this.listPoints[0].type,
        this.listPoints[0].offers
      )]
    }), this.listComponent.getElement());

    for (let i = 0; this.listPoints.length; i++) {
      render(new ItemView({
        points: this.listPoints[i],
        destinations: this.existPointsModel.getDestinationById(
          this.listPoints[i].destination),
        offers: [...this.existPointsModel.getOfferById(
          this.listPoints[i].type,
          this.listPoints[i].offers
        )]
      }), this.listComponent.getElement());
    }
  }
}
