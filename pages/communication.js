import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import styles from '../styles/Communication.module.css';


const Communication = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Contact Us</title>
        <Favicons />
      </Head>
      <Header />
      
      <div>
        <h1>Contact Us</h1>
        <p>Have a question or need assistance? We're here to help!</p>
        <div className={styles.contactContainer}>
          <div className={styles.twitterFeed}>
            <br></br>
            <a 
              class="twitter-timeline" 
              href="https://twitter.com/NiChart_AIBIL?ref_src=twsrc%5Etfw">Tweets by NiChart_AIBIL
            </a> 
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          </div>
          <div className={styles.contactInfo}>
            <h2 className="footer-heading">CBICA</h2>
            <div className='google-maps'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.6297914270904!2d-75.20029352253465!3d39.949669871518395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c72677dd280d%3A0x7888b382a71d5f44!2sRichards%20Medical%20Research%20Laboratories!5e0!3m2!1sen!2sus!4v1689101746189!5m2!1sen!2sus" width="600" height="450" styles="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <p className="address"> 3700 Hamilton Walk Richards Building, 7th Floor Philadelphia, PA 19104</p>
            <br></br>
            <span className="phone">
                <a href="tel:+1-215-746-4060">215-746-4060</a>
            </span>
            <br></br>
            <span className="directions">
                <a href="https://goo.gl/maps/9SkjfpSLwHY1YFzW9">Directions</a>
            </span>
            <br></br>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communication;

