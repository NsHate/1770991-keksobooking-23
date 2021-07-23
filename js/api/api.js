import { ERROR_GET_MESSAGE, ERROR_POST_MESSAGE } from '../const.js';
import { adaptDataToClient } from '../utils/adapter.js';

export const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onFail(ERROR_GET_MESSAGE);
    })
    .then((data) => {
      const adaptedOffers = data.map((offer) => adaptDataToClient(offer));
      onSuccess(adaptedOffers);
    })
    .catch(() => {
      onFail(ERROR_GET_MESSAGE);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_POST_MESSAGE);
      }
    })
    .catch(() => {
      onFail(ERROR_POST_MESSAGE);
    });
};
