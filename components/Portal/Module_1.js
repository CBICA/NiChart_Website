import React from 'react';
import { Flex, Heading, Divider, Button, Text } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_1.module.css'
import { DefaultStorageManagerExample, JobList, getCombinedImageZip, getCombinedCSV, runModule1Jobs, emptyBucketForUser, uploadToModule2 } from '../../utils/uploadFiles.js'
import { setUseModule1Results, getModule1Cache } from '../../utils/NiChartPortalCache.js'
async function exportModule1Results(moduleSelector) {
    // Perform the caching transfer operation
    setUseModule1Results(true);
    getCombinedCSV(false);
    let cachedResult = getModule1Cache();
    if (Object.keys(cachedResult).length === 0) {
        alert("We couldn't export your results because there doesn't appear to be output from Module 1. Please generate the output first or upload the file to Module 2 manually.")
        return;
    }
    await uploadToModule2(cachedResult.csv);
    
    // Switch to module 2
    moduleSelector("module2");
}

function Module_1({moduleSelector}) {
  return (
    <div>
      <h2>Module 1: Image Processing</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column">
              <DefaultStorageManagerExample/>
              <Button variation="primary" onClick={async () => runModule1Jobs()} >Submit</Button> 
              <Button variation="warning" onClick={async () => emptyBucketForUser('cbica-nichart-inputdata')}>Remove All Data</Button>
              </Flex>
              
              <Flex direction="column">
                  <Heading level={3}>Jobs in Progress</Heading>
                  <p>Jobs will appear here a few seconds after submission. If your job fails, please contact us and provide the job ID listed below.</p>
                  <JobList jobQueue="cbica-nichart-helloworld-jobqueue2"/>
              </Flex>
              <Flex direction="column">
                  <Heading level={3}>Download Results</Heading>
                  <Text>Results will be downloaded for all subjects that have finished processing. We recommend that you download your results. You can also directly export your results to the next module.</Text>
                  <Button onClick={async () => getCombinedCSV(true) } >Download MUSE CSV</Button>
                  <Button onClick={async () => getCombinedImageZip(true) } >Download MUSE ROIs</Button>
                  <Button onClick={async () => await exportModule1Results(moduleSelector) } >Export to Module 2</Button>
                  <Button variation="warning" onClick={async () => emptyBucketForuser('cbica-nichart-outputdata') }>Clear All Output Data</Button>
              </Flex>
          </Flex>
      </div>
    </div>
  );
}

export default Module_1;