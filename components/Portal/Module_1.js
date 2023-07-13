import React, { useState, useEffect } from 'react';
import { Collection, ScrollView, Button, Flex, Heading, Text, Divider, Loader, Link, Badge } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Auth, Storage } from 'aws-amplify';
import { BatchClient, ListJobsCommand }  from "@aws-sdk/client-batch";
import '@aws-amplify/ui-react/styles.css';
import styles from '../../styles/Portal_Module_1.module.css'

// import awsconfig from './aws-exports';

export async function onInputUploadStart() {
    
}

export async function onInputUploadSuccess(key) {
    
}

export async function onInputUploadError() {
    
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}

async function processFile ({ file, key }) {
    
    let userInfo = await Auth.currentAuthenticatedUser();
    //console.log(userInfo);
    let username = userInfo.username
    console.log("processFile: " + username)
    console.log("userInfo:")
    console.log(userInfo)
    const credentials = await Auth.currentCredentials();
    console.log("Auth.currentCredentials:")
    console.log(credentials)
    
    return {
        file,
        key,
        metadata: {
          uploadedByUser: credentials.identityId,
          uploadedByUsername: userInfo.username
        },
    };
};

export const DefaultStorageManagerExample = () => {
  let [files, setFiles] = React.useState({});
  
  return (
   <>
    <StorageManager
      acceptedFileTypes={['.nii.gz', '.nii']}
      accessLevel="private"
      maxFileCount={1}
      shouldAutoProceed={false}
      processFile={processFile}
      //onSuccess={onSuccess}
      isResumable
      onFileRemove={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: undefined,
            };
          });
        }}
      onUploadError={(error, { key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'error',
              },
            };
          });
        }}
      onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
      onUploadStart={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'uploading',
              },
            };
          });
        }}
      />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
    </>
  );
};

export const JobList = () => {
  let [jobs, setJobs] = useState({});
  let [currentUsername, setCurrentUsername] = useState({});
  
  async function downloadResult(job_id) {
      // Log config for download
      const key = job_id + ".zip";
      console.log("Key: " + key);
      console.log(awsconfig)
      
      const result = await Storage.get(key, {bucket:'cbica-nichart-outputdata', download:true, level:'private'})
      downloadBlob(result.Body, job_id + ".zip");
      
  }
  
  async function update () {
      //setTime(new Date());
      // Check AWS Batch and update jobs in queue
      //console.log("Placeholder for checking AWS Batch...")
      const credentials = await Auth.currentCredentials();
      //console.log(credentials)
      //newCreds = Auth.essentialCredentials(credentials);
      //newCreds
      const batchClient = new BatchClient({
          credentials: Auth.essentialCredentials(credentials),
          region: 'us-east-1',
       });
      //console.log(batchClient)
      
      const userInfo = await Auth.currentAuthenticatedUser();
      setCurrentUsername(userInfo.username);
      let username = userInfo.username;
      //console.log("username: " + username);
      const input  = {
          jobQueue: "cbica-nichart-helloworld-jobqueue2",
          filters: [{
              name: "JOB_NAME",
              values: [username+"*"]
          }]
      };
      const command = new ListJobsCommand(input);
      const response = await batchClient.send(command);
      //console.log(response);
      var newJobs = {};
      for (const item of response.jobSummaryList) {
          if (!(item['jobId'] in jobs)) {
              //addNewJob(item.jobId, item.status)
              newJobs[item['jobId']] = {
                    job_id: item['jobId'],
                    status: item['status'],
                    download_ready: false,
                    download_text: "Waiting on results..." 
                    }; 
          }
          else {
              jobs[item['jobId']]['status'] = item['status'];
          }
          //var currentJob = jobs[item['jobId']];
          //currentJob['status'] = item['status'];
          if (item.status == "SUCCEEDED") {
            //console.log("Success for jobID " + item.jobId)
            //console.log(item)
            //console.log(jobs)
            if (Object.keys(jobs).length > 0) {
                jobs[item['jobId']]["download_text"] = "Results Available!";
                jobs[item['jobId']]["download_ready"] = true;
            }
            else {
                newJobs[item['jobId']]["download_text"] = "Results Available!";
                newJobs[item['jobId']]["download_ready"] = true;
            }

          }
      }
      let mergedJobs = {...jobs, ...newJobs};
      setJobs(mergedJobs);
      
    
  }
  
  useEffect(() => {
    const interval =  setInterval(() => {
        update();
    }, 10000);

    return () => clearInterval(interval);
  }, [jobs]);
  
  
  function addNewJobs(newJobs) {
      setJobs(
        {...jobs, ...newJobs}
      );
  }
  
  function addNewJob(job_id, job_status) {
      setJobs(
      {...jobs, [job_id]:
          {
            job_id: job_id,
            status: job_status
          }
      });
  }
  
  function removeJob(job_id, job_status) {
      setJobs(
      {...jobs, [job_id]:undefined
      });
  }
  
  const items = [
  {
     title: 'Placeholder Job 1'
  },
  {
    title: 'Placeholder Job 2'
  }
  ]
  
  useEffect(() => {
    update();
  }, []);
  
  return (
  <>
    <ScrollView>
    <Collection 
      items={Object.values(jobs)}
      type="list"
      direction="column"
      gap="10px"
      wrap="nowrap"
    >
    {(item, index) => (
     <div>
      <Flex direction={{ base: 'row' }} width="100%" justifyContent="space-between">
      { item.download_ready? <Badge variation="success">OK</Badge> : <Loader size="large"/> }
      <Text>{item.job_id} - {item.status} - <Link isExternal={true} onClick={ () => { downloadResult(item.job_id) }} inert={!item.download_ready}>{item.download_text}</Link></Text>
      <Button 
        variation="destructive"
        onClick={() => alert('Are you sure you want to cancel this job?') }
        >
      X
      </Button>
      </Flex>
      <Divider />
      </div>
    )}
    </Collection>
    </ScrollView>
    <Button variation="secondary" onClick={update}>Refresh</Button>
    </>
  );  
};

async function submitButtonClicked() {
    alert('Starting Job!');
    let userInfo = await Auth.currentAuthenticatedUser();
    console.log(userInfo);
    let username = userInfo.username
    let newObjectKey = username + "/" + "placeholder"
    console.log(newObjectKey)
    //let response = await Storage.put(
}
function Module_1() {
  return (
    <div>
      <h2>Module 1: ROI Volume Processing</h2>
      <div className={styles.moduleContainer}>
          <Flex direction = {{ base: 'row' }} height="60px" justifyContent="flex-end">
          {/* <h3> Hello, {user.attributes.email}! </h3><Button onClick={signOut}> Sign Out </Button> */}
          </Flex>
      </div>
      
      <div>
      <h4> By using niCHART Pipelines, you agree to share your uploaded image data with the University of Pennsylvania for processing only. All data is deleted after 24 hours. </h4>
      To use, drop files into the box on the left. When results are available, click to download.
      Jobs may take up to 2 minutes to start depending on resource availability and other conditions.
      </div>
      <Divider orientation="horizontal" />
      <Flex
        direction={{ base: 'column', large: 'row' }}
        maxWidth="100%"
        padding="1rem"
        width="100%"
        justifyContent="flex-start"
      >

        <Flex justifyContent="space-between" direction="column">
        <DefaultStorageManagerExample/>
        </Flex>
        <Flex direction="column">
          <Heading level={3}>Jobs in Progress</Heading>
          <JobList />
          
        </Flex>
      </Flex>
    </div>
  );
}

export default Module_1;