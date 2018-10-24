const PubSub = require('../helpers/pub_sub.js');

const PlaceFormView = function(form) {
  this.form = form;
};


PlaceFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

PlaceFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newPlace = this.createPlace(event.target);
  PubSub.publish('PlaceFormView:place-submitted', newPlace);
  event.target.reset();
};

// maybe need to add "Date Visited!"
//default value is "Not Yet Visited"
PlaceFormView.prototype.createPlace = function (form) {
  const newPlace = {
    attraction: form.attraction.value,
    location: form.location.value,
    country: form.country.value,
    category: form.category.value
    // console.log(form.visited)
    // visited: form.visited.value

  };
  return newPlace;
};

module.exports = PlaceFormView;
