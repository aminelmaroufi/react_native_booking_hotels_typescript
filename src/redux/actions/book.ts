import ActionTypes from '../../utils/actionTypes';
import {IHotel, IBook} from '../../models';

export const getHotels = () => ({
  type: ActionTypes.GET_HOTELS,
});

export const selectHotel = (hotel: IHotel) => ({
  type: ActionTypes.SELECT_HOTEL,
  payload: {
    hotel,
  },
});

export const updateReservation = (book: IBook) => ({
  type: ActionTypes.UPDATE_RESERVATION,
  payload: {
    book,
  },
});
