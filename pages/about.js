import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

export default function About() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia - Profile</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>About this project</h1>
      </main>
    </div>
  );
}
