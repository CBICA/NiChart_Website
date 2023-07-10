import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import reportWebVitals from '/utils/reportWebVitals';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>NiChart | Home</title>
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="icon" href="/images/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32" type="image/png" />

        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
          type="image/png"
        />

        {/* Android Chrome Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/android-chrome-512x512.png"
        />
      </Head>
      
      <Header />
      
      {/* Content of your homepage */}
      <main>
        <h1>Welcome to NiChart!</h1>
        <p>Put your homepage content here.</p>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();