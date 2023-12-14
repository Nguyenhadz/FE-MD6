import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBYwhcJE-WrIAAePLLEoFJ33ba1D2P38zc",
    authDomain: "kien-b06e6.firebaseapp.com",
    projectId: "kien-b06e6",
    storageBucket: "kien-b06e6.appspot.com",
    messagingSenderId: "234517503542",
    appId: "1:234517503542:web:b1841470b3a52471bac297",
    measurementId: "G-NYS2P0C4YT"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);