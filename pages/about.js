import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

import interviewImage from '../public/images/about/explanationImage.jpg'

export default function About() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - Profile</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>About this project</h1>

        <section className={styles.aboutSection}>
          <article className={styles.textContainerWhat}>
          <h2 className={styles.title}>What is Rota Boemia?</h2>
            <p>
              Rota Boemia (maybe I could translate this to Beer Route)
              is a project I developed with some friends in 2016, for my graduation in Digital Design in Brazil.
              The idea was simple create a small app where we interview restaurant and bar owners to talk about their places 
              and we would make videos presenting these places for an audience in Youtube. The video was a requirement from the university and we had a lot of fun recording and making it.
            </p>
          </article>
          <div className={styles.imageContainer}>
            <Image src={interviewImage} className={styles.imgInterview}/>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <article className={styles.textContainerTec}>
          <h2>What tecnologies are used?</h2>
            <p>
              This project was created 7 years ago so a lot of things changed, but I was still very proud of this project. So I decided to make a new version of this project using the new techologies.
              For the web version I used Next.js and Firestore database from Firebase and for the mobile vesion I used React Native. I also used the lottie animation package to create some animations and the regular CSS
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
