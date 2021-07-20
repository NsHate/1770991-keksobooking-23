import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray } from '../utils/common.js';
import {
  MIN_ELEMENT, MAX_DECIMAL_NUMBERS, MIN_PRICE, MAX_PRICE
} from '../const.js';

const COUNT_OF_MOCK_OBJECTS = 10;
const MAX_PHOTOS = 3;
const MAX_COUNT_OF_AVATARS = 9;
const MIN_LOCATION_X = 35.65;
const MAX_LOCATION_X = 35.7;
const MIN_LOCATION_Y = 139.7;
const MAX_LOCATION_Y = 139.8;
const MAX_FEATURES = 6;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIME = `${getRandomPositiveInteger(12, 14)}:00`;

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Просторная студия в Акихабаре',
  'Рофлан скамейка',
  'Замок Алладина из Японии',
  'Квартира рядом с рестораном где дают не две палочки, а три',
  'Аппарты лучше, чем на мираже',
  'Жить здорово',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3, 'не для гостей'];

const getGuestsCount = (rooms) => {
  const guestsCount = [];
  if (rooms < 5) {
    for (let index = 0; index < rooms; index++) {
      guestsCount[index] = GUESTS[index];
    }
    return guestsCount;
  }
  return 'не для гостей';
};

const getCapacity = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case 1: capacity = `${rooms} комната - `;
      break;
    case 2:
    case 3:
    case 4: capacity = `${rooms} комнаты - `;
      break;
    case 100: capacity = `${rooms} комнат не для гостей.`;
      break;
    default: capacity = `${rooms} комнат - `;
  }

  if (Array.isArray(guests)) {
    capacity += guests.reverse().reduce((acc, value) => {
      if (guests.length > 1) {
        return `${acc} для ${value} гост${value === 1 ? 'я.' : 'ей, '} `;
      }
      return `${acc}для ${value} гостя.`;
    }, '');
  }
  return capacity;
};

const getOffer = (location) => {
  const hotelType = getRandomArrayElement(TYPES);
  const roomsCount = getRandomArrayElement(ROOMS);
  const guestsCount = getGuestsCount(roomsCount);

  return {
    title: `Заголовок - ${getRandomPositiveInteger(MIN_ELEMENT, COUNT_OF_MOCK_OBJECTS)}`,
    address: `Координата по x: ${location.lat} Координата по y: ${location.lng}`,
    price: getRandomPositiveInteger(MIN_PRICE[hotelType], MAX_PRICE),
    type: hotelType,
    rooms: roomsCount,
    guests: guestsCount,
    checkin: TIME,
    checkout: TIME,
    features: getRandomArray(FEATURES, getRandomPositiveInteger(MIN_ELEMENT, MAX_FEATURES)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArray(PHOTOS, getRandomPositiveInteger(MIN_ELEMENT, MAX_PHOTOS)),
  };
};


const getLocation = () => ({
  lat: getRandomPositiveFloat(MIN_LOCATION_X, MAX_LOCATION_X, MAX_DECIMAL_NUMBERS),
  lng: getRandomPositiveFloat(MIN_LOCATION_Y, MAX_LOCATION_Y, MAX_DECIMAL_NUMBERS),
});

const getExtended = (offer) => ({
  time: `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
  capacity: getCapacity(offer.guests, offer.rooms),
});

export const getMockData = () => {
  const mockArray = [];
  for (let index = 0; index < COUNT_OF_MOCK_OBJECTS; index++) {
    const location = getLocation();
    const offer = getOffer(location);
    mockArray[index] = {
      author: {
        avatar: `img/avatars/user0${getRandomPositiveInteger(MIN_ELEMENT, MAX_COUNT_OF_AVATARS)}.png`,
      },
      offer: offer,
      location: location,
    };

    mockArray[index].extended = getExtended(offer);
  }
  return mockArray;
};
