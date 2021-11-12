import actionTypes from '../utils/actionTypes';
import {IUser} from '../models/IUser';
// import {AuthState} from '../types';

export const saveAccount = (account: IUser) => ({
  type: actionTypes.SAVE_ACCOUNT,
  account,
});

// export const addCard = card => ({
//   type: ActionTypes.ADD_CARD,
//   card,
// });
