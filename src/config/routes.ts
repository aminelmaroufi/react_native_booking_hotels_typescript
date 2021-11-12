import {StackScreenProps} from '@react-navigation/stack';

export enum Routes {
  //Screens
  HOME_SCREEN = 'Home',
  HOTEL_DETAILS_SCREEN = 'HotelDetails',
  //Stacks
}

type RootStackParamList = {
  //Screens
  HOME_SCREEN: undefined;
  HOTEL_DETAILS_SCREEN: undefined;
  // Stacks
  HOME_STACK: undefined;
};

export type ScreenProps = StackScreenProps<RootStackParamList>;
