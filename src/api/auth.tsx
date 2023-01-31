import adapter from '../utils/adapter';
import {IUser} from '../models';

export const checkUser = () => {
  return adapter.get('/me').catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const saveAccount = (user: IUser) => {
  return adapter.post('/auth/signup', user).catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const login = (email: string, password: string) => {
  const payload = {
    username: email,
    password: password,
  };
  return adapter.post('/auth/signin?scope=customer', payload).catch(err => {
    let error: any;
    if (typeof err === 'string') {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};
