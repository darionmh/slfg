import * as firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyBaxq3oVeFBZjLqyeELc8RGZd0ObsUCsv4",
    authDomain: "still-looking-for-group.firebaseapp.com",
    databaseURL: "https://still-looking-for-group.firebaseio.com",
    projectId: "still-looking-for-group",
    storageBucket: "still-looking-for-group.appspot.com",
    messagingSenderId: "218013885148",
    appId: "1:218013885148:web:70756b6ff2a6918379ca19",
    measurementId: "G-466HMLTWMR"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics()
}

export default firebase;