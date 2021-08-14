import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqZ9id9J6f1DUvJtScl_YUOKtAuwS1XdI',
  authDomain: 'smart-stove-controller.firebaseapp.com',
  projectId: 'smart-stove-controller',
  storageBucket: 'smart-stove-controller.appspot.com',
  messagingSenderId: '587335156372',
  appId: '1:587335156372:web:a08b246f69142f9f25ea81',
  measurementId: 'G-C6J3LRLN19',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
