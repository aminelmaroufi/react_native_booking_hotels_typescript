import ActionTypes from '../../utils/actionTypes';
import {IHotel, IRoom} from '../../models';
import {emptySecureCard} from '../../models/card';
import {BookState, bookActions} from '../../types';

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
    _id: '',
    hotel: emptyHotel,
    room: emptyRoom,
    check_in_date: null,
    check_out_date: null,
    night_numbers: 0,
    price: 0,
    card: emptySecureCard,
  },
  bookings: [],
};

export default function reducer(state = initialState, action: bookActions) {
  switch (action.type) {
    case ActionTypes.SELECT_HOTEL:
      return {
        ...state,
        book: {...state.book, hotel: action.payload.hotel},
      };
    case ActionTypes.CHECK_USER_SUCCESS:
      return {
        ...state,
        book: {...state.book, card: action.payload.user.cards[0]},
      };
    case ActionTypes.UPDATE_RESERVATION:
      return {
        ...state,
        book: action.payload.book,
      };
    case ActionTypes.ADD_CARD_SUCCESS:
      return {
        ...state,
        book: {...state.book, card: action.payload.card},
      };
    case ActionTypes.SET_DEFAULT_CARD:
      return {
        ...state,
        book: {...state.book, card: action.payload.card},
      };
    case ActionTypes.CREATE_BOOKING_SUCCESS:
      let bookings = state.bookings;
      if (bookings.length) {
        bookings.unshift(action.payload.book);
      } else {
        bookings.push(action.payload.book);
      }

      return {
        ...state,
        book: initialState.book,
        bookings: bookings,
      };
    case ActionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload.bookings,
      };
    default:
      return state;
  }
}
