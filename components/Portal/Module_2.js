import { React, useState } from 'react';
import { Flex, Heading, Divider, Button } from '@aws-amplify/ui-react';
import { SpareScoresInputStorageManager, SpareScoresDemographicStorageManager, JobList, launchSpareScores, getSpareScoresOutput, emptyBucketForUser, uploadToModule2, getCombinedCSV } from '../../utils/uploadFiles.js'
import { getUseModule1Results, setUseModule1Results, setUseModule2Results, getModule2Cache } from '../../utils/NiChartPortalCache.js'
import styles from '../../styles/Portal_Module_2.module.css'

function exportModule2Results(moduleSelector) {
    // Perform the caching transfer operation
    setUseModule2Results(true);
    getSpareScoresOutput(false);
    let cachedResult = getModule2Cache();
    if (Object.keys(cachedResult).length === 0) {
        alert("We couldn't export your results because there doesn't appear to be output from Module 2. Please generate the output first or upload the file to Module 3 manually.")
        return;
    }
    // Switch to module 3
    moduleSelector("module3");
}

function Module_2({moduleSelector}) {
  const [useModule1Cache, setUseModule1Cache] = useState(getUseModule1Results());
  
  async function disableModule1Results() {
      setUseModule1Results(false);
      setUseModule1Cache(false);
  }
  
  async function enableModule1Results() {
      setUseModule1Results(true);
      setUseModule1Cache(true);
      getCombinedCSV(false);
      let cachedResult = getModule1Cache();
      if (Object.keys(cachedResult).length === 0) {
         alert("We couldn't import your results because there doesn't appear to be output from Module 1. Please generate the output first or upload the file to Module 2 manually.")
         return;
      }
      await uploadToModule2(cachedResult.csv)
      

  }
    
  return (
    <div>
      <h2>Module 2: Machine Learning</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column" width="33%">
              <Heading level={3}>Upload Subject CSV</Heading>
              Upload your ROI volume CSV as output by Module 1. Alternatively, upload your own ROI volume CSV.
              { !getUseModule1Results() && (<SpareScoresInputStorageManager />)}
              { !getUseModule1Results() && (<Button onClick={async () => await enableModule1Results()}>Import from Module 1</Button>)}
              { getUseModule1Results() && (<p>Using results from Module 1!</p>)}
              { getUseModule1Results() && (<Button onClick={async () => await disableModule1Results()}>Upload a CSV Instead</Button>) }
              <Heading level={3}>Upload Demographic CSV</Heading>
              <p>This file should correspond to the subjects uploaded above and contain demographic data (Age, Sex). Subjects should be on individual rows and subject IDs should correspond to the original T1 filename (without the extension).</p>
              <SpareScoresDemographicStorageManager />
              <Button variation="primary" onClick={async () => launchSpareScores() } >Generate SPARE scores</Button>
              </Flex>
              <Divider orientation="vertical" />
              <Flex direction="column" width="33%">
              <Heading level={3}>Jobs in Progress</Heading>
              SPARE scores that are currently being calculated will appear here. Finished jobs will be marked with green. Please wait for your jobs to finish before proceeding. If your job fails, please contact us and provide the job ID listed below.
              <JobList jobQueue="cbica-nichart-sparescores-jobqueue" />
              </Flex>
              <Divider orientation="vertical" />
              <Flex direction="column" width="33%">
              <Heading level={3}>Download SPARE Output</Heading>
              All finished subjects will be included in the output when you click Download.
              <Button variation="primary" onClick={async () => getSpareScoresOutput(true) } >Download SPARE score CSV</Button>
              <Button onClick={async () => exportModule2Results(moduleSelector) } >Export to Module 3</Button>
              <Button variation="warning" onClick={async () => emptyBucketForUser('cbica-nichart-sparescores-io')} >Clear All Data</Button>
              </Flex>
          </Flex>
      </div>
    </div>
  );
}

export default Module_2;