import ActionTypes from '../../utils/actionTypes';
import {HotelState, hotelActions} from '../../types';

const initialState: HotelState = {
  hotels: [],
};

export default function reducer(state = initialState, action: hotelActions) {
  switch (action.type) {
    case ActionTypes.SET_HOTELS:
      return {
        ...state,
        hotels: action.payload.hotels,
      };
    default:
      return state;
  }
}
