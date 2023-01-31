import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../routes';
import Bookings from '../../screens/Bookings';

const Stack = createNativeStackNavigator();

const BookingsStackNavigator = () => {
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
      }}
      initialRouteName={Routes.BOOKINGS_SCREEN}>
      <Stack.Screen
        name={Routes.BOOKINGS_SCREEN}
        component={Bookings}
        options={() => ({title: 'Bookings'})}
      />
    </Stack.Navigator>
  );
};

export default BookingsStackNavigator;
