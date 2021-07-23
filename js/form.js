import { sendData } from './api/api.js';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE, MAX_ROOMS } from './const.js';
import { resetPage, showModal } from './utils/util.js';
import { success, error } from './user-modal.js';

export const form = document.querySelector('.ad-form');
export const mapFilters = document.querySelector('.map__filters');
export const childeForm = [...form.children];
export const childeFilter = [...mapFilters.children];
export const addressInput = form.querySelector('#address');
const typeInput = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const resetButton = form.querySelector('.ad-form__reset');

export const changePageState = (nodes, node, condition) => {
  nodes.forEach((element) => element.disabled = condition);
  condition
    ? node.classList.add(`${node.className}--disabled`)
    : node.classList.remove(`${node.classList[1]}`);
};

const changeTypeHandler = (targetValue) => {
  const price = MIN_PRICE[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const changeTimeHandler = (targetValue) => {
  checkout.value = targetValue;
  checkin.value = targetValue;
};

const getOptionsHandler = (options) => {
  let memoOptions = [];

  return (targetValue) => {
    memoOptions.forEach((item) => {
      item.disabled = false;
    });

    const index = options.findIndex((elem) => elem.value === targetValue);
    const arrayToDisabled = index !== -1 ? options.slice(index + 1) : options.slice(0, options.length - 1);
    arrayToDisabled.forEach((item) => {
      item.disabled = true;
    });

    memoOptions = [...arrayToDisabled];
  };
};

const getCapacityHandler = getOptionsHandler([...capacity]);
getCapacityHandler(rooms.value);

const selectCapacityHandler = (targetValue) => {
  capacity.value = +targetValue === MAX_ROOMS ? 0 : targetValue;
  getCapacityHandler(targetValue);
};

const checkTitleInputHandler = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const changeHandler = (evt) => {
  const targetInput = evt.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeInput:
      changeTypeHandler(targetValue);
      break;
    case checkin:
      changeTimeHandler(targetValue);
      break;
    case checkout:
      changeTimeHandler(targetValue);
      break;
    case rooms:
      selectCapacityHandler(targetValue);
      break;
    default: break;
  }
};

const resetHandler = (evt) => {
  evt.preventDefault();
  resetPage();
};

const sendOfferFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => showModal(success),
    () => showModal(error),
    new FormData(evt.target),
  );
};

form.addEventListener('focus', () => {
  form.addEventListener('change', changeHandler);
  form.addEventListener('submit', sendOfferFormSubmit);
  titleInput.addEventListener('input', checkTitleInputHandler);
  resetButton.addEventListener('click', resetHandler);
}, true);

form.addEventListener('blur', () => {
  form.removeEventListener('change', changeHandler, true);
  form.removeEventListener('submit', sendOfferFormSubmit, true);
  titleInput.removeEventListener('input', checkTitleInputHandler, true);
  resetButton.removeEventListener('click', resetHandler, true);
});
