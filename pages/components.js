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
    'Reference data curation': (
      <>
        <div id="iSTAGING">iSTAGING HTML Content Here</div>
        <div id="Clinical Variables">Clinical Variables Content Here</div>
      </>
    ),
    'Image Processing': (
      <>
        <div id="DLICV, DLMUSE">
          DLICV, DLMUSE HTML Content Here<br></br>
        </div>
        <div id="sopNMF">
          sopNMF HTML Content Here<br></br>
        </div>
        <div id="fMRIPrep, XCPEngine, DTIPrep, pNet">
          fMRIPrep, XCPEngine, DTIPrep, pNet HTML Content Here<br></br>
        </div>
      </>
    ),
    'Harmonization': (
      <>
        <div id="Combat Family">Combat family HTML Content Here</div>
        <div id="Complementary tools">Complementary tools HTML Content Here</div>
      </>
    ),
    'Machine Learning Models': (
      <>
        <div id="SPARE-AD, SPARE-BA, SPARE-CVD">SPARE-AD, SPARE-BA, SPARE-CVD HTML Content Here</div>
        <div id="smileGAN, surrealGAN">smileGAN, surrealGAN HTML Content Here</div>
        <div id="DL-SPARE">DL-SPARE Models HTML Content Here</div>
      </>
    ),
    'Data Visualization': (
      <>
        <div id="NiChart_Viewer">NiChart_Viewer HTML Content Here</div>
        <div id="NiChart_Webviewer">NiChart_Webviewer HTML Content Here</div>
      </>
    ),
    'Deployment': (
      <>
        <div id="Github">Github goes here</div>
        <div id="Docker and Singularity">Docker and Singularity goes here</div>
        <div id="AWS">AWS goes here</div>
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
