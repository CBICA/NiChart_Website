import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import reportWebVitals from '/utils/reportWebVitals';
import styles from '../styles/index.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Home</title>
        <Favicons />
      </Head>
      
      <Header />
      
      {/* Content of your homepage */}
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to NiChart!</h1>
        <div className={styles.photoContainer}>
            <div className={styles.photoItem}>
                <img src="/images/Home/brain_anatomy.jpg" alt="Brain anatomy - Image by Raman Oza from Pixabay"/>
            </div>
            <div className={styles.photoItem}>
                <img src="/images/Home/brain_ai.jpg" alt="Brain AI - Image by Gerd Altmann from Pixabay"/>
            </div>
            <div className={styles.photoItem}>
                <img src="/images/Home/embroidered_brains.jpg" alt="Embroidery of brains - Author/Copyright holder: Hey Paul Studios. Copyright terms and licence: CC BY 2."/>
            </div>
            <div className={styles.photoItem}>
                <img src="/images/Home/MRI_scan_2.jpg" alt="MRI scan of a fixed cerebral hemisphere from a person with multiple sclerosis - Credit: Govind Bhagavatheeshwaran, Daniel Reich, National Institute of Neurological Disorders and Stroke, National Institutes of Health"/>
            </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();