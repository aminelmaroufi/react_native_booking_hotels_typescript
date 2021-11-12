import {fork, all} from 'redux-saga/effects';
import watchAuthRequests from './auth';
import watchBookRequests from './book';

export default function* rootSaga() {
  yield all([fork(watchAuthRequests), fork(watchBookRequests)]);
}
