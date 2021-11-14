import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeNavigation';
import BookingsStackNavigator from './BookingNavigation';
import {Routes} from './routes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Routes.HOME_STACK}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName: string = Routes.HOME_STACK;

            if (route.name === Routes.HOME_STACK) {
              iconName = 'home';
            } else if (route.name === Routes.BOOKING_STACK) {
              iconName = 'list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={Routes.HOME_STACK} component={HomeStackNavigator} />
        <Tab.Screen
          name={Routes.BOOKING_STACK}
          component={BookingsStackNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
