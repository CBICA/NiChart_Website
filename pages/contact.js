import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Contact Us</h1>
        <p>Have a question or need assistance? We're here to help!</p>
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
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
