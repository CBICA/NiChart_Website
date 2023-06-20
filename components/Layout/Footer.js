import React from 'react';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          Created by{' '}
          <a href="https://www.med.upenn.edu/cbica/" target="_blank" rel="noopener noreferrer">
            CBICA
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
