import {createStackNavigator} from 'react-navigation-stack';
import LogInScreen from '../../screens/authentication/login/Login';
import SignUpScreen from '../../screens/authentication/signup/Signup';
import ProfileScreen from '../../screens/profile/Profile';
import FeedScreen from '../../screens/feed/Feed';


export const LoginStack = createStackNavigator(
  {
    'Sign in': {screen: LogInScreen},
    'Sign up': {screen: SignUpScreen},
     Profile: {screen: ProfileScreen},
     Feed: {screen: FeedScreen},
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#000000',
      title: 'Sign in',
      //Header title
    },
  },
);

export const SignUpStack = createStackNavigator(
  {
    'Sign up': {screen: SignUpScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Sign up',
    },
  },
);

export const ProfileStack = createStackNavigator(
  { 
    Profile: { screen: ProfileScreen }
  },
  {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#42f44b',
    },
    headerTintColor: '#FFFFFF',
    title: 'Profile',
  },
  }
  );