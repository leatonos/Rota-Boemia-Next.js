import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

//Lottie Animation
import { useLottie } from "lottie-react";
import mainLogoAnimation from "../public/animations/RotaBoemia2.json"

//Images
import googleLoginBtn from '../public/images/btn_google_signin_dark_normal_web@2x.png'


// Firebase imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

//Images
import rotaBoemiaLogo from '../public/images/rotaboemia-logo.png'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional




export default function Home() {

  
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



  const auth = getAuth();

  function LottieAnimationComponent(){

    const animationOptions = {
      animationData: mainLogoAnimation,
      loop: false,
      style:{
        height:300,
        marginBottom:23
      }
    };

    const { View } = useLottie(animationOptions);

    return <>{View}</>;

    

  } 

  async function googleLogin() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        //Router.push('/allbars');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        Router.push('/allbars');
      } else {
        // User is signed out
        // Nothing Happens
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia</title>
      </Head>
      <main className={styles.main}>
        <h1>Welcome to Rota Boemia</h1>
        <LottieAnimationComponent className={styles.mainLogo} />
        <Image src={googleLoginBtn}  width={230} onClick={googleLogin} alt='Google login button'/>
      </main>
    
    </div>
  );
}
