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

export default function Header() {
  const [menu, setMenu] = useState(styles.noMenu);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
      } else {
        // User is signed out
        Router.push('/');
      }
    });
  }, []);

  function logOff() {
    console.log('logoff hapened');
    auth.signOut();
  }

  function menuToggle() {
    if (menu == styles.mobileMenuContainer) {
      //Closes menu
      setMenu(styles.mobileMenuContainerHidden);
    } else {
      //Opens menu
      setMenu(styles.mobileMenuContainer);
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLogoContainer}>
          <Link href={'../allbars'}>
            <img
              className={styles.headerLogo}
              src="https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/reduced_logo_white.png"
            />
          </Link>
        </div>
        <div className={styles.mobileMenuIconContainer}>
          <img
            onClick={menuToggle}
            className={styles.menuIcon}
            src="https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/white_menu_thin.png"
          />
        </div>
      </header>
      <nav className={menu}>
        <ul className={styles.linkList}>
          <li className={styles.menuLink}>
            <Link href={'../allbars'}>Home</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href={'../profile'}>Profile</Link>
          </li>
          <li className={styles.menuLink} onClick={logOff}>
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
}
