import React from 'react';
import { Text, Link } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_3.module.css'

function Module_3() {
  return (
    <div>
      <h2>Module 3: Plotting</h2>
      <div className={styles.moduleContainer}>
        <Text>
        This module is currently under construction.
        In the meantime, visit some work in progress at <Link isExternal="true" href="http://gurayerus.pythonanywhere.com/">our demo site.</Link>
        <Link external="true" href="http://gurayerus.pythonanywhere.com/"></Link>
        </Text>
      {/* Add the content and functionality for this module */}
      </div>
    </div>
  );
}

export default Module_3;