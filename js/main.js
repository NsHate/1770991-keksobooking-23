import { createCardTemplate } from './card.js';
import { getMockData } from './mock/mock.js';
import { changePageState, form, childeForm, mapFilters, childeFilter } from './form.js';
const mocks = getMockData();

const mapContainer = document.querySelector('#map-canvas');

mocks.forEach((data) => {
  mapContainer.insertAdjacentHTML('beforeend', createCardTemplate(data));
});

changePageState(childeForm, form, false);
changePageState(childeFilter, mapFilters, false);
