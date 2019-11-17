import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { LoginStack, SignUpStack } from '../NavigationStacks';
import Feed from '../../screens/feed/Feed';
import SecProfile from '../../screens/profile/SecProfile';
import Profile from '../../screens/profile/Profile';

const BottomNavigator = createBottomTabNavigator(
  {
    Profile: { screen: Profile },
    // SecProfile: {screen: SecProfile},
    Feed: { screen: Feed },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    /* tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    }, */
  },
);
export default createAppContainer(BottomNavigator);
