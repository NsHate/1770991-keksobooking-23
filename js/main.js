import { getData } from './api/api.js';
import { changePageState, childeFilter, mapFilters } from './form.js';
import { getMarkers } from './map.js';
import { errorGetData, openModal } from './user-modal.js';

getData(
  (data) => {
    getMarkers(data);
  },
  () => {
    openModal(errorGetData);
    changePageState(childeFilter, mapFilters, true);
  },
);
