import * as firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDQb6toOr-V_VhbGparVTdVjrOKb09KIR0',
  authDomain: 'authentication-3c6da.firebaseapp.com',
  databaseURL: 'https://authentication-3c6da.firebaseio.com',
  projectId: 'authentication-3c6da',
  storageBucket: '',
  messagingSenderId: '548596965445',
  appId: '1:548596965445:web:621daaf69e9adf65c5832c',
  measurementId: 'G-K5WPP14M46'
};
firebase.initializeApp(config);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
