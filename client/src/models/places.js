const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Places = function (url) {
  this.url = url;
  this.items = [];
};

Places.prototype.bindEvents = function () {
  PubSub.subscribe('PlaceFormView:place-submitted', (event) => {
    this.postPlace(event.detail);
  });

  PubSub.subscribe('PlaceView:place-delete-clicked', (event) => {
    this.deletePlace(event.detail);
  });

  PubSub.subscribe('PlaceView:place-checkbox-ticked', (event) => {
    this.updatePlace(event.detail); //this is logging what i want
    // console.log(event.detail);
  });
};

Places.prototype.postPlace = function (place) {
  const request = new Request(this.url);
  request.post(place)
  .then((places) => {
    this.items = places;
    PubSub.publish('Places:data-loaded', this.items);
  })
  .catch(console.error);
};

Places.prototype.deletePlace = function (placeID) {
  const request = new Request(this.url);
  request.delete(placeID)
  .then((places) => {
    this.items = places;
    PubSub.publish('Places:data-loaded', this.items);
  })
  .catch(console.error);
};

Places.prototype.updatePlace = function (place) {
  const id = place._id;
  const request = new Request(this.url);
  request.put(place, id) // must i call request on "this"? this.request?
  .then((places) => {
    this.items = places; //do i need?
    PubSub.publish('Places:data-loaded', this.items);
    // console.log(this.items);
  })
  .catch(console.error);
};

Places.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
  .then((places) => {
    this.items = places;
    PubSub.publish('Places:data-loaded', this.items);
  })
  .catch(console.error);
};


module.exports = Places;
