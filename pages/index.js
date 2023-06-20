import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

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
