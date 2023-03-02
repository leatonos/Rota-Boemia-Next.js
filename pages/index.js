import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

//Images
import googleLoginBtn from '../public/images/btn_google_signin_dark_normal_web@2x.png'
//import favicon from '../public/images/favicon.ico'


// Firebase imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

//Images
import rotaBoemiaLogo from '../public/images/rotaboemia-logo.png'

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
      <main className={styles.main}>
        <Image className={styles.mainLogo} src={rotaBoemiaLogo} alt='Rota boemia main logo'  />
        <Image src={googleLoginBtn}  width={230} onClick={googleLogin}/>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
