import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Components/Sidebar';
import styles from '../styles/Components.module.css';

const Components = () => {
  const [expandedSection, setExpandedSection] = useState('Image Processing');

  const contentBySection = {
    'Image Processing': (
      <>
        <div id="sMRI">
          sMRI HTML Content Here<br></br>
        </div>
        <div id="fMRI">
          fMRI HTML Content Here<br></br>
        </div>
        <div id="DTI">
          DTI HTML Content Here<br></br>
        </div>
      </>
    ),
    'Reference data curation': <div id="iSTAGING">iSTAGING HTML Content Here</div>,
    'Harmonization': (
      <>
        <div id="Neuroharmonize">NeuroHarmonize HTML Content Here</div>
        <div id="Combat">Combat HTML Content Here</div>
      </>
    ),
    'Machine Learning Models': (
      <>
        <div id="Supervised">Supervised HTML Content Here</div>
        <div id="Semisupervised">Semi-Supervised HTML Content Here</div>
        <div id="DL">DL Models HTML Content Here</div>
      </>
    ),
    'Data Visualization': (
      <>
        <div id="Centile curves">Centile curves HTML Content Here</div>
        <div id="Link to images">Link to images HTML Content Here</div>
        <div id="Reference values">Reference values HTML Content Here</div>
      </>
    ),
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Components</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.componentsPage}>
        <Sidebar updateExpandedSection={setExpandedSection} />
        <div>
          <div className={styles.componentsContainer}>
            {contentBySection[expandedSection]}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Components;
