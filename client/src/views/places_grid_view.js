const PubSub = require('../helpers/pub_sub.js');
const PlaceView = require('./place_view.js');

const PlacesGridView = function (container) {
  this.container = container;
};

PlacesGridView.prototype.bindEvents = function () {
  PubSub.subscribe('Places:data-loaded', (event) => {
    const places = event.detail;
    this.renderAll(places);
  });
};

PlacesGridView.prototype.renderAll = function (places) {
  this.container.innerHTML = '';
  // const placeView = new PlaceView(this.container);
  places.forEach((place) => this.render(place));
};

PlacesGridView.prototype.render = function (place) {
  const placeView = new PlaceView(place);
  const placeItem = placeView.createPlaceOnList();
  this.container.appendChild(placeItem);
};

module.exports = PlacesGridView;
