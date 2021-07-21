import { MODAL_SHOW_TIME, START_POINTS } from '../const.js';
import { addressInput, form, mapFilters } from '../form.js';
import { closeModal, openModal } from '../user-modal.js';
import { success } from '../user-modal.js';

export const getCapacity = (guests, rooms) => {
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

  if (typeof guests === 'number') {
    return capacity += `для ${guests} гост${guests === 1 ? 'я' : 'ей'}.`;
  }
  return capacity;
};

export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
};

export const showModal = (response) => {
  if (response === success) {
    openModal(response);
    resetPage();
  }
  else {
    openModal(response);
  }

  setTimeout(() => {
    closeModal(response);
  }, MODAL_SHOW_TIME);
};
