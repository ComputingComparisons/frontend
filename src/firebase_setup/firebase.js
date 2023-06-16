// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,addDoc, collection  } from "@firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
  } from "firebase/auth";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBUdRsg1dXok0_T36_8juMX4Ssi25FTfM",
  authDomain: "analog-tool.firebaseapp.com",
  projectId: "analog-tool",
  storageBucket: "analog-tool.appspot.com",
  messagingSenderId: "1056664927895",
  appId: "1:1056664927895:web:53712adfbefd7b857373d2",
  measurementId: "G-8FTBWFHY7X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
const auth = getAuth(app);

export const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        email: user.email,
      });
      return true
    } catch (error) {
      return {error: error.message}
    }
};

export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return true
    } catch (error) {
      return {error: error.message}
    }
};

export const signOutApp = async() => {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      return false
    }
};

export const resetPassword = async (email) => {
  try {
    await await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
};
