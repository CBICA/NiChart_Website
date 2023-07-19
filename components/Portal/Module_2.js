import React from 'react';
import { Flex, Heading, Divider } from '@aws-amplify/ui-react';
import { DefaultStorageManagerExample, JobList } from '../../utils/uploadFiles.js'
import styles from '../../styles/Portal_Module_2.module.css'

function Module_2() {
  return (
    <div>
      <h2>Module 2: Machine Learning</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column">
              <DefaultStorageManagerExample/>
              </Flex>
              <Flex direction="column">
                  <Heading level={3}>Jobs in Progress</Heading>
                  <JobList />
              </Flex>
          </Flex>
      </div>
    </div>
  );
}

export default Module_2;