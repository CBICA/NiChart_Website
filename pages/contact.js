import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import styles from '../styles/Contact.module.css';


const Contact = () => {
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
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your email" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your message" required />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className={styles.contactInfo}>
            <h2 class="footer-heading">Contact Us</h2>
            <h3 class="footer-site-name">CBICA</h3>
            <p class="address"> 3700 Hamilton Walk Richards Building, 7th Floor Philadelphia, PA 19104</p>
            <br></br>
            <span class="phone">
                <a href="tel:+1-215-746-4060">215-746-4060</a>
            </span>
            <br></br>
            <span class="directions">
                <a href="https://goo.gl/maps/9SkjfpSLwHY1YFzW9">Directions</a>
            </span>
            <br></br>
            <div className='google-maps'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.6297914270904!2d-75.20029352253465!3d39.949669871518395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c72677dd280d%3A0x7888b382a71d5f44!2sRichards%20Medical%20Research%20Laboratories!5e0!3m2!1sen!2sus!4v1689101746189!5m2!1sen!2sus" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

