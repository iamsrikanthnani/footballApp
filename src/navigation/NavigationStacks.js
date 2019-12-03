import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LogInScreen from '../screens/authentication/login/Login';
import SignUpScreen from '../screens/authentication/signup/Signup';
import ProfileScreen from '../screens/profile/Profile';
import FeedScreen from '../screens/feed/Feed';
import RenderAuthentication from '../screens/authentication/RenderAuthentication';



// const differentStack = (routeName, screenName, titleName) => ({
//   routeName: { screen: screenName },
// },
// {
//   //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: 'red',
//     },
//     headerTintColor: '#FFFFFF',
//     title: titleName,
//   },
// });

const LoginStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    RenderAuthentication: { screen: RenderAuthentication },  
    Profile: { screen: ProfileScreen },
    Login: { screen: LogInScreen },
    Signup: { screen: SignUpScreen },
    
  },
  {
    initialRouteName: 'RenderAuthentication'
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
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

export default ScreensNavigator;
