import awsConfig from '../../../AWSconfiguration/awsConfig';
import { Auth } from '../../../../node_modules/aws-amplify';


export const LoginInUser = async (username, password) => {
  try {
    await Auth.signIn(username, password)  
    // console.log('sign in success!')

    // props.navigation.navigate('Profile');
    // this.props.navigation.navigate('Profile');
  } catch (err) {
  console.log('error signing in..', err)
  }
};