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
                    <p>NiChart is an ecosystem of software components enabling constructive integration, statistical harmonization, and ML-centric data analyses across studies. </p>
                    <p>NiChart enables large-scale analyses of multi-modal brain MRI data as well as mapping of such data into a dimensional system of neuroimaging signatures implemented by a large number of ML models. The axes of this dimensional system represent two types of information:</p>
                    <ol>
                    <li>a panel of structural (sMRI), diffusion (dMRI) and functional connectomic (fcMRI) imaging derived phenotypes, such as multi-scale brain parcellations and brain networks;</li>
                    <li>complex ML-based imaging signatures previously derived from carefully processed and curated data of 65,000 individuals from 22 harmonized studies. ML signatures capture multi-variate imaging patterns that reflect the heterogeneity of brain aging, neurodegeneration, as well as of neuropsychiatic disorders</li>
                    </ol>
                    <p>Using our software toolboxes researchers will be able to map new data into NiChart, ML models trained in NiChart, compare their data with NiChart-based normative ranges, and jointly evaluate their results vis-a-vis those of other studies. </p>
                    <p>Users will also be able to contribute their own ML models back to NiChart, thereby contributing to a dynamically growing community using ML neuroimaging models.</p>
                    <p>Software deployment accommodates different case scenarios, providing python installation packages through PIP, reproducible Docker and Singularity containers and a web application on AWS.</p>
                  {/* <img src="/images/Logo/brain_transparent_logo_cropped.png" alt="NiChart Logo - Image by Gerd Altmann from Pixabay"/>
                  <p> This is a second test</p>
                  <img src="/images/Logo/brain_transparent_logo_cropped.png" alt="NiChart Logo - Image by Gerd Altmann from Pixabay"/> */}
              </div>
              <div>
                  <img src="/images/About/qsiprep_workflow_full.png"  style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Workflow"/>
              </div>
              <div>
                  <img src="/images/About/xcpengine_pipelines.png" style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '80%', height: 'auto' }} alt="Pipelines"/>
              </div>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  };
  
  export default About;