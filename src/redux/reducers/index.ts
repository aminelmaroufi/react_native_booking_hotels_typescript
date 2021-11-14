import {combineReducers} from 'redux';
import auth from './auth';
import hotel from './hotel';
import book from './book';

const rootReducer = combineReducers({
  auth,
  hotel,
  book,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
