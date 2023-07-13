import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Portal/Sidebar';
import Module_1 from '../components/Portal/Module_1';
import Module_2 from '../components/Portal/Module_2';
import Module_3 from '../components/Portal/Module_3';
import styles from '../styles/Portal.module.css'


function Portal() {

  const [selectedModule, setSelectedModule] = useState('module1'); // State to track the selected module
  // Function to handle module selection
  const handleModuleSelection = (module) => {
    setSelectedModule(module);
  };
  
  return (
  // <Authenticator>
  // {({ signOut, user }) => (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Portal</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.portalPage}>
        <div>
          <Sidebar handleModuleSelection={handleModuleSelection}/>
        </div>
        <div>
            {selectedModule === 'module1' && <Module_1 />}
            {selectedModule === 'module2' && <Module_2 />}
            {selectedModule === 'module3' && <Module_3 />}
        </div>
      </div> 
      <Footer />
    </div>
  // )}
  // </Authenticator>
  );
}

export default Portal;

