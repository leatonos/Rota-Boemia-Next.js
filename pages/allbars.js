import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/AllBars.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';
import Modal from './components/modal';
import Image from 'next/image'

//Images
import shareIcon from '../public/images/icons/share.svg'


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

//Firebase Config
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
  const [modalState, setModalState] = useState(false);
  const [shareId,setShareId] = useState('')

  useEffect(() => {
    const getAllBars = async () => {
      const querySnapshot = await getDocs(collection(db, 'Bars'));

      let finalBarList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
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
    //Coins and stars Images
    const invertedStars =
      'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/stars/invertedStars.png';
    const invertedCoins =
      'https://github.com/leatonos/Rota-Boemia-Next.js/blob/main/images/coins/inverted-coins-01.png?raw=true';

    //Calculate how many stars a place have
    const numberOfStars = () => {
      let totalStars = 0;
      const numberOfComments = props.comments.length;

      //Lets get all the stars of all the comments
      for (let comment of props.comments) {
        totalStars += comment.stars;
      }
      //Then divide by the number of comments this will be the result
      return totalStars / numberOfComments;
    };

    //Calculate how many coins a place have
    const numberOfCoins = () => {
      let totalCoins = 0;
      const numberOfComments = props.comments.length;

      //Lets get all the stars of all the comments
      for (let comment of props.comments) {
        totalCoins += comment.price;
      }
      //Then divide by the number of comments this will be the result
      return totalCoins / numberOfComments;
    };

    const coinPorcentage = numberOfCoins() * 20;
    const starPorcentage = numberOfStars() * 20;

    const starsStyle = {
      background: `linear-gradient(90deg, #FFC000 ${starPorcentage}%, white ${starPorcentage}%)`,
      width: '100px',
      height: '20px',
    };

    const coinsStyle = {
      background: `linear-gradient(90deg, #887C48 ${coinPorcentage}%, white ${coinPorcentage}%)`,
      width: '100px',
      height: '20px',
    };

    function convertAddressToLink(address) {
      const baseAddress = 'https://www.google.com/maps/search/?api=1&query=';
      let correctURI = '';
      for (let letter of address) {
        if (letter === ' ') {
          correctURI += '+';
        } else if (letter === ',') {
          correctURI += '%2C';
        } else {
          correctURI += letter;
        }
      }
      return baseAddress + correctURI;
    }

    return (
      <>
      
      
      <div className={styles.barTemplateContainer}>
        <div className={styles.barImageContainer}>
          <img className={styles.barMiniImage} src={props.photoURL} />
          <div className={styles.ratingContainer}>
            <h4 className={styles.barRatingText}>
              Ratings: {props.comments.length}
            </h4>
          </div>
          <div style={starsStyle}>
            <img src={invertedStars} />
          </div>
          <div style={coinsStyle}>
            <img src={invertedCoins} />
          </div>
        </div>
        <div className={styles.barDescriptionContainer}>
          <div className={styles.barTextContainer}>
            <h3 className={styles.barName}>{props.barName}</h3>
            <p className={styles.barDescriptionText}>
              {props.shortDescription}
            </p>
          </div>
          <div className={styles.barButtonContainer}>
          <button onClick={() => toggleModal(props.id)} className={styles.shareButton}>
            <Image alt='Share icon' src={shareIcon} width={20} height={20}/>
          </button>
            <Link
              href={{
                pathname: '/bar',
                query: { barId: props.id },
              }}
              className={styles.barButton}
            >
              <button className={styles.readMoreButton}>Read more</button>
            </Link>
            <a
              href={convertAddressToLink(props.address)}
              className={styles.barButton}
              target="_blank"
            >
              <button className={styles.mapButton}>Map</button>
            </a>
          </div>
        </div>
      </div>
      </>
    );
  }


  function toggleModal(barId){    
    setShareId(barId)
    setModalState(!modalState)
  }

  const HTMLBarList = barList.map((bar) => {
    return (
      <BarTemplate
        key={bar.id}
        id={bar.id}
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
        <link
          href="https://pedrobaptista.com/rotaboemia/styles/boemia-fonts.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Modal showModal={modalState} closeModal={toggleModal} linkId={shareId}/>
      <main className={styles.main}>
        <h1>All Bars</h1>
        <div className={styles.allBarsContainer}>{HTMLBarList}</div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
