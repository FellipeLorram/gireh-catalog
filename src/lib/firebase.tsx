import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvPfM9KICrVgykryS_ZUNaCD8u-VzpJto",
    authDomain: "girehcaju.firebaseapp.com",
    projectId: "girehcaju",
    storageBucket: "girehcaju.appspot.com",
    messagingSenderId: "820739010903",
    appId: "1:820739010903:web:d6321c76facc5e377c0e12"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getFirestore(app);