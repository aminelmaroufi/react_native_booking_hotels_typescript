import React from 'react';
import configureStore from 'redux-mock-store';
import {cleanup, screen} from '@testing-library/react-native';

import Home from '../Home';
import {getHotels} from '../../redux/actions';
import hotels_response from './fixtures/hotels_response.json';
import Setup from '../Setup';

let mockStore = configureStore();

const store = mockStore({
  hotel: {
    hotels: hotels_response.hotels,
  },
});

describe('Test homepage screen', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
    Setup(<Home />, store);
  });

  afterEach(cleanup);

  it('fetches the hotels on mount', () => {
    const expectedAction = getHotels({q: '', page: 1});
    // expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should display the list of hotels', () => {
    expect(screen.getByTestId('@search-box/input')).toBeDefined();
  });

  it('should render a list of hotels', () => {
    hotels_response.hotels.forEach(hotel => {
      const hotelName = screen.getByText(hotel.name);
      const addressElement = screen.getByText(hotel.short_address);
      expect(hotelName).toBeDefined();
      expect(addressElement).toBeDefined();
    });
  });
});
