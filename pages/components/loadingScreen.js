import styles from '../../styles/Loading.module.css';
import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingioSpinnerSpin}>
        <div className={styles.lodingSphere}>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
