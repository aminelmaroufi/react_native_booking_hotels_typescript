import ActionTypes from '../../../utils/actionTypes';
import {authActions, AuthState} from '../../../types';
import auth from '../auth';
import {emptyUser} from '../../../models/user';

const defaultState: AuthState = {
  fetching: false,
  isLoggedIn: false,
  message: '',
  error: false,
  user: emptyUser,
  success: false,
};
const noAction: authActions = {
  type: '',
  payload: null,
};
const error_message = 'Error from API';
const success_message = 'Succes message from API';

describe('Test auth reducer', () => {
  it('should return the initial state when state is undefined', () => {
    expect(auth(undefined, noAction)).toEqual(defaultState);
  });

  it("should handle the 'API_CALL_REQUEST' action", () => {
    const expectedState = {...defaultState, fetching: true};
    const fecthPayload: authActions = {
      type: ActionTypes.API_CALL_REQUEST,
      payload: {...defaultState, fetching: true},
    };

    expect(auth(undefined, fecthPayload)).toEqual(expectedState);
  });

  it("should handle the 'API_CALL_SUCCESS' action", () => {
    const expectedState = {...defaultState, success: true};
    const fecthSuccessPayload: authActions = {
      type: ActionTypes.API_CALL_SUCCESS,
      payload: {fetching: false, success: true},
    };

    expect(auth(undefined, fecthSuccessPayload)).toEqual(expectedState);
  });

  it("should handle the 'API_CALL_FAILURE' action", () => {
    const expectedState = {
      ...defaultState,
      error: true,
      message: error_message,
    };
    const fecthFailurePayload: authActions = {
      type: ActionTypes.API_CALL_FAILURE,
      payload: {fetching: false, error: true, message: error_message},
    };

    expect(auth(undefined, fecthFailurePayload)).toEqual(expectedState);
  });

  it("should handle the 'SUCCESS_OPERATION' action", () => {
    const expectedState = {
      ...defaultState,
      success: true,
      message: success_message,
    };
    const fecthSuccessOperationPayload: authActions = {
      type: ActionTypes.SUCCESS_OPERATION,
      payload: {fetching: false, success: true, message: success_message},
    };

    expect(auth(undefined, fecthSuccessOperationPayload)).toEqual(
      expectedState,
    );
  });

  it("should handle the 'CHECK_USER_SUCCESS' action for logged user", () => {
    const expectedState = {
      ...defaultState,
      isLoggedIn: true,
      user: emptyUser,
    };
    const checkUserSuccessPayload: authActions = {
      type: ActionTypes.CHECK_USER_SUCCESS,
      payload: {isLoggedIn: true, user: emptyUser},
    };

    expect(auth(undefined, checkUserSuccessPayload)).toEqual(expectedState);
  });

  it("should handle the 'CHECK_USER_SUCCESS' action for guest user", () => {
    const expectedState = {
      ...defaultState,
      isLoggedIn: false,
      user: emptyUser,
    };
    const checkUserSuccessPayload: authActions = {
      type: ActionTypes.CHECK_USER_SUCCESS,
      payload: {isLoggedIn: false, user: null},
    };

    expect(auth(undefined, checkUserSuccessPayload)).toEqual(expectedState);
  });

  it("should handle the 'LOGIN_SUCCESS' action", () => {
    const expectedState = {
      ...defaultState,
      isLoggedIn: true,
      user: emptyUser,
    };
    const loginSuccessPayload: authActions = {
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {isLoggedIn: true, user: emptyUser},
    };

    expect(auth(undefined, loginSuccessPayload)).toEqual(expectedState);
  });
});
