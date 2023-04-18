import actionTypes from '../utils/actionTypes';
import {IUser, ISecureCard} from '../models';

export interface AuthState {
  fetching: boolean;
  isLoggedIn: boolean | null;
  message: string;
  error: boolean;
  user: IUser;
  success: boolean;
}

export interface FetchRequestPayload {
  fetching: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export interface FetchRequestSuccessPayload {
  fetching: false;
  success: true;
}

export interface FetchRequestFailurePayload {
  fetching: boolean;
  error: boolean;
  message: string;
}

export interface checkUserSuccess {
  user: IUser | null;
  isLoggedIn: boolean;
}

export interface saveAccountSuccess {
  user: IUser;
}

export interface loginSuccess {
  user: IUser;
  isLoggedIn: boolean;
}

export interface FetchRequestSuccessOperationPayload {
  fetching: false;
  success: true;
  message: string;
}

export interface addCardSuccess {
  card: ISecureCard;
}

export interface setDefaultCard {
  card: ISecureCard;
}

export type FetchRequest = {
  type: typeof actionTypes.API_CALL_REQUEST;
  payload: FetchRequestPayload;
};

export type FetchRequestSuccess = {
  type: typeof actionTypes.API_CALL_SUCCESS;
  payload: FetchRequestSuccessPayload;
};

export type FetchRequestFailure = {
  type: typeof actionTypes.API_CALL_FAILURE;
  payload: FetchRequestFailurePayload;
};

export type FetchRequestSuccessOperation = {
  type: typeof actionTypes.SUCCESS_OPERATION;
  payload: FetchRequestSuccessOperationPayload;
};

export type saveAccountSuccessPayload = {
  type: actionTypes.CREATE_ACCOUNT_SUCCESS;
  payload: saveAccountSuccess;
};

export type checkUserSuccessPayload = {
  type: actionTypes.CHECK_USER_SUCCESS;
  payload: checkUserSuccess;
};

export type loginSuccessPayload = {
  type: actionTypes.LOGIN_SUCCESS;
  payload: loginSuccess;
};

export type addCardSuccessPayload = {
  type: actionTypes.ADD_CARD_SUCCESS;
  payload: addCardSuccess;
};

export type setDefaultCardsPayload = {
  type: actionTypes.SET_DEFAULT_CARD;
  payload: setDefaultCard;
};

export type notActionPayload = {
  type: '';
  payload: null;
};

export type authActions =
  | notActionPayload
  | FetchRequest
  | FetchRequestSuccess
  | FetchRequestFailure
  | FetchRequestSuccessOperation
  | saveAccountSuccessPayload
  | loginSuccessPayload
  | checkUserSuccessPayload
  | addCardSuccessPayload
  | setDefaultCardsPayload;
