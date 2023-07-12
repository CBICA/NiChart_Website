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
                  <p>
                    NiChart (Neuro imaging Chart) is a software that provides a 
                    comprehensive solution for analyzing standard structural and 
                    functional brain MRI data across studies. It offers a range 
                    of features including computational morphometry, functional 
                    signal analysis, quality control, statistical harmonization, 
                    data standardization, interactive visualization, and 
                    extraction of expressive imaging signatures.
                  </p>
                  <img src="/images/Logo/brain_transparent_logo_cropped.png" alt="NiChart Logo - Image by Gerd Altmann from Pixabay"/>
                  <p> This is a second test</p>
                  <img src="/images/Logo/brain_transparent_logo_cropped.png" alt="NiChart Logo - Image by Gerd Altmann from Pixabay"/>
              </div>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  };
  
  export default About;