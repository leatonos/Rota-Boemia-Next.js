import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHpAxjsJW5ZmLZiJfClkwUh9TvzDPCvZs',
  authDomain: 'rota-boemia-375808.firebaseapp.com',
  projectId: 'rota-boemia-375808',
  storageBucket: 'rota-boemia-375808.appspot.com',
  messagingSenderId: '713402840177',
  appId: '1:713402840177:web:ac28b6091148a3f78657d0',
  measurementId: 'G-S7RMDX3PCN',
};

//Images
const rotaBoemiaLogo =
  'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/rotaboemia-logo.png';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Google Login Provider
const provider = new GoogleAuthProvider();

export default function Home() {
  const auth = getAuth();

  async function googleLogin() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        //Router.push('/allbars');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        Router.push('/allbars');
      } else {
        // User is signed out
        // Nothing Happens
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia</title>
      </Head>
      {/* <header className={styles.header}></header> */}
      <main className={styles.main}>
        <img className={styles.mainLogo} src={rotaBoemiaLogo} />
        <button className={styles.googleLogin} onClick={googleLogin}>
          Login with google
        </button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
