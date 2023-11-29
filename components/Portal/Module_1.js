import React from 'react';
import { Flex, Heading, Divider, Text } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_1.module.css'
import { DefaultStorageManagerExample, JobList, getCombinedImageZip, getCombinedCSV, runModule1Jobs, emptyBucketForUser, uploadToModule2 } from '../../utils/uploadFiles.js'
import { setUseModule1Results, getModule1Cache } from '../../utils/NiChartPortalCache.js'
import { RemoteFileDisplay } from './RemoteFileDisplay.js'
import { ResponsiveButton as Button } from '../Components/ResponsiveButton.js'

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

async function getCSV () {
    
}

async function getImages () {
    
}

function Module_1({moduleSelector}) {
  return (
    <div>
      <RemoteFileDisplay bucket="cbica-nichart-inputdata" />
      <Button variation="destructive" onClick={async () => confirm("hi?")}>Click me!</Button>
      <h2>Module 1: Image Processing</h2>
      <div className={styles.moduleContainer}>
          <Divider orientation="horizontal" />
          <Flex direction={{ base: 'column', large: 'row' }} maxWidth="100%" padding="1rem" width="100%" justifyContent="flex-start">
              <Flex justifyContent="space-between" direction="column" width="33%">
              <Heading level={3}>Upload Input T1 Scans</Heading>
              Upload NIfTI-format (.nii.gz) T1 MRI brain scans only. Please, no spaces in filenames.
              
              You may alternatively upload a .zip file containing your .nii.gz files. We strongly recommend this if you are uploading more than 5 scans. The system will unpack the archive which may take up to a minute. Note that we cannot support archives greater than 10GB.
              <p>When uploading large files, you may see fluctuations in the displayed progress. Do not worry -- as long as the upload does not fail, it will correct itself.</p>
              <DefaultStorageManagerExample/>
              <Button variation="primary" loadingText="Submitting..." onClick={async () => runModule1Jobs()} >Submit</Button> 
              <Button variation="destructive" loadingText="Emptying..." onClick={async () => emptyBucketForUser('cbica-nichart-inputdata')}>Remove All Data</Button>
              </Flex>
              <Divider orientation="vertical" />
              <Flex direction="column" width="33%">
                  <Heading level={3}>Jobs in Progress</Heading>
                  <p>Jobs will appear here a few seconds after submission. Finished jobs will be marked with green. Please wait jobs to finish before proceeding. If your job fails, please contact us and provide the job ID listed below.</p>
                  <JobList jobQueue="cbica-nichart-helloworld-jobqueue2"/>
              </Flex>
              <Divider orientation="vertical" />
              <Flex direction="column" width="33%">
                  <Heading level={3}>Download Results</Heading>
                  <Text>Results will be downloaded for all scans that have finished processing (those marked green on the job list). All other scans will continue running but will not be included. We recommend that you download your results. You can also directly export your results to the next module.</Text>
                  <Button loadingText="Downloading CSV..." variation="primary" onClick={async () => getCombinedCSV(true) } >Download MUSE CSV</Button>
                  <Button loadingText="Downloading Images..." variation="primary" onClick={async () => getCombinedImageZip(true) } >Download MUSE ROIs</Button>
                  <Button loadingText="Exporting..." onClick={async () => await exportModule1Results(moduleSelector) } >Export to Module 2</Button>
                  <Button loadingText="Emptying..." variation="destructive" onClick={async () => emptyBucketForuser('cbica-nichart-outputdata') }>Clear All Output Data</Button>
              </Flex>
          </Flex>
      </div>
    </div>
  );
}

export default Module_1;