import {IBook, ICard} from '../models';
import adapter from '../utils/adapter';

export const getHotels = (params: any) => {
  const query = `q=${params.q}&page=${params.page}`;
  return adapter.get(`/hotels?${query}`).catch(err => {
    return Promise.reject(err.response ? err.response.data.result : err);
  });
};

export const addCard = (card: ICard) => {
  return adapter.post('/customers/cards', card).catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const createBooking = (book: IBook) => {
  return adapter.post('/customers/bookings', book).catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const getBookings = () => {
  return adapter.get('/customers/bookings').catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};
