import Head from 'next/head';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import styles from '../styles/Bar.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
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

export default function Bar() {
  const barId = useRouter().query.barId;
  const [barInfo, setBarInfo] = useState({});

  useEffect(() => {
    const docRef = doc(db, 'Bars', barId);

    const fetchBarInfo = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setBarInfo(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    fetchBarInfo();
  }, []);

  function CommentSection() {
    return (
      <div>
        <h3>Comments</h3>
      </div>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <Head>
        <title>Rota Boemia - {barInfo.barName}</title>
      </Head>
      <Header />
      <div className={styles.barInformationContainer}>
        <img src={barInfo.photoURL} className={styles.barBigImage} />
        <h2 className={styles.subTitleBig}>About the place</h2>
        <p>{barInfo.longDescription}</p>
        <h2 className={styles.subTitleBig}>Location</h2>
        <p>{barInfo.address}</p>
        <CommentSection />
      </div>
    </main>
  );
}
