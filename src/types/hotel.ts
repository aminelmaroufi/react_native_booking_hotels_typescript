import actionTypes from '../utils/actionTypes';
import {IHotel} from '../models';

export interface HotelState {
  hotels: Array<IHotel>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface fetchHotels {
  hotels: Array<IHotel>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export type fecthHotelsPayload = {
  type: actionTypes.SET_HOTELS;
  payload: fetchHotels;
};

export type hotelActions = fecthHotelsPayload;
