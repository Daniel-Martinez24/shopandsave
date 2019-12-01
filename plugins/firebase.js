import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyAmtfIg1zRyuMNMVX2jDxbrOL1mUMRGh0A",
    authDomain: "shop-and-save.firebaseapp.com",
    databaseURL: "https://shop-and-save.firebaseio.com",
    projectId: "shop-and-save",
    storageBucket: "shop-and-save.appspot.com",
    messagingSenderId: "4594801098",
    appId: "1:4594801098:web:a6145481dcfda2fe15d733",
    measurementId: "G-HZQNF1R2D5"
  };

  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, firestore, storage };
