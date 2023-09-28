import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/About.module.css';
import Favicons from '../components/Favicons/Favicons';

const About = () => {
    return (
      <div className={styles.container}>
        <Head>
            <title>NiChart | About</title>
            <Favicons />
        </Head>
        <Header />
        <div className={styles.container}>
          <div className={styles.title}>
              <h1>About NiChart</h1>
          </div>
          <div className={styles.aboutContent}>
              <div className={styles.aboutHeaderPicture}>
                  <img src="/images/About/about_banner_picture_2.jpg" alt="NiChart Logo - Image by Gerd Altmann from Pixabay"/>
              </div>
              <div className={styles.aboutMainContent}>
                  {/* General overview */}
                  <p>NiChart is an ecosystem of software components enabling constructive integration, statistical harmonization, and ML-centric data analyses across studies. </p>
                  <img src="/images/About/NiChart_overview_diagram.svg"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Overview Diagram"/>
                  
                  {/* Model training capability emphasis */}
                  <p>Key to NiChart's essence is its role as a versatile machine learning research platform. Users can harness the capabilities of NiChart to develop and validate their own machine learning models and pipelines.</p>
                  {/* <img src="/images/About/NiChart_overview_diagram.svg"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Overview Diagram"/> */}
                  
                  {/* Different modalities */}
                  <p>
                    NiChart accommodates a range of brain scan types, including{" "}
                    <a href="/documentation/#sMRI">sMRI</a>,{" "}
                    <a href="/documentation/#fMRI">fMRI</a>, and{" "}
                    <a href="/documentation/#DTI">DTI</a>. This flexibility provides researchers with ample opportunities to explore various imaging modalities.
                  </p>
                  {/* <img src="/images/About/NiChart_overview_diagram.svg"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Overview Diagram"/> */}
                  
                  {/* Reference data */}
                  <p>NiChart is built upon a substantial dataset of 65,693 individuals, comprising 84,211 time points. This data has undergone meticulous curation, harmonization, and quality control.</p>
                  {/* <img src="/images/About/NiChart_overview_diagram.svg"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Overview Diagram"/> */}
                  
                  {/* Efficiency */}
                  <p>NiChart automates the labor-intensive aspects of data processing, facilitating feature extraction and ML model application. This efficiency significantly reduces the time required for data analysis.</p>
                  {/* <img src="/images/About/NiChart_overview_diagram.svg"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Overview Diagram"/> */}
              </div>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  };
  
  export default About;