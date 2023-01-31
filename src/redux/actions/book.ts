import ActionTypes from '../../utils/actionTypes';
import {IHotel, IBook, ICard, ISecureCard} from '../../models';

export const getHotels = (params: any) => ({
  type: ActionTypes.GET_HOTELS_REQUEST,
  params,
});

export const getMoreHotels = (params: any) => ({
  type: ActionTypes.GET_MORE_HOTELS_REQUEST,
  params,
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

export const addCard = (card: ICard) => ({
  type: ActionTypes.ADD_CARD_REQUEST,
  card,
});

export const setDefaultCard = (card: ISecureCard) => ({
  type: ActionTypes.SET_DEFAULT_CARD,
  payload: {
    card,
  },
});

export const createBooking = (book: IBook, navigation: any) => ({
  type: ActionTypes.CREATE_BOOKING_REQUEST,
  book,
  navigation,
});

export const getBookings = () => ({
  type: ActionTypes.GET_BOOKINGS_REQUEST,
});
