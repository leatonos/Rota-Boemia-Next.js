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
