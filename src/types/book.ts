import actionTypes from '../utils/actionTypes';
import {IHotel, IBook} from '../models';

export interface BookState {
  book: IBook | null;
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

export type selectHotelPayload = {
  type: actionTypes.SELECT_HOTEL;
  payload: selectHotel;
};

export type updateOrberPayload = {
  type: actionTypes.UPDATE_RESERVATION;
  payload: updateOrber;
};

export type bookActions = selectHotelPayload | updateOrberPayload;
