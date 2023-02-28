import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Modal.module.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

//Icon images
import facebookIcon from '../../public/images/icons/facebook.png'
import twitterIcon from '../../public/images/icons/twitter.png'
import whatsappIcon from '../../public/images/icons/whatsapp.png'
import emailIcon from '../../public/images/icons/email.png'
import copyIcon from '../../public/images/icons/copy.png'

export default function Modal(props) {

    const [message,setMessage] = useState("")

    //BaseLinks
    const websiteLink = 'https://rota-boemia-next-js.vercel.app/bar?barId='
    const barId = props.linkId

    //Links
    const textWithLink = '&text=Look%20this%20place%20I%20found%20in%20Rota%20Bo%C3%AAmia'
    const facebookLink = 'https://www.facebook.com/sharer/sharer.php?u='
    const twitterLink =  'https://twitter.com/intent/tweet?url='
    const whatsappLink = `https://api.whatsapp.com/send/?text=${websiteLink+barId}&type=custom_url&app_absent=0`
    const emailLink = `mailto:info@example.com?&subject=Check out this new place&cc=&bcc=&body=https://rota-boemia-next-js.vercel.app/bar?barId=B0rlLQlWeqGUHOD6omaM%0A`
    
    function copyToClipboard(){

        navigator.clipboard.writeText(websiteLink+barId).then(
            () => {
                setMessage('Copied to clipboard')
            },
            () => {
              alert('Access denied')
            }
          );

    }

    function closeModal(e){
        if(e.target !== e.currentTarget) return;
        setMessage('')
        props.closeModal('')
    }
    

  if(!props.showModal){
    return null
  }

  return (
    <div onClick={closeModal} className={styles.fullScreenBackground}>
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>Share this place with your friends</h2>
            <div className={styles.shareButtonsContainer}>
                {/*Facebook*/}
                <a href={facebookLink+websiteLink+barId} target='_blank'>
                    <Image src={facebookIcon} alt='Share with facebook' className={styles.iconImage}/>
                </a>
                {/*Twitter*/}
                <a href={twitterLink+websiteLink+barId+textWithLink} target='_blank'>
                    <Image src={twitterIcon} alt='Share with twitter' className={styles.iconImage}/>
                </a>
                {/*Whatsapp*/}
                <a href={whatsappLink} target='_blank'>
                    <Image src={whatsappIcon} alt='Share with whatsapp' className={styles.iconImage}/>
                </a>
                {/*Email*/}
                <a href={emailLink} target='_blank'>
                    <Image src={emailIcon} alt='Share with email' className={styles.iconImage}/>
                </a>
                {/*ClipBoard*/}
                <Image src={copyIcon} alt='copy link' className={styles.iconImage} onClick={copyToClipboard}/>
            </div>
            <h4 className={styles.modalTitle}>{message}</h4>
        </div>
    </div>
  );
}
