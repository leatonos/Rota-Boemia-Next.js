import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Google Login Provider
const provider = new GoogleAuthProvider();

export default function AllBars() {
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
      } else {
        // User is signed out
        console.log('user not logged');
        Router.push('/');
      }
    });
  }, []);

  function logOff() {
    console.log('logoff hapened');
    auth.signOut();
  }

  /*

  <Link href="./">
          <button>Go back</button>
        </Link>
  
  */

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - All bars</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>All Bars</h1>
        <button onClick={logOff}>Logoff</button>
        <p>{process.env.TEST}</p>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
