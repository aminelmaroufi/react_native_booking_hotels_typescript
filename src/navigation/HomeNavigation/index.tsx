import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../routes';
import Home from '../../screens/Home';
import HotelDetails from '../../screens/HotelDetails';

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
      }}
      initialRouteName={Routes.HOME_SCREEN}>
      <Stack.Screen name={Routes.HOME_SCREEN} component={Home} />
      <Stack.Screen
        name={Routes.HOTEL_DETAILS_SCREEN}
        component={HotelDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
