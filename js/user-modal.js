export const success = document.querySelector('.success');
export const error = document.querySelector('.error');
export const errorGetData = document.querySelector('.error-data');

export const closeModal = (response) => {
  response.classList.add('hidden');
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const createOnModalEscKeydown = (cb) =>
  (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      cb();
    }
  };


const creteOnModalCloseClick = (cb) =>
  (evt) => {
    evt.preventDefault();
    cb();
  };


export const openModal = (response) => {
  const clickCloseModalHandler = creteOnModalCloseClick(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  const keydownCloseModalHandler = createOnModalEscKeydown(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  response.classList.remove('hidden');

  document.addEventListener('keydown', keydownCloseModalHandler, true);
  response.addEventListener('click', clickCloseModalHandler, true);
};
