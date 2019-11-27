
import React, { Component } from 'react'
import ScreensNavigator from './src/navigation/NavigationStacks';


  class App extends Component {
  render() {
    return (
      <ScreensNavigator />
    )
  }
}

// console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default App;



// App.js

// import React, { Component } from 'react';
// import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
// import { connect } from 'react-redux';
// import ListItem from './src/components/ListItem/ListItem';
// import { addPlace } from './src/state/actions/place';

// const mapStateToProps = state => {
//   return {
//     places: state.places.places
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     add: (name) => {
//       dispatch(addPlace(name))
//     }
//   }
// }

// class App extends Component {

//   state = {
//     placeName: '',
//     places: []
//   }

//   placeSubmitHandler = () => {
//     if(this.state.placeName.trim() === '') {
//       return;
//     }
//     this.props.add(this.state.placeName);
// }

// placeNameChangeHandler = (value) => {
//   this.setState({
//     placeName: value
//   });    
// }

// placesOutput = () => {
//    return (
//     <FlatList style = { styles.listContainer }
//       data = { this.props.places }
//       keyExtractor={(item, index) => index.toString()}
//       renderItem = { info => (
//         <ListItem
//           placeName={ info.item.value }
//         />
//       )}
//     />
//   )
// }

// render() {
//   return (
//     <View style={ styles.container }>
//       <View style = { styles.inputContainer }>
//         <TextInput
//           placeholder = "Seach Places"
//           style = { styles.placeInput }
//           value = { this.state.placeName }
//           onChangeText = { this.placeNameChangeHandler }
//         ></TextInput>
//         <Button title = 'Add' 
//           style = { styles.placeButton }
//           onPress = { this.placeSubmitHandler }
//         />
//         </View>
//         <View style = { styles.listContainer }>
//           { this.placesOutput() }
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 30,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%'
//   },
//   placeInput: {
//     width: '70%'
//   },
//   placeButton: {
//     width: '30%'
//   },
//   listContainer: {
//     width: '100%'
//   }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
