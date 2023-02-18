import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Header.module.css';
import React, { useState, useEffect } from 'react';

//Firebase Imports
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
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

export default function Header() {
  /*
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
      } else {
        // User is signed out
        console.log('user not logged');
        Router.push('/');
      }
    });
  }, []);
*/
  return (
    <header className={styles.header}>
      <div className={styles.headerLogoContainer}>
        <img
          className={styles.headerLogo}
          src="https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/reduced_logo_white.png"
        />
      </div>
      <div className={styles.mobileMenuContainer}>
        <img
          className={styles.menuIcon}
          src="https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/white_menu_thin.png"
        />
      </div>
    </header>
  );
}
