// import ActionTypes from '../utils/actionTypes';
import {put, call, all, takeLatest, delay} from 'redux-saga/effects';
import ActionTypes from '../../utils/actionTypes';
import {CommonActions} from '@react-navigation/native';
import {checkUser, saveAccount, login} from '../../api';
import {AxiosResponse} from 'axios';
import {navigateToScreen} from '../../redux/actions';
import * as RootNavigation from '../../navigation/rootNavigation';

export function* check_user_request() {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(checkUser);

    if (!response) return;

    const data = response.data;
    if (data.ok) {
      if (data.result.user) {
        yield all([
          put({
            type: ActionTypes.API_CALL_SUCCESS,
          }),
          put({
            type: ActionTypes.CHECK_USER_SUCCESS,
            payload: {
              user: data.result.user,
            },
          }),
        ]);
      } else {
        yield put({
          type: ActionTypes.API_CALL_SUCCESS,
        });
      }
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === 'string' ? err : err.message,
      },
    });
  }
}

export function* save_account(action: any) {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let user = action.account;
    delete user._id;
    let response: AxiosResponse = yield call(saveAccount, action.account);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
        put({
          type: ActionTypes.CREATE_ACCOUNT_SUCCESS,
          payload: {
            user: data.result.user,
          },
        }),
        // put(CommonActions.goBack()),
        // put(CommonActions.navigate({name: 'Login'})),
      ]);

      action.navigation.pop();
      RootNavigation.navigate('Login', {});
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === 'string' ? err : err.message,
      },
    });
  }
}

export function* login_request(action: any) {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(
      login,
      action.email,
      action.password,
    );
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            user: data.result.user,
          },
        }),
        put(navigateToScreen('Overview', {})),
      ]);
      // action.navigation.pop(2);
      RootNavigation.navigate('Overview', {});
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === 'string' ? err : err.message,
      },
    });
  }
}

export default function* watchAuthRequest() {
  yield all([
    takeLatest(ActionTypes.SAVE_ACCOUNT_REQUEST, save_account),
    takeLatest(ActionTypes.LOGIN_REQUEST, login_request),
    takeLatest(ActionTypes.CHECK_USER_REQUEST, check_user_request),
  ]);
}
