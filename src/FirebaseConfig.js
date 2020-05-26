import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDxUjkmrMuPt-9RnnnozxJGdQg9u7MgT7E",
    authDomain: "eonlineshop-be81d.firebaseapp.com",
    databaseURL: "https://eonlineshop-be81d.firebaseio.com",
    projectId: "eonlineshop-be81d",
    storageBucket: "eonlineshop-be81d.appspot.com",
    messagingSenderId: "133881687769",
    appId: "1:133881687769:web:bacc443c66e14729a298c8",
    measurementId: "G-BBHGHXVLK3"

}

firebase.initializeApp(firebaseConfig);

export const authen = firebase
export default firebaseConfig
