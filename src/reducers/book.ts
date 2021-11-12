import ActionTypes from '../utils/actionTypes';
import {IHotel, IRoom} from '../models';
import {BookState, bookActions} from '../types';

const emptyHotel: IHotel = {
  _id: '',
  name: '',
  short_address: '',
  address: '',
  rating: 0,
  location: '',
  type: '',
  main_picture: '',
  second_picture: '',
  rooms: [],
};

const emptyRoom: IRoom = {
  _id: '',
  title: '',
  advantage: '',
  price: 0,
  room_picture: '',
};

const initialState: BookState = {
  book: {
    hotel: emptyHotel,
    room: emptyRoom,
    check_in_date: new Date(),
    check_out_date: new Date(),
    night_numbers: 0,
    price: 0,
  },
};

export default function reducer(state = initialState, action: bookActions) {
  switch (action.type) {
    case ActionTypes.SELECT_HOTEL:
      return {
        ...state,
        book: {...state.book, hotel: action.payload.hotel},
      };
    case ActionTypes.UPDATE_RESERVATION:
      return {
        ...state,
        book: action.payload.book,
      };
    default:
      return state;
  }
}
