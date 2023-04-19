import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeNavigation';
import BookingsStackNavigator from './BookingNavigation';
import {Routes} from './routes';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const RootNavigation = ({}, ref: React.Ref<any>) => {
  return (
    <NavigationContainer ref={ref}>
      <Tab.Navigator
        initialRouteName={Routes.HOME_STACK}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName: string = Routes.HOME_STACK;

            if (route.name === Routes.HOME_STACK) {
              iconName = 'home';
            } else if (route.name === Routes.BOOKINGS_STACK) {
              iconName = 'list';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={Routes.HOME_STACK} component={HomeStackNavigator} />
        <Tab.Screen
          name={Routes.BOOKINGS_STACK}
          component={BookingsStackNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default React.forwardRef(RootNavigation);
