import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Documentation.module.css';

const Documentation = () => {
    return (
      <div>
        <Header />
        <div className={styles.documentationPage}>
          <h2>Documentation</h2>
          {/* Include the documentation content here */}
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Documentation;
  