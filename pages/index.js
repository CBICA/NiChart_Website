import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Circle from '../components/Components/Circle'
import Favicons from '../components/Favicons/Favicons';
import reportWebVitals from '/utils/reportWebVitals';
import { Typography }from '@mui/material';
import styles from '../styles/index.module.css';

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [svgSize, setSvgSize] = useState(225); // Default size

  useEffect(() => {
    // Function to update the window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    // Set the initial width
    updateWindowWidth();
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSvgSize(150); // Size for extra small devices
      } else if (window.innerWidth < 1250) {
        setSvgSize(250); // Size for small devices
      } else if (window.innerWidth < 1450) {
        setSvgSize(125); // Size for medium devices
      } else if (window.innerWidth < 1750) {
        setSvgSize(150); // Size for large devices
      } else if (window.innerWidth < 1950) {
        setSvgSize(175); // Size for largest devices
      } else if (window.innerWidth < 2150) {
        setSvgSize(200); // Size for largest devices
      } 
      if (window.innerWidth > 2350) {
        setSvgSize(250); // Size for largest devices
      } else if (window.innerWidth > 2550) {
        setSvgSize(275); // Size for largest devices
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size setup

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const router = useRouter();
  const handleStepCircleClick = (sectionLabel) => {
    const sectionIdMap = {
      'Curate': 'Reference Dataset',
      'Process': 'Image Processing',
      'Harmonize': 'Harmonization',
      'Learn': 'Machine Learning Models',
      'Visualize': 'Data Visualization',
      'Deploy': 'Deployment'
    };
    const sectionId = sectionIdMap[sectionLabel];
    if (sectionId) {
      router.push(`/components#${encodeURIComponent(sectionId)}`, undefined, { shallow: true });
    }
  };
    
  const semiCircleAngleSpread = 180; // Angle spread for semi-circle (in degrees)
  const semiCircleRadius = svgSize * 1.7; // Adjust radius based on svgSize
  const centerPoint = semiCircleRadius; // Center of the semi-circle
  const StepCircle = ({ label, imageUrl, onClick, strokeColor, index, total, svgSize }) => {
    // Calculate the angle for this item
    const angleDeg = (semiCircleAngleSpread / (total - 1)) * index - (semiCircleAngleSpread / 2) + 180; // Offset by 180 deg so that it's the left semi circle.
    const angleRad = (Math.PI / 180) * angleDeg;

    // Convert polar coordinates to Cartesian coordinates
    const x = centerPoint + semiCircleRadius * Math.cos(angleRad);
    const y = centerPoint + semiCircleRadius * Math.sin(angleRad);

    // Inline styles for positioning
    const style = {
      position: 'absolute',
      left: `${x}px`,
      bottom: `${y}px`, // Adjust based on the radius
      transform: 'translate(-20%, 20%)' // Center the item on the calculated position
    };


    return (
      <div className={styles.stepCircleContainer} style={style}>
        <Circle label={label} imageUrl={imageUrl} onClick={onClick} strokeColor={strokeColor} svgSize={svgSize}/>
      </div>
    );
  };

  // Usage inside a parent component
  const steps = [
    { label: "Curate", color: "#a11f25", image: "images/Home/curate.png"},
    { label: "Process", color: "#2152ad", image: "images/Home/process.png"},
    { label: "Harmonize", color: "#92da44", image: "images/Home/harmonize.png"},
    { label: "Learn", color: "#e9a944", image: "images/Home/learn.png"},
    { label: "Visualize", color: "#f5e852", image: "images/Home/visualize.png"},
    { label: "Deploy", color: "#ac29d8", image: "images/Home/deploy.png"},
                ];

  let stepElements;
  if (windowWidth > 1250) {
    // Semicircle layout
    stepElements = steps.map((step, index) => (
      <StepCircle
        key={step.label}
        label={step.label}
        imageUrl={step.image}
        onClick={() => handleStepCircleClick(step.label)}
        strokeColor={step.color}
        index={index}
        total={steps.length}
        svgSize={svgSize}
      />
    ));
  } else {
    // Vertical list layout
    stepElements = steps.map((step) => (
      <Circle
        key={step.label}
        label={step.label}
        imageUrl={step.image}
        onClick={() => handleStepCircleClick(step.label)}
        strokeColor={step.color}
        svgSize={svgSize}
      />
    ));
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Home</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <div className={styles.textNiChart}>
            <p><a className={styles.title}>NiChart:</a><a className={styles.text}>Neuro Imaging Chart of AI-based Imaging Biomarkers</a></p>
          </div>
          <div>
            <br></br>
            <Typography variant='h5'>
              Want to help shape the future of NiChart? 
              <br></br>
              <b>Please take our <a href="https://docs.google.com/forms/d/e/1FAIpQLSddH_eg5RHI94Ph7KYAGibzRSVfXOKReGXbj0Z2YBfF_6c8SA/viewform"> 5-minute survey</a>!</b>
            </Typography>
            <br></br>
          </div>
          <div className={styles.studentPhoto}>
            <img className={styles.infographic} src="/images/Home/NiChart_info_pic_student_no_background.png" alt=""/>
          </div>
        </div>
        <div className={styles.rightSide}>
        <div className={windowWidth > 1250 ? styles.semiCircleContainer : styles.verticalLayoutContainer}>
          {windowWidth > 1250 && (
            <>
              <img src={"/images/Home/chart.jpg"} alt="NiChart" className={styles.centralImage} />
            </>
          )}
          {stepElements}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomDivision}>
          <div>
            <Typography variant='h5'>A framework to process multi-modal MRI images, harmonize to reference data, apply and contribute machine learning models and derive individualized biomarkers called "Neuroimaging Chart Dimensions"</Typography>
          </div>
          {/* Removed this ----- TODO: Do we need this language?*/}
          {/* <div className={styles.bottomTextColumn}>
            <p>NiChart aims to facilitate large-scale neuroimaging research and the wider use of advanced neuroimage analysis methods by non-experts.</p>
            <p>User-friendly web application hosted in the AWS cloud enables rapid processing of single scans and large image datasets.</p>
            <p>Data harmonization and pre-trained machine learning models provide imaging biomarkers (NiChart dimensions) that capture brain changes due to aging and disease.</p>
            <p>Users can use visualization tools to locate a subject's position within NiChart space in comparison to reference.</p>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();