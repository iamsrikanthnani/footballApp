import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';

// import awsConfig from '../../../AWSconfiguration/awsConfig';
// import { Auth } from '../../../../node_modules/aws-amplify';
import { onClickSigIn } from '../../../components/authentication/Login/Login';


export class Login extends Component {
  render() {
    return (
      <View>
        <LoginForm onPressAction={ () => onClickSigIn('edbraouf@gmail.com',) } />
        <TouchableOpacity>
          <Button title='Become player >' onPress={ () => this.props.navigation.navigate('Signup') }></Button>
        </TouchableOpacity>  
      </View>
    )
  }
}

export default withNavigation(Login);


// import React, { Component } from 'react';
// import { Text, View, Button, Modal, StyleSheet } from 'react-native';

// export default class MyComponent extends Component {
//   state = {
//     modalVisible: false,
//   };

//   openModal() {
//     this.setState({modalVisible:true});
//   }

//   closeModal() {
//     this.setState({modalVisible:false});
//   }

//   render() {
//     return (
//         <View style={styles.container}>
//           <Modal
//               visible={this.state.modalVisible}
//               animationType={'slide'}
//               onRequestClose={() => this.closeModal()}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.innerContainer}>
//                 <Text>This is content inside of modal component</Text>
//                 <Button
//                     onPress={() => this.closeModal()}
//                     title="Close modal"
//                 >
//                 </Button>
//               </View>
//             </View>
//           </Modal>
//           <Button
//               onPress={() => this.openModal()}
//               title="Open modal"
//           />
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   innerContainer: {
//     alignItems: 'center',
//   },
// });