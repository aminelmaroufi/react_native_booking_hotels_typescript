import axios from 'axios';
import {baseURL} from '../config/config';
import errorInterceptor from './interceptors/errors';

const adapter = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// errorInterceptor(adapter);

export default adapter;
