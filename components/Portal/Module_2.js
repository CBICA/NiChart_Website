import React from 'react';
import { Flex, Heading, Divider, Button } from '@aws-amplify/ui-react';
import { SpareScoresInputStorageManager, SpareScoresDemographicStorageManager, JobList, launchSpareScores, getSpareScoresOutput } from '../../utils/uploadFiles.js'
import styles from '../../styles/Portal_Module_2.module.css'

function Module_2() {
  return (
    <div>
      <h2>Module 2: ML</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column">
              <Heading level={3}>Upload Subject CSV</Heading>
              <SpareScoresInputStorageManager />
              <Heading level={3}>Upload Demographic CSV</Heading>
              <SpareScoresDemographicStorageManager />
              <Button onClick={async () => launchSpareScores() } >Generate SPARE scores</Button>
              </Flex>
              <Flex direction="column">
              <JobList jobQueue="cbica-nichart-sparescores-jobqueue" />
              </Flex>
              <Flex direction="column">
              <Button onClick={async () => getSpareScoresOutput() } >Download SPARE score CSV</Button>
              </Flex>
          </Flex>
      </div>
    </div>
  );
}

export default Module_2;