import ActionTypes from '../utils/actionTypes';
import {authActions, AuthState} from '../types';

const initialState: AuthState = {
  fetching: false,
  isLoggedIn: false,
  message: '',
  error: false,
  user: null,
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
        success: true,
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
    // case ActionTypes.SAVE_ACCOUNT:
    //   return {...state, user: action.account};
    // case ActionTypes.ADD_CARD:
    //   return {...state, user: {...state.user, card: action.card}};
    default:
      return state;
  }
}
