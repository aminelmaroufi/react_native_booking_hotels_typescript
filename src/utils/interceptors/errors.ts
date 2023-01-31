import * as RootNavigation from '../../navigation/rootNavigation';

const DEBUG = process.env.REACT_APP_NODE_ENV !== 'production';
const errorInterceptor = axiosInstance => {
  axiosInstance.interceptors.response.use(
    response => {
      //Response Successful
    },
    error => {
      error = JSON.stringify(error);
      error = JSON.parse(error);

      if (error?.status === 401) {
        return RootNavigation.navigate('/login', {});
        //Unauthorized
        //redirect to Login
      } else {
        //dispatch your error in a more user friendly manner
        if (DEBUG) {
          //easier debugging
          console.group('Error');
          console.log(error);
          console.groupEnd();
        }
      }
    },
  );
};
export default errorInterceptor;
