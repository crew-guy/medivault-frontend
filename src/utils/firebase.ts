import { initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSP6tZbp3IaBK9W4uz-q0eA6fGPJon4N0",
    authDomain: "medivault-f9f40.firebaseapp.com",
    projectId: "medivault-f9f40",
    storageBucket: "medivault-f9f40.appspot.com",
    messagingSenderId: "635869524985",
    appId: "1:635869524985:web:61b91e4f514b60e4c28328"
  };
// if a firebase instance doesn't exist, create one
// if (!firebase.apps.length) {
  // }
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
