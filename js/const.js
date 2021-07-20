export const MIN_ELEMENT = 1;
export const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};
export const MAX_PRICE = 1000000;
export const MAX_DECIMAL_NUMBERS = 5;
export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 100;
export const MAX_ROOMS = 100;
export const TOKYO_LATITUDE = 35.6895;
export const TOKYO_LONGITUDE = 139.69171;
export const MAIN_PIN = 52;
export const PIN = 40;
export const START_POINTS = `${TOKYO_LATITUDE.toFixed(MAX_DECIMAL_NUMBERS)}, ${TOKYO_LONGITUDE}`;
export const START_POINTS_OBJECT = {
  lat: TOKYO_LATITUDE,
  lng: TOKYO_LONGITUDE,
};
export const ZOOM = 13;
export const COUNT_OF_PINS = 10;
