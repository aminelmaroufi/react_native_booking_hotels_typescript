import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../routes';
import Home from '../../screens/Home';
import HotelDetails from '../../screens/HotelDetails';
import CheckRooms from '../../screens/CheckRooms';
import Account from '../../screens/Account';
import Login from '../../screens/Login';
import Overview from '../../screens/Overview';
import Book from '../../screens/Book';
import ServerError from '../../screens/ServerError';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerBackTitle: '',
        headerTitleAlign: 'center',
      }}
      initialRouteName={Routes.HOME_SCREEN}>
      <Stack.Screen
        name={Routes.HOME_SCREEN}
        component={Home}
        options={() => ({title: 'Home'})}
      />
      <Stack.Screen
        name={Routes.HOTEL_DETAILS_SCREEN}
        component={HotelDetails}
      />
      <Stack.Screen
        name={Routes.CHECK_ROOMS_SCREEN}
        component={CheckRooms}
        options={() => ({title: 'Check Rooms'})}
      />
      <Stack.Screen
        name={Routes.ACCOUNT_SCREEN}
        component={Account}
        options={() => ({title: 'Create Account'})}
      />
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={Login} />
      <Stack.Screen name={Routes.OVERVIEW_SCREEN} component={Overview} />
      <Stack.Screen
        name={Routes.BOOK_SCREEN}
        component={Book}
        options={() => ({title: 'Book Now'})}
      />
      <Stack.Screen
        name={Routes.SERVER_ERROR_SCREEN}
        component={ServerError}
        options={() => ({
          title: 'Server Error',

          headerBackVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
