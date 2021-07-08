import { createCardTemplate } from './card.js';
import { getMockData } from './mock/mock.js';
const mocks = getMockData();

const mapContainer = document.querySelector('#map-canvas');

mocks.forEach((data) => {
  mapContainer.insertAdjacentHTML('beforeend', createCardTemplate(data));
});
