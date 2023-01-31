import ActionTypes from '../../utils/actionTypes';
import {authActions, AuthState} from '../../types';
import {emptyUser} from '../../models/user';

const initialState: AuthState = {
  fetching: false,
  isLoggedIn: false,
  message: '',
  error: false,
  user: emptyUser,
  success: false,
};
export default function reducer(state = initialState, action: authActions) {
  switch (action.type) {
    case ActionTypes.API_CALL_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: false,
        message: '',
      };
    case ActionTypes.API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        // success: true,
      };
    case ActionTypes.API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        message: action.payload.message,
      };
    case ActionTypes.SUCCESS_OPERATION:
      return {
        ...state,
        fetching: false,
        success: true,
        message: action.payload.message,
      };
    case ActionTypes.CHECK_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : emptyUser,
        isLoggedIn: action.payload.user ? true : false,
      };
    case ActionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case ActionTypes.ADD_CARD_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          cards: [...state.user.cards, action.payload.card],
        },
      };
    case ActionTypes.SET_DEFAULT_CARD:
      let cards = state.user.cards.filter(c => c.id !== action.payload.card.id);
      cards.unshift(action.payload.card);
      return {
        ...state,
        user: {
          ...state.user,
          cards: cards,
        },
      };
    default:
      return state;
  }
}
