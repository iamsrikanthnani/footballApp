//This is an example code for Bottom Navigation//
import React from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons to show the icon for bottom options

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import { SignInStack, SignUpStack, ProfileStack } from './NavigationStacks';

const BottomNavigator = createBottomTabNavigator(
  {
    'Sign in': {screen: SignInStack},
    'Sign up': {screen: SignUpStack},
    // Profile:   {screen : ProfileStack},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
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
