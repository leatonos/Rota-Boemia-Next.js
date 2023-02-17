import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
const analytics = getAnalytics(app);

export default function Home() {
  useEffect(() => {});

  return (
    <div className={styles.container}>
      <Head>
        <title>Rota Boemia</title>
      </Head>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <h1>Hello</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
