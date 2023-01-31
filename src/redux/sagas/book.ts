import ActionTypes from '../../utils/actionTypes';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {getHotels, addCard, createBooking, getBookings} from '../../api';
import {AxiosResponse} from 'axios';
import * as RootNavigation from '../../navigation/rootNavigation';

function* get_hotels(action: any) {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(getHotels, action.params);
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
            total: data.result.total,
            pages: data.result.pages,
            page: data.result.page,
            limit: data.result.limit,
          },
        }),
      ]);
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

function* get_more_hotels(action: any) {
  try {
    let response: AxiosResponse = yield call(getHotels, action.params);
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
            total: data.result.total,
            pages: data.result.pages,
            page: data.result.page,
            limit: data.result.limit,
          },
        }),
      ]);
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

function* add_card(action: any) {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(addCard, action.card);
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
          type: ActionTypes.ADD_CARD_SUCCESS,
          payload: {
            card: data.result.card,
          },
        }),
      ]);
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

function* create_booking(action: any) {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(createBooking, action.book);
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
          type: ActionTypes.CREATE_BOOKING_SUCCESS,
          payload: {
            book: data.result.booking,
          },
        }),
      ]);
      action.navigation.popToTop();
      RootNavigation.navigate('Bookings', {});
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

function* get_bookings() {
  try {
    yield put({type: ActionTypes.API_CALL_REQUEST});
    let response: AxiosResponse = yield call(getBookings);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.SET_BOOKINGS,
          payload: {
            bookings: data.result.bookings,
          },
        }),
      ]);
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

function* watchBookRequests() {
  yield all([
    takeLatest(ActionTypes.GET_HOTELS_REQUEST, get_hotels),
    takeLatest(ActionTypes.GET_MORE_HOTELS_REQUEST, get_more_hotels),
    takeLatest(ActionTypes.ADD_CARD_REQUEST, add_card),
    takeLatest(ActionTypes.CREATE_BOOKING_REQUEST, create_booking),
    takeLatest(ActionTypes.GET_BOOKINGS_REQUEST, get_bookings),
  ]);
}

export default watchBookRequests;
