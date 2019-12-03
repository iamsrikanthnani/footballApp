import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LogInScreen from '../screens/authentication/login/Login';
import SignUpScreen from '../screens/authentication/signup/Signup';
import ProfileScreen from '../screens/profile/Profile';
import RenderAuthentication from '../screens/authentication/RenderAuthentication';

import NavigationService from './navigationServices';

const LoginStack = createStackNavigator(
  {
    RenderAuthentication: { screen: RenderAuthentication },  
    Profile: { screen: ProfileScreen },
    Login: { screen: LogInScreen },
    Signup: { screen: SignUpScreen },
  },
  {
    initialRouteName: 'RenderAuthentication'
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Home',
    },
  }
);
const ScreensNavigator = createAppContainer(LoginStack);

export default class Nav extends Component{
    render() {
        return (
            <ScreensNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
        )
    }
}
