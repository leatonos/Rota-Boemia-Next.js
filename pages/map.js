import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/AllBars.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function Map() {
  const [barList, setBarList] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - Map</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Map</h1>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
