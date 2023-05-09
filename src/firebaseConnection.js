import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth}  from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIUe6NeVd7orJgdwCLMMECihEznZKYNjg",
    authDomain: "pokedex-a47e9.firebaseapp.com",
    projectId: "pokedex-a47e9",
    storageBucket: "pokedex-a47e9.appspot.com",
    messagingSenderId: "847896986762",
    appId: "1:847896986762:web:478650e6919dea3a9b9973",
    measurementId: "G-J8YJ491S4V"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);




export { db, auth }
