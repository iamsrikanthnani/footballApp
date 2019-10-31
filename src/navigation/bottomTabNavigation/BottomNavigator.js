import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { LoginStack, SignUpStack } from './NavigationStacks';

const BottomNavigator = createBottomTabNavigator(
  {
    'Sign in': {screen: LoginStack},
    'Sign up': {screen: SignUpStack},
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
