import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Bar.module.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';
import Modal from './components/modal';
import ErrorMessage from './components/errorMessage';

//Images
import emptyCoin from '../public/images/coins/empty-coin.png';
import fullCoin from '../public/images/coins/full-coin.png';
import emptyStar from '../public/images/stars/empty-star.png';
import fullStar from '../public/images/stars/full-star.png';
import invertedStars from '../public/images/stars/invertedStars.png'
import invertedCoins from '../public/images/coins/inverted-coins-01.png'
import shareIcon from '../public/images/icons/share.svg'


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
//Google Firebase config
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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth();

export default function Bar() {
  const router = useRouter();
  const { barId } = router.query;
  const [barInfo, setBarInfo] = useState({});
  const [barComments, setBarComments] = useState([]);
  const [isLoading, setLoadingState] = useState(true);
  const [modalState,setModalState] = useState(false)
  const [showErrorState,setShowErrorState] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')

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
        setBarComments(docSnap.data().comments);
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

  function toggleModal(){    
    setModalState(!modalState)
  }

  function closeErrorMSG(){
    setShowErrorState(!showErrorState)
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
    }, [address]);

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

    function addressToLink(address) {
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
      <div className={styles.mapContainer}>
        <h2 className={styles.subTitleBig}>Location</h2>
        <p>{barInfo.address}</p>
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
        <a
          className={styles.routeBtnContainer}
          href={addressToLink(barInfo.address)}
          target="_blank"
        >
          <button className={styles.routeBtn}>Route to the bar</button>
        </a>
      </div>
    );
  }

  function CommentSection() {
    function CommentCreator() {
      //Images

      const [stars, setStars] = useState(0);
      const [coins, setCoins] = useState(0);
      const [newCommentText, setCommentText] = useState('');

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
          comment: newCommentText,
          userName: auth.currentUser.displayName,
          userPhotoURL: auth.currentUser.photoURL,
        };

        if (stars == 0 || coins == 0 || newCommentText == '') {
          setShowErrorState(true)
          setErrorMessage('Please make sure to write a comment, select a number of stars and a number of coins for your comment')
          return;
        }

        // Create a reference to the SF doc.
        const sfDocRef = doc(db, 'Bars', barId);

        try {
          await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
              throw 'Document does not exist!';
            }

            let newComments = sfDoc.data().comments;
            newComments.push(commentObj);
            setBarComments(newComments);
            transaction.update(sfDocRef, { comments: newComments });
          });
          console.log('Transaction successfully committed!');
        } catch (e) {
          console.log('Transaction failed: ', e);
        }
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
            <Image
              onClick={() => starClick(1)}
              className={styles.ratingItem}
              src={starsState[0]}
              alt='rating star number 1'
            />
            <Image
              onClick={() => starClick(2)}
              className={styles.ratingItem}
              src={starsState[1]}
              alt='rating star number 2'
            />
            <Image
              onClick={() => starClick(3)}
              className={styles.ratingItem}
              src={starsState[2]}
              alt='rating star number 3'
            />
            <Image
              onClick={() => starClick(4)}
              className={styles.ratingItem}
              src={starsState[3]}
              alt='rating star number 4'
            />
            <Image
              onClick={() => starClick(5)}
              className={styles.ratingItem}
              src={starsState[4]}
              alt='rating star number 5'
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
            <Image
              onClick={() => coinClick(1)}
              className={styles.ratingItem}
              src={coinState[0]}
              alt='rating coin number 1'
            />
            <Image
              onClick={() => coinClick(2)}
              className={styles.ratingItem}
              src={coinState[1]}
              alt='rating coin number 2'
            />
            <Image
              onClick={() => coinClick(3)}
              className={styles.ratingItem}
              src={coinState[2]}
              alt='rating coin number 3'
            />
            <Image
              onClick={() => coinClick(4)}
              className={styles.ratingItem}
              src={coinState[3]}
              alt='rating coin number 4'
            />
            <Image
              onClick={() => coinClick(5)}
              className={styles.ratingItem}
              src={coinState[4]}
              alt='rating coin number 5'
            />
          </div>
        );
      }


      if(!auth.currentUser){
        return null;
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
                placeholder={'Comment here'}
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
        marginLeft: '15px',
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
                <Image src={invertedStars}  alt={props.stars + 'stars'}/>
              </div>
              <div style={coinsStyle} className={styles.ratingCoins}>
                <Image src={invertedCoins} alt={props.coins + 'coins'}/>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.commentSectionContainer}>
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
      <Modal showModal={modalState} closeModal={toggleModal} linkId={barId}/>
      <ErrorMessage showError={showErrorState} closeError={closeErrorMSG} message={errorMessage}  errorTitle={'Attention'}/>
      <div className={styles.barContainerDesktop}>
        <h1 class={styles.barNameTitle}>{barInfo.barName}</h1>
        <div className={styles.desktopImageContainer}>
          <img src={barInfo.photoURL} className={styles.barBigImage} />
        </div>
        <div className={styles.barInformationContainer}>
          <h2 className={styles.subTitleBig}>About the place</h2>
          <p>{barInfo.longDescription}</p>
          <button onClick={() => toggleModal(barId)} className={styles.shareButton}>
            <Image alt='Share icon' src={shareIcon} width={20} height={20}/>
          </button>
        </div>
        <Map />
        <CommentSection />
      </div>
    </main>
  );
}
