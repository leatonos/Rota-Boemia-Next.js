import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Profile.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//Images

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Profile() {
  const auth = getAuth(app);

  const defaultPhoto =
    'https://via.placeholder.com/350?text=User%20photo%20not%20found';

  const [userName, setUserName] = useState('User Name');
  const [userPhoto, setPhoto] = useState(defaultPhoto);

  useEffect(() => {
    if (auth.currentUser != null) {
      //Set user's info
      setUserName(auth.currentUser.displayName);
      setPhoto(auth.currentUser.photoURL);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - Profile</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>{userName}</h1>
        <img className={styles.userPhoto} src={userPhoto} />
      </main>
    </div>
  );
}
