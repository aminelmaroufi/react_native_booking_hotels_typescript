import ActionTypes from '../../utils/actionTypes';
import {HotelState, hotelActions} from '../../types';

const initialState: HotelState = {
  hotels: [],
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};

export default function reducer(state = initialState, action: hotelActions) {
  switch (action.type) {
    case ActionTypes.SET_HOTELS: {
      let dataHotels = [];
      if (action.payload.page === 1) {
        dataHotels = action.payload.hotels;
      } else {
        dataHotels = [...state.hotels, ...action.payload.hotels];
      }
      return {
        ...state,
        hotels: dataHotels,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    }
    default:
      return state;
  }
}
