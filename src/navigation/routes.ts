import {StackScreenProps} from '@react-navigation/stack';

export enum Routes {
  //Screens
  HOME_SCREEN = 'HOME_SCREEN',
  HOTEL_DETAILS_SCREEN = 'HotelDetails',
  CHECK_ROOMS_SCREEN = 'CHECK_ROOMS',
  ACCOUNT_SCREEN = 'Account',
  LOGIN_SCREEN = 'Login',
  BOOKINGS_SCREEN = 'BookingsHistory',
  OVERVIEW_SCREEN = 'Overview',
  BOOK_SCREEN = 'Book',
  //Stacks
  HOME_STACK = 'Home',
  BOOKINGS_STACK = 'Bookings',
}

type RootStackParamList = {
  //Screens
  HOME_SCREEN: undefined;
  HOTEL_DETAILS_SCREEN: undefined;
  // Stacks
  HOME_STACK: undefined;
};

export type ScreenProps = StackScreenProps<RootStackParamList>;
