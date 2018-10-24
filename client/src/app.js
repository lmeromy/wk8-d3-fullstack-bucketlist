const Places = require('./models/places.js');
const PlacesGridView = require('./views/places_grid_view.js');
const PlaceFormView = require('./views/place_form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  // console.log('Javascript loaded');

  const placesForm = document.querySelector('#places-form');
  const placesFormView = new PlaceFormView(placesForm);
  placesFormView.bindEvents();

  const placesContainer = document.querySelector('#places');
  const placesGridView = new PlacesGridView(placesContainer);
  placesGridView.bindEvents();

  const placesUrl = 'http://localhost:3000/api/places';
  const places = new Places(placesUrl);
  places.bindEvents(); // this will call the event listeners
  places.getData(); // this will actually bring in the data

});
