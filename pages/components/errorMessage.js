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

export default function ErrorMessage(props) {

    const message = props.message

    function closeWindow(e){
        if(e.target !== e.currentTarget) return;
        props.closeError()
    }
    

  if(!props.showError){
    return null
  }

  return (
    <div onClick={closeWindow} className={styles.fullScreenBackground}>
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>{props.errorTitle}</h2>
            <div className={styles.shareButtonsContainer}>
              <p>{message}</p>
            </div>
        </div>
    </div>
  );
}
