import ActionTypes from '../../utils/actionTypes';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {getHotels} from '../../api';
import {AxiosResponse} from 'axios';

function* get_hotels() {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(getHotels);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.SET_HOTELS,
          payload: {
            hotels: data.result.hotels,
          },
        }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        message: data.result.message,
      });
    }
  } catch (err: any) {
    put({
      type: ActionTypes.API_CALL_FAILURE,
      message: typeof err === 'string' ? err : err.message,
    });
  }
}

function* watchBookRequests() {
  yield all([takeLatest(ActionTypes.GET_HOTELS, get_hotels)]);
}

export default watchBookRequests;
