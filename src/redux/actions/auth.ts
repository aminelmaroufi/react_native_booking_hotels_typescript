import actionTypes from '../../utils/actionTypes';
import {IUser} from '../../models/user';
// import {AuthState} from '../types';

export const checkUser = () => ({
  type: actionTypes.CHECK_USER_REQUEST,
});

export const updateUserFields = (user: IUser) => ({
  type: actionTypes.UPDATE_USER,
  payload: {
    user: user,
  },
});

export const saveAccount = (account: IUser, navigation: any) => ({
  type: actionTypes.SAVE_ACCOUNT_REQUEST,
  account,
  navigation,
});

export const loginRequest = (email: string, password: string) => ({
  type: actionTypes.LOGIN_REQUEST,
  email,
  password,
});
