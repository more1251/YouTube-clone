// import firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB689GvGegdm79nObsPE1YAyomZ07H8KUY",
    authDomain: "yt-cl-2022.firebaseapp.com",
    projectId: "yt-cl-2022",
    storageBucket: "yt-cl-2022.appspot.com",
    messagingSenderId: "191416256047",
    appId: "1:191416256047:web:2dc03cd38a4e223e5b68da"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth();