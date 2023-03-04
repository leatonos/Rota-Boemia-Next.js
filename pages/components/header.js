import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Header.module.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

//Images
import miniLogo from '../../public/images/reduced_logo_white.png'
import menuIcon from '../../public/images/white_menu_thin.png'

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


export default function Header() {

    //Google Firebase config
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    //Google Login Provider
    const provider = new GoogleAuthProvider();


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
            <Image
              className={styles.headerLogo}
              src={miniLogo}
              alt='Reduced logo Rota Boemia'
            />
          </Link>
        </div>
        <div className={styles.mobileMenuIconContainer}>
          <Image
            onClick={menuToggle}
            className={styles.menuIcon}
            src={menuIcon}
            alt='Menu'
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
