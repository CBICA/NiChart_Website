import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import reportWebVitals from '/utils/reportWebVitals';
import styles from '../styles/index.module.css';
  
const Circle = ({ label, position }) => (
  <div className={`${styles.circle} ${styles[position]}`}>{label}</div>
);

const HomePage = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>NiChart | Home</title>
          <Favicons />
        </Head>
  
        <Header />
        
        {/* Sub-container for the image */}
        <div className={styles.imageContainer}>
          <img className={styles.infographic} src="/images/Home/main.png" alt=""/>
        </div>
        
        <Footer />
      </div>
    );
  };
  

  // const HomePage = () => {
  //   return (
  //     <div className="container">
  //       <Head>
  //         <title>NiChart | Home</title>
  //         <Favicons />
  //       </Head>
  
  //       <Header />
  
  //       <div className="main-content">
  //         <img src="/images/Home/logo.png" alt="Logo" className={styles.logo} />
  //         <img src="/images/Home/NiChart_info_pic_student.png" alt="Person with screens" className={styles.NiChart_info_pic_student} />
          
  //         {/* Position the text elements using classNames that correspond to their position */}
  //         <div className="text top-left">Neuro Imaging Chart of AI-based Imaging Biomarkers</div>
          
  //         {/* Render circle components */}
  //         <Circle label="Curate" position="top-right" />
          
  //       </div>
  
  //       <Footer />
  //     </div>
  //   );
  // };


    
export default HomePage;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();