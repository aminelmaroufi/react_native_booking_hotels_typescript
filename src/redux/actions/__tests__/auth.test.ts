import ActionTypes from '../../../utils/actionTypes';
import {checkUser, loginRequest, saveAccount} from '..';
import {emptyUser} from '../../../models/user';

describe('Test auth actions', () => {
  it('should dispatch checkUser action', () => {
    const expectedAction = {
      type: ActionTypes.CHECK_USER_REQUEST,
    };
    expect(checkUser()).toEqual(expectedAction);
  });
  it('should dispatch loginRequest action with the correct params', () => {
    const email = 'test@test.com';
    const password = 'Azerty!@#@@';

    const expectedAction = {
      type: ActionTypes.LOGIN_REQUEST,
      email,
      password,
    };
    expect(loginRequest(email, password)).toEqual(expectedAction);
  });

  it('should dispatch saveAccount action with the correct params', () => {
    const account = emptyUser;

    const expectedAction = {
      type: ActionTypes.SAVE_ACCOUNT_REQUEST,
      account,
    };
    expect(saveAccount(account)).toEqual(expectedAction);
  });
});
