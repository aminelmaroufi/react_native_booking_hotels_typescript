enum ActionTypes {
  API_CALL_REQUEST = 'API_CALL_REQUEST',
  API_CALL_FAILURE = 'API_CALL_FAILURE',
  API_CALL_SUCCESS = 'API_CALL_SUCCESS',
  SUCCESS_OPERATION = 'SUCCESS_OPERATION',
  CHECK_USER_REQUEST = 'CHECK_USER_REQUEST',
  CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  GET_HOTELS_REQUEST = 'GET_HOTELS_REQUEST',
  GET_MORE_HOTELS_REQUEST = 'GET_MORE_HOTELS_REQUEST',
  SET_HOTELS = 'SET_HOTELS',
  SELECT_HOTEL = 'SELECT_HOTEL',
  UPDATE_RESERVATION = 'UPDATE_RESERVATION',
  UPDATE_USER = 'UPDATE_USER',
  SAVE_ACCOUNT_REQUEST = 'SAVE_ACCOUNT_REQUEST',
  CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
  ADD_CARD_REQUEST = 'ADD_CARD_REQUEST',
  ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS',
  SET_DEFAULT_CARD = 'SET_DEFAULT_CARD',
  CREATE_BOOKING_REQUEST = 'CREATE_BOOKING_REQUEST',
  CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS',
  GET_BOOKINGS_REQUEST = 'GET_BOOKINGS_REQUEST',
  SET_BOOKINGS = 'SET_BOOKINGS',
}

export enum messages {
  ADD_CARD_SUCCESS = 'Credit card added successfully',
}

export enum FormMessages {
  firstname = 'First Name is required!',
  lastname = 'Last Name is required!',
  phone = 'Phone number is required!',
  phoneNotValid = 'Phone number is not valid!',
  email = 'Email adress is required!',
  emailNotValid = 'Email adress is not valid!',
  password = 'Password is required!',
}

export enum LoginFormMessages {
  email = 'Email adress is required!',
  emailNotValid = 'Email adress is not valid!',
  password = 'Password is required!',
}

export enum CardFormMessages {
  name = 'Card name is required!',
  number = 'Card number is required',
  number_not_valid = 'Card number value is not valid',
  expire_date = 'Card expire date is required!',
  expire_date_not_valid = 'Card expire date value not valid!',
  cvc = 'Card secure number is required!',
  cvcNotValid = 'Secure number value is not valid (max: 3 numbers)!',
}

export default ActionTypes;
