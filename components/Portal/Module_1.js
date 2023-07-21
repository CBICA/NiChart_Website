import React from 'react';
import { Flex, Heading, Divider, Button, Text } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_1.module.css'
import { DefaultStorageManagerExample, JobList, getCombinedImageZip, getCombinedCSV } from '../../utils/uploadFiles.js'

function Module_1() {
  return (
    <div>
      <h2>Module 1: ROI Volume Processing</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column">
              <DefaultStorageManagerExample/>
              </Flex>
              <Flex direction="column">
                  <Heading level={3}>Jobs in Progress</Heading>
                  <JobList jobQueue="cbica-nichart-helloworld-jobqueue2"/>
              </Flex>
              <div>
                  <Heading level={3}>Download Results</Heading>
                  <Text>Results will be downloaded for all subjects that have finished processing.</Text>
                  <Button onClick={async () => getCombinedCSV() } >Download MUSE CSV</Button>
                  <Button onClick={async () => getCombinedImageZip() } >Download MUSE ROIs</Button>
              </div>
          </Flex>
      </div>
    </div>
  );
}

export default Module_1;