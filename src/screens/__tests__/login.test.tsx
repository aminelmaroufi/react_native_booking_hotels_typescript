import React from 'react';

import {cleanup, fireEvent, screen} from '@testing-library/react-native';
import configureStore from '../../redux/store';
import Login from '../Login';
import {loginRequest} from '../../redux/actions';
import Setup from '../setup';

let store = configureStore();

const email = 'test@test.com';
const password = 'Azerty123@@';

describe('Test Login Component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
    Setup(<Login />, store);
  });

  afterEach(cleanup);

  it('should render all form element', () => {
    expect(screen.getByTestId('logo')).toBeDefined();
    expect(screen.getByTestId('email')).toBeDefined();
    expect(screen.getByTestId('password')).toBeDefined();

    const loginBtn = screen.getByTestId('login-btn');

    expect(loginBtn).toBeDefined();
  });

  it('should enable login button after entereing valid email and password value', () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginBtn = screen.getByTestId('login-btn');

    expect(loginBtn.props.accessibilityState).toHaveProperty('disabled', true);

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);

    expect(loginBtn.props.accessibilityState).toHaveProperty('disabled', false);
    fireEvent.press(loginBtn);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(loginRequest(email, password));
  });
});
