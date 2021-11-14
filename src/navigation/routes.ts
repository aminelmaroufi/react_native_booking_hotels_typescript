import {StackScreenProps} from '@react-navigation/stack';

export enum Routes {
  //Screens
  HOME_SCREEN = 'Home',
  HOTEL_DETAILS_SCREEN = 'HotelDetails',
  BOOKING_SCREEN = 'Booking',
  //Stacks
  HOME_STACK = 'Home',
  BOOKING_STACK = 'Bookings',
}

type RootStackParamList = {
  //Screens
  HOME_SCREEN: undefined;
  HOTEL_DETAILS_SCREEN: undefined;
  // Stacks
  HOME_STACK: undefined;
};

export type ScreenProps = StackScreenProps<RootStackParamList>;
