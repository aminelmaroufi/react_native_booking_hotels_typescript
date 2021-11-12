import actionTypes from '../utils/actionTypes';
import {IHotel} from '../models';

export interface HotelState {
  hotels: Array<IHotel>;
}

export interface fetchHotels {
  hotels: Array<IHotel>;
}

export type fecthHotelsPayload = {
  type: actionTypes.SET_HOTELS;
  payload: fetchHotels;
};

export type hotelActions = fecthHotelsPayload;
