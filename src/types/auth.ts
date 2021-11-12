import actionTypes from '../utils/actionTypes';
import {IUser} from '../models/user';

export interface AuthState {
  fetching: Boolean;
  isLoggedIn: Boolean | null;
  message: String;
  error: Boolean;
  user: IUser | null;
  success: Boolean;
}

export interface FetchRequestPayload {
  fetching: true;
  success: false;
  error: false;
  message: '';
}

export interface FetchRequestSuccessPayload {
  fetching: false;
  success: true;
}

export interface FetchRequestFailurePayload {
  fetching: false;
  error: true;
  message: string;
}

export interface FetchRequestSuccessOperationPayload {
  fetching: false;
  success: true;
  message: string;
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

export type authActions =
  | FetchRequest
  | FetchRequestSuccess
  | FetchRequestFailure
  | FetchRequestSuccessOperation;
