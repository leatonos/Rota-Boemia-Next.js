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

export default function AllBars() {
  const [barList, setBarList] = useState([]);

  useEffect(() => {
    const getAllBars = async () => {
      const querySnapshot = await getDocs(collection(db, 'Bars'));

      let finalBarList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let bar = {};
        bar = doc.data();
        bar.id = doc.id;
        finalBarList.push(bar);
      });

      setBarList(finalBarList);
    };

    getAllBars();
  }, []);

  function BarTemplate(props) {
    return (
      <div className={styles.barTemplateContainer}>
        <div className={styles.barImageContainer}>
          <img className={styles.barMiniImage} src={props.photoURL} />
          <div className={styles.ratingContainer}>
            <h4 className={styles.barRatingText}>
              Ratings: {props.comments.length}
            </h4>
          </div>
          <div className={styles.ratingBar}></div>
          <div className={styles.ratingBar}></div>
        </div>
        <div className={styles.barDescriptionContainer}>
          <h3 className={styles.barName}>Bar Name</h3>
          <p className={styles.barDescriptionText}>{props.shortDescription}</p>
          <div className={styles.barButtonContainer}>
            <Link href="./allbars" className={styles.barButton}>
              <button className={styles.readMoreButton}>Read more</button>
            </Link>
            <Link href="./allbars" className={styles.barButton}>
              <button className={styles.mapButton}>Map</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const HTMLBarList = barList.map((bar) => {
    return (
      <BarTemplate
        key={bar.id}
        barName={bar.barName}
        shortDescription={bar.shortDescription}
        longDescription={bar.longDescription}
        photoURL={bar.photoURL}
        comments={bar.comments}
        address={bar.address}
      />
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - All bars</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>All Bars</h1>
        <div className={styles.allBarsContainer}>{HTMLBarList}</div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
