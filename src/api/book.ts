import adapter from '../utils/adapter';

export const getHotels = () => {
  return adapter.get('/hotels').catch(err => {
    return Promise.reject(err.response ? err.response.data.result : err);
  });
};
