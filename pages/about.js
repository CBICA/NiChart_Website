import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/About.module.css';

const About = () => {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.about_container}>        
          <h1>About NiChart</h1>
          <p>
            NiChart (Neuro imaging Chart) is a software that provides a 
            comprehensive solution for analyzing standard structural and 
            functional brain MRI data across studies. It offers a range 
            of features including computational morphometry, functional 
            signal analysis, quality control, statistical harmonization, 
            data standardization, interactive visualization, and 
            extraction of expressive imaging signatures.
          </p>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default About;