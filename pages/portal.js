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
import { Button, Flex } from '@aws-amplify/ui-react';
// import awsconfig from './aws-exports';

function Portal() {

  // State to track the selected module
  const [selectedModule, setSelectedModule] = useState('module1'); 
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
        <Sidebar handleModuleSelection={handleModuleSelection}/>
        <div className={styles.modulePage}>
            <Flex direction = {{ base: 'row' }} height="60px" justifyContent="flex-start">
                {/* <h3> Hello, {user.attributes.email}! </h3><Button onClick={signOut}> Sign Out </Button> */}
                <h3>Hello, user</h3><Button>Sign Out</Button>
            </Flex>
            {selectedModule === 'module1' && <Module_1 />}
            {selectedModule === 'module2' && <Module_2 />}
            {selectedModule === 'module3' && <Module_3 />}
            <div>
              <h4> By using niCHART Pipelines, you agree to share your uploaded image data with the University of Pennsylvania for processing only. All data is deleted after 24 hours. </h4>
              To use, drop files into the box on the left. When results are available, click to download.
              Jobs may take up to 2 minutes to start depending on resource availability and other conditions.
            </div>
        </div>
      </div> 
      <Footer />
    </div>
  // )}
  // </Authenticator>
  );
}

export default Portal;

