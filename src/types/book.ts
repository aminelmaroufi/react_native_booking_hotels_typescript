import actionTypes from '../utils/actionTypes';
import {IBook, ISecureCard, IHotel, IUser} from '../models';

export interface BookState {
  book: IBook;
  bookings: Array<IBook>;
}

export interface IResult {
  ok: string;
  result: Object;
}

export interface selectHotel {
  hotel: IHotel;
}

export interface updateOrber {
  book: IBook;
}

export interface addCardSuccess {
  card: ISecureCard;
}

export interface checkUserSuccess {
  user: IUser;
}

export interface setDefaultCard {
  card: ISecureCard;
}

export interface createBookingSuccess {
  bookings: Array<IBook>;
  book: IBook;
}

export interface getBookingsSuccess {
  bookings: Array<IBook>;
}

export type selectHotelPayload = {
  type: actionTypes.SELECT_HOTEL;
  payload: selectHotel;
};

export type updateOrberPayload = {
  type: actionTypes.UPDATE_RESERVATION;
  payload: updateOrber;
};

export type addCardSuccessPayload = {
  type: actionTypes.ADD_CARD_SUCCESS;
  payload: addCardSuccess;
};

export type checkUserSuccessPayload = {
  type: actionTypes.CHECK_USER_SUCCESS;
  payload: checkUserSuccess;
};

export type setDefaultCardsPayload = {
  type: actionTypes.SET_DEFAULT_CARD;
  payload: setDefaultCard;
};

export type createBookingSuccessPayload = {
  type: actionTypes.CREATE_BOOKING_SUCCESS;
  payload: createBookingSuccess;
};

export type getBookingsSuccessPayload = {
  type: actionTypes.SET_BOOKINGS;
  payload: getBookingsSuccess;
};

export type bookActions =
  | selectHotelPayload
  | updateOrberPayload
  | addCardSuccessPayload
  | checkUserSuccessPayload
  | setDefaultCardsPayload
  | createBookingSuccessPayload
  | getBookingsSuccessPayload;
