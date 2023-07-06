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