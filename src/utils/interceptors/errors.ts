import {AxiosError} from 'axios';
import ActionTypes from '../actionTypes';
import * as RootNavigation from '../../navigation/rootNavigation';
import adapter from '../adapter';
import {Store} from 'redux';

const errorInterceptor = (store: Store) => {
  adapter.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (!error.response) {
        return RootNavigation.navigate('SERVER_ERROR_SCREEN', {});
      } else if (error.response && error.response.status === 401) {
        store.dispatch({
          type: ActionTypes.API_CALL_FAILURE,
          payload: {
            message: error.response.data.result.message,
          },
        });
        return RootNavigation.navigate('Home', {});
      } else if (error.response && error.response.status === 503) {
        return RootNavigation.navigate('SERVER_ERROR_SCREEN', {});
      } else {
        //dispatch your error in a more user friendly manner
        // if (DEBUG) {
        //   //easier debugging
        //   console.group('Error');
        //   console.log(error);
        //   console.groupEnd();
        // }
        return error.response;
      }
    },
  );
};
export default errorInterceptor;
