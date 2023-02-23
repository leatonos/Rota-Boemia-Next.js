import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Bar.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';

//Map import
import GoogleMapReact from 'google-map-react';

//Loading Import
import LoadingScreen from './components/loadingScreen.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, getDoc, doc, runTransaction } from 'firebase/firestore';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth();

export default function Bar() {
  const router = useRouter();
  const { barId } = router.query;
  const [barInfo, setBarInfo] = useState({});
  const [barComments, setbarComments] = useState([]);
  const [isLoading, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchBarInfo = async () => {
      if (!barId) {
        return;
      }
      const docRef = doc(db, 'Bars', barId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setBarInfo(docSnap.data());
        setbarComments(docSnap.data().comments);
        setLoadingState(false);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    fetchBarInfo();
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  function Map() {
    //Initial Bar coordinates that will be changed later
    const [coordinates, setCoordinates] = useState({
      latitude: 0,
      longitude: 0,
      zoom: 1,
      showPin: false,
    });

    const address = barInfo.address;

    //API request to calculate the coordinates of the address
    useEffect(() => {
      const requestOptions = {
        method: 'GET',
      };
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=8ae9443742364a50a2f6cbb80522fae0`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) =>
          setCoordinates({
            latitude: result.features[0].properties.lat,
            longitude: result.features[0].properties.lon,
            zoom: 15,
            showPin: true,
          })
        )
        .catch((error) => console.log('error', error));
    }, []);

    let mapCenter = {
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    };

    const BarLocationMarker = ({ showPin }) => {
      if (!showPin) {
        return null;
      }
      return (
        <img
          className={styles.pinMarker}
          src={'https://pedrobaptista.com/rotaboemia/images/pinMarker.png'}
        />
      );
    };

    return (
      <div className={styles.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBHpAxjsJW5ZmLZiJfClkwUh9TvzDPCvZs' }}
          center={mapCenter}
          zoom={coordinates.zoom}
        >
          <BarLocationMarker
            lat={coordinates.latitude}
            lng={coordinates.longitude}
            showPin={coordinates.showPin}
          />
        </GoogleMapReact>
      </div>
    );
  }

  function CommentSection() {
    function CommentCreator() {
      //Images
      const emptyStar =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/stars/empty-star.png';

      const fullStar =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/stars/full-star.png';

      const emptyCoin =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/coins/empty-coin.png';

      const fullCoin =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/coins/full-coin.png';

      const defaultPhoto =
        'https://via.placeholder.com/250?text=User%20photo%20not%20found';

      const [stars, setStars] = useState(0);
      const [coins, setCoins] = useState(0);
      const [commentText, setCommentText] = useState('');

      const [starsState, setStarsState] = useState([
        emptyStar,
        emptyStar,
        emptyStar,
        emptyStar,
        emptyStar,
      ]);
      const [coinState, setCoinState] = useState([
        emptyCoin,
        emptyCoin,
        emptyCoin,
        emptyCoin,
        emptyCoin,
      ]);

      async function submitComment(e) {
        e.preventDefault();

        const commentObj = {
          stars: stars,
          price: coins,
          comment: commentText,
        };
      }

      function EmptyStars() {
        function starClick(starNum) {
          let newStars = [
            emptyStar,
            emptyStar,
            emptyStar,
            emptyStar,
            emptyStar,
          ];

          for (let i = 0; i < starNum; i++) {
            newStars[i] = fullStar;
          }
          setStarsState(newStars);
          setStars(starNum);
        }

        return (
          <div className={styles.ratingStars}>
            <img
              onClick={() => starClick(1)}
              className={styles.ratingItem}
              src={starsState[0]}
            />
            <img
              onClick={() => starClick(2)}
              className={styles.ratingItem}
              src={starsState[1]}
            />
            <img
              onClick={() => starClick(3)}
              className={styles.ratingItem}
              src={starsState[2]}
            />
            <img
              onClick={() => starClick(4)}
              className={styles.ratingItem}
              src={starsState[3]}
            />
            <img
              onClick={() => starClick(5)}
              className={styles.ratingItem}
              src={starsState[4]}
            />
          </div>
        );
      }

      function EmptyCoins() {
        function coinClick(coinNum) {
          let newCoins = [
            emptyCoin,
            emptyCoin,
            emptyCoin,
            emptyCoin,
            emptyCoin,
          ];

          for (let i = 0; i < coinNum; i++) {
            newCoins[i] = fullCoin;
          }
          setCoinState(newCoins);
          setCoins(coinNum);
        }

        return (
          <div className={styles.ratingStars}>
            <img
              onClick={() => coinClick(1)}
              className={styles.ratingItem}
              src={coinState[0]}
            />
            <img
              onClick={() => coinClick(2)}
              className={styles.ratingItem}
              src={coinState[1]}
            />
            <img
              onClick={() => coinClick(3)}
              className={styles.ratingItem}
              src={coinState[2]}
            />
            <img
              onClick={() => coinClick(4)}
              className={styles.ratingItem}
              src={coinState[3]}
            />
            <img
              onClick={() => coinClick(5)}
              className={styles.ratingItem}
              src={coinState[4]}
            />
          </div>
        );
      }

      return (
        <div className={styles.commentContainer}>
          <div className={styles.commentUserPhotoContainer}>
            <img
              className={styles.commenterPhoto}
              src={auth.currentUser.photoURL}
            />
          </div>
          <div className={styles.commentCreatorContainer}>
            <form
              className={styles.commentFormContainer}
              onSubmit={submitComment}
            >
              <input
                className={styles.inputText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
              />
              <button className={styles.commentBtn} type="submit">
                Comment
              </button>
            </form>
            <div className={styles.ratingContainer}>
              <EmptyStars />
              <EmptyCoins />
            </div>
          </div>
        </div>
      );
    }

    function Comment(props) {
      const invertedStars =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/stars/invertedStars.png';
      const invertedCoins =
        'https://raw.githubusercontent.com/leatonos/Rota-Boemia-Next.js/main/images/coins/inverted-coins-01.png';

      const starPorcentage = props.stars * 20;
      const coinPorcentage = props.coins * 20;

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

      return (
        <div className={styles.commentContainer}>
          <div className={styles.commentUserPhotoContainer}>
            <img className={styles.commenterPhoto} src={props.photoURL} />
          </div>
          <div className={styles.commentTextContainer}>
            <div className={styles.textContainer}>
              <h3 className={styles.noMargin}>{props.userName}</h3>
              <p className={styles.noMargin}>{props.commentText}</p>
            </div>
            <div className={styles.ratingContainer}>
              <div style={starsStyle} className={styles.ratingStars}>
                <img src={invertedStars} />
              </div>
              <div style={coinsStyle} className={styles.ratingCoins}>
                <img src={invertedCoins} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>Comments</h3>
        <CommentCreator />
        {barComments.reverse().map((comment) => {
          return (
            <Comment
              userName={comment.userName}
              commentText={comment.comment}
              stars={comment.stars}
              coins={comment.price}
              photoURL={comment.userPhotoURL}
            />
          );
        })}
      </div>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <Head>
        <title>Rota Boemia - {barInfo.barName}</title>
      </Head>
      <Header />
      <img src={barInfo.photoURL} className={styles.barBigImage} />
      <div className={styles.barInformationContainer}>
        <h2 className={styles.subTitleBig}>About the place</h2>
        <p>{barInfo.longDescription}</p>
        <h2 className={styles.subTitleBig}>Location</h2>
        <p>{barInfo.address}</p>
        <Map />
        <CommentSection />
      </div>
    </main>
  );
}
