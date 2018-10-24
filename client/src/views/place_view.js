const PubSub = require('../helpers/pub_sub.js');

const PlaceView = function (item) {
  this.item = item;
  this.element = null;
};

PlaceView.prototype.createPlaceOnList = function () {
  // console.log(place);

  const placeItem = document.createElement('div');
  placeItem.classList.add('place'); //add class to each place container so we can style

    if (this.item.completed) {
      placeItem.classList.add('completed');
    } // for css styling purposes when checkbox is ticked

  const attraction = this.createAttraction(this.item.attraction);
  placeItem.appendChild(attraction);

  const location = this.createDetail('Location', this.item.location);
  placeItem.appendChild(location);

  const country = this.createDetail('Country', this.item.country);
  placeItem.appendChild(country);

  const category = this.createDetail('Category', this.item.category);
  placeItem.appendChild(category);

  const checkbox = this.createCheckbox();
  placeItem.appendChild(checkbox);

  const deleteButton = this.createDeleteButton(this.item._id); // mongo ID str
  placeItem.appendChild(deleteButton);

  //reassign the property this.element to the thing holding all the newly created place info, then return that thing!
  this.element = placeItem;
  return placeItem;
};



PlaceView.prototype.createAttraction = function (text) {
  const attraction = document.createElement('h4');
  attraction.textContent = text;
  return attraction;
};

PlaceView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};


PlaceView.prototype.createDeleteButton = function (placeID) {
  const button = document.createElement('button');
  button.classList.add('delete-button');
  button.value = placeID; // id which will be passed in to the reqest.delete fn

  // this is where app listens for delete click. then the event value is the id b/c of how delete button value is defined!
  button.addEventListener('click', (event) => {
    PubSub.publish('PlaceView:place-delete-clicked', event.target.value);
  });
  return button;
};

PlaceView.prototype.createCheckbox = function () {
  const cbxDiv = document.createElement('div')
  const cbxLabel = document.createElement('label')
  cbxLabel.for = 'visited';
  cbxLabel.textContent = 'Visited?';
  cbxDiv.appendChild(cbxLabel);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = this.item.completed;
  checkbox.id = 'visited';
  cbxLabel.appendChild(checkbox);

  // this is where app listens for checkbox tick.
  checkbox.addEventListener('click', (event) => {
    const isChecked = event.target.checked;
    this.handleCheckboxClicked(isChecked);
  });
  return cbxDiv;
};

PlaceView.prototype.handleCheckboxClicked = function (checkboxState) {
  this.item.completed = checkboxState;
  PubSub.publish('PlaceView:place-checkbox-ticked', this.item);
};

module.exports = PlaceView;
