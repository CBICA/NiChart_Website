import React from 'react';
import styles from '../../styles/Footer.module.css';
import { VERSION } from '../../utils/Version.js';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          © 2023{' '}
          <a href="https://www.med.upenn.edu/cbica/" target="_blank" rel="noopener noreferrer" className={styles.cbicaLink}>
            Center for Biomedical Image Computing and Analytics (CBICA), University of Pennsylvania
          </a>
          . All rights reserved. Version {VERSION}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
