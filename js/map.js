
import { addressInput, childeFilter, childeForm, changePageState, form, mapFilters } from './form.js';
import { MAX_DECIMAL_NUMBERS, MAIN_PIN, PIN, START_POINTS, START_POINTS_OBJECT, ZOOM, COUNT_OF_PINS, HALF_VALUE_OF_PIN } from './const.js';
import { createCardTemplate } from './card.js';

changePageState(childeForm, form, true);
changePageState(childeFilter, mapFilters, true);

const map = L.map('map-canvas')
  .on('load', () => {
    changePageState(childeForm, form, false);
    changePageState(childeFilter, mapFilters, false);
    addressInput.value = START_POINTS;
  })
  .setView(START_POINTS_OBJECT, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN, MAIN_PIN],
  iconAnchor: [MAIN_PIN / HALF_VALUE_OF_PIN, MAIN_PIN],
});

const mainPinMarker = L.marker(
  START_POINTS_OBJECT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN, PIN],
  iconAnchor: [PIN / HALF_VALUE_OF_PIN, PIN],
});

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_DECIMAL_NUMBERS)}, ${coordinates.lng.toFixed(MAX_DECIMAL_NUMBERS)}`;
});

export const getMarkers = (pins) => pins
  .slice(0, COUNT_OF_PINS)
  .map((pin) => L.marker(
    {
      lat: pin.location.lat,
      lng: pin.location.lng,
    },
    {
      icon: icon,
    },
  ).addTo(map)
    .bindPopup(
      createCardTemplate(pin),
      {
        keepInView: true,
      },
    ));
