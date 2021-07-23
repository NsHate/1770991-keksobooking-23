import { MODAL_SHOW_TIME, RoomsCount, START_POINTS } from '../const.js';
import { addressInput, form, mapFilters } from '../form.js';
import { closeModal, openModal } from '../user-modal.js';
import { success } from '../user-modal.js';

export const getCapacity = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case RoomsCount.ONE_ROOM_VALUE: capacity = `${rooms} комната - `;
      break;
    case RoomsCount.TWO_ROOMS_VALUE:
    case RoomsCount.THREE_ROOMS_VALUE:
    case RoomsCount.FOUR_ROOMS_VALUE: capacity = `${rooms} комнаты - `;
      break;
    case RoomsCount.HUNDRED_ROOMS_VALUE: capacity = `${rooms} комнат не для гостей.`;
      break;
    default: capacity = `${rooms} комнат - `;
  }

  if (typeof guests === 'number') {
    return capacity += `для ${guests} гост${guests === RoomsCount.ONE_ROOM_VALUE ? 'я' : 'ей'}.`;
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
