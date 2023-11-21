import React, { useState, useEffect } from 'react';
import { Collection, ScrollView, Button, Flex, Text, Divider, Loader, Link, Badge } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Amplify, Auth, Storage } from 'aws-amplify';
import { BatchClient, ListJobsCommand }  from "@aws-sdk/client-batch";
import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { getUseModule1Results, getUseModule2Results, getModule1Cache, getModule2Cache, getModule3Cache, setModule1Cache, setModule2Cache, setModule3Cache } from './NiChartPortalCache'

Amplify.configure(awsconfig)
Auth.configure(awsconfig)
Storage.configure(awsconfig)

export async function generatePresignedScanURL (subjectID) {
    const credentials = await Auth.currentCredentials();
    const region = 'us-east-1';
    const presigner = new S3RequestPresigner({
    credentials,
    region,
    //sha256: Hash.bind(null, "sha256"), // In Node.js
    sha256: Sha256 // In browsers
    });
    const bucket = "cbica-nichart-inputdata";
    const key = "private/" + credentials.identityId + "/" + subjectID + ".nii.gz";
    const s3ObjectUrl = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
    console.log("PRESIGNED URL (SCAN): ", formatUrl(url));
    return url;
    
}

export async function generatePresignedROIURL (subjectID, roi) {
    const credentials = await Auth.currentCredentials();
    const region = 'us-east-1';
    const presigner = new S3RequestPresigner({
    credentials,
    region,
    //sha256: Hash.bind(null, "sha256"), // In Node.js
    sha256: Sha256 // In browsers
    });
    const bucket = "cbica-nichart-outputdata";
    const key = "private/" + credentials.identityId + "/individual_rois/" + subjectID + "_DLMUSE_" + roi +  ".nii.gz";
    const s3ObjectUrl = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
    console.log("PRESIGNED URL (ROI): ", formatUrl(url));
    return url;
    
}

const invoke = async (funcName, payload) => {
  const client = createClientForDefaultRegion(LambdaClient);
  const command = new InvokeCommand({
    FunctionName: funcName,
    Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
  });

  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  return { logs, result };
};

export async function onInputUploadStart() {
    
}

export async function onInputUploadSuccess(key) {
    
}

export async function onInputUploadError() {
    
}

async function generateCombinedCSV() {
    console.log("generateCombinedCSV")
    const credentials = await Auth.currentCredentials();
    const client = new LambdaClient({
          credentials: Auth.essentialCredentials(credentials),
          region: 'us-east-1',
       });
    const command = new InvokeCommand({
         FunctionName: 'cbica-nichart-bundle-pipelines-output',
         //Payload: JSON.stringify(payload),
         LogType: LogType.Tail,
       });
  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  console.log("result: " + result)
  console.log("logs: " + logs)
  return result.replaceAll('"', '');
}

async function generateCombinedImageZip() {
    console.log("generateCombinedImageZip")
    const credentials = await Auth.currentCredentials();
    const client = new LambdaClient({
          credentials: Auth.essentialCredentials(credentials),
          region: 'us-east-1',
       });
    const command = new InvokeCommand({
         FunctionName: 'cbica-nichart-bundle-pipeline-images',
         //Payload: JSON.stringify(payload),
         LogType: LogType.Tail,
       });
  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  console.log("result: " + result)
  console.log("logs: " + logs)
  return result.replaceAll('"', '');
}

export async function getCombinedCSV(doBrowserDownload) {
    try {
        const resultKey = await generateCombinedCSV();
        let resp = await downloadOutputFile(resultKey, doBrowserDownload);
        if (getUseModule1Results()) {
            setModule1Cache({'csv': resp})
        }
    }
    catch (error) {
        console.log("Error getting combined CSV:", error)
        alert("Could not retrieve your CSV file! Please re-run the pipeline.")
    }
}
export async function getCombinedImageZip(doBrowserDownload) {
    try {
        const resultKey = await generateCombinedImageZip();
        await downloadOutputFile(resultKey, doBrowserDownload);
    }
    catch (error) {
        console.log("Error getting combined image zip: ", error)
    }

}

async function downloadOutputFile(key, doBrowserDownload) {
      // Log config for download
      console.log("downloadOutputFile")
      console.log("Key: " + key);
      console.log(awsconfig)
      try {
        const result = await Storage.get(key, {bucket:'cbica-nichart-outputdata', download:true, level:'private'})
        if (doBrowserDownload) {
            downloadBlob(result.Body, key);
        }
        return result.Body
      }
      catch (error) {
          console.log("Error during file download: ", error);
      }
      
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

export async function uploadToModule2(file) {
    let userInfo = await Auth.currentAuthenticatedUser();
    let username = userInfo.username
    const credentials = await Auth.currentCredentials();
    const key = "sparescores/input.csv"
    const result = await Storage.put(key, file, {'bucket': 'cbica-nichart-inputdata', 'level': 'private', 'metadata': {'uploadedByUser': credentials.identityId, 'uploadedByUsername': username}})
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
      acceptedFileTypes={['.nii.gz']}
      accessLevel="private"
      maxFileCount={1024}
      shouldAutoProceed={false}
      processFile={processFile}
      isResumable
      //onSuccess={onSuccess}
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
      <ScrollView height="100px">
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
      </ScrollView>
    </>
  );
};

export const JobList = ({jobQueue}) => {
  let [jobs, setJobs] = useState({});
  let [currentUsername, setCurrentUsername] = useState('');
  //let [jobQueue, setJobQueue] = useState('');

  
  async function downloadResult(job_id) {
      // Log config for download
      const key = job_id + ".zip";
      console.log("Key: " + key);
      console.log(awsconfig)
      
      const result = await Storage.get(key, {bucket:'cbica-nichart-outputdata', download:true, level:'private'})
      downloadBlob(result.Body, job_id + ".zip");
      
  }
  
  async function update () {
      if (!jobQueue) {
          return;
      }
      //console.log("jobQueue: " + jobQueue)
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
          jobQueue: jobQueue,
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
          //console.log("CREATED AT: " + item['createdAt']);
          if (!(item['jobId'] in jobs)) {
              //addNewJob(item.jobId, item.status)
              newJobs[item['jobId']] = {
                    job_id: item['jobId'],
                    status: item['status'],
                    created_at: item['createdAt'],
                    download_ready: false,
                    download_text: "Waiting on results..." 
                    }; 
          }
          else {
              jobs[item['jobId']]['status'] = item['status'];
              jobs[item['jobId']]['created_at'] = item['createdAt'];
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
         if (item.status == "FAILED") {
            if (Object.keys(jobs).length > 0) {
                jobs[item['jobId']]["download_text"] = "Job failed!";
                jobs[item['jobId']]["download_ready"] = false;
                jobs[item['jobId']]["terminated"] = true;
            }
            else {
                newJobs[item['jobId']]["download_text"] = "Results Available!";
                newJobs[item['jobId']]["download_ready"] = false;
                newJobs[item['jobId']]["terminated"] = true;
            }
        }
      let mergedJobs = {...jobs, ...newJobs};
      setJobs(mergedJobs);
      
      }
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
  
  function wasCreatedWithin24Hours(job) {
      //console.log(job)
      //console.log("Checking date")
      //console.log(job.created_at)
      let created = new Date(job.created_at);
      let pastDay = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
      //console.log(created)
      //console.log(pastDay)
      if ( created > pastDay ) { return true } else { return false}
  }
  
  return (
  <>
    <ScrollView height="300px">
    <Collection 
      items={Object.values(jobs)}
      type="list"
      direction="column"
      gap="10px"
      wrap="nowrap"
    >
    {(item, index) => (
     <div hidden={!wasCreatedWithin24Hours(item)}>
      <Flex direction={{ base: 'row' }} width="100%" justifyContent="space-between">
      { item.download_ready? <Badge variation="success">:)</Badge> : item.terminated? <Badge variation="error">:(</Badge> : <Loader size="large"/> }
      <Text>{item.job_id} - {item.status}</Text>
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

export const JobListForSpareScores = () => {
    let list = new JobList();
    list.setJobQueue("cbica-nichart-sparescores-jobqueue")
    return list;
}

export const JobListForPipelines = () => {
    let list = new JobList();
    list.setJobQueue("cbica-nichart-helloworld-jobqueue2")
    return list;
}

export async function emptyBucketForUser(bucket) {
    console.log("emptyBucketForUser")
    console.log("PLACEHOLDER, FIX ME")

    const listedObjects = await Storage.list('', {'bucket': bucket,'level': 'private', 'pageSize': 'ALL'});
    console.log("listedObjects")
    console.log(listedObjects)
    if (listedObjects.results.length === 0) return;


    for (const result of listedObjects.results) {
        console.log("Removing file key " + result.key)
        await Storage.remove(result.key, {'bucket': bucket, 'level': 'private'});
    }
    alert("Successfully cleared all user input data.")

    //await s3.deleteObjects(deleteParams).promise();

    //if (listedObjects.IsTruncated) await emptyBucketForUser(bucket, user);

}

export async function runModule1Jobs() {
    console.log("runModule1Jobs")
    const credentials = await Auth.currentCredentials();
    const client = new LambdaClient({
          credentials: Auth.essentialCredentials(credentials),
          region: 'us-east-1',
       });
    const command = new InvokeCommand({
         FunctionName: 'cbica-nichart-helloworld-jobprocessor',
         //Payload: JSON.stringify(payload),
         LogType: LogType.Tail,
       });
  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  console.log("result: " + result)
  console.log("logs: " + logs)
  return result.replaceAll('"', '');
}
//async function submitButtonClicked() {
//    alert('Starting Job!');
//    let userInfo = await Auth.currentAuthenticatedUser();
//    console.log(userInfo);
//    let username = userInfo.username
//   let newObjectKey = username + "/" + "placeholder"
//    console.log(newObjectKey)
//    //let response = await Storage.put(
//}

// Storage Managers for Module 2

const processFileForSpareScoresInput = async ({ file }) => {
    
    let userInfo = await Auth.currentAuthenticatedUser();
    //console.log(userInfo);
    let username = userInfo.username
    console.log("processFileForSpareScoresInput: " + username)
    console.log("userInfo:")
    console.log(userInfo)
    const credentials = await Auth.currentCredentials();
    console.log("Auth.currentCredentials:")
    console.log(credentials)
    const hardcodedKey = "sparescores/input.csv"
    
    return {
        file,
        key: hardcodedKey,
        metadata: {
          uploadedByUser: credentials.identityId,
          uploadedByUsername: userInfo.username
        }
    };
}

const processFileForSpareScoresDemographics = async ({ file }) => {
    
    let userInfo = await Auth.currentAuthenticatedUser();
    //console.log(userInfo);
    let username = userInfo.username
    console.log("processFileForSpareScoresDemographics: " + username)
    console.log("userInfo:")
    console.log(userInfo)
    const credentials = await Auth.currentCredentials();
    console.log("Auth.currentCredentials:")
    console.log(credentials)
    const hardcodedKey = "sparescores/demographics.csv"
    
    return {
        file,
        key: hardcodedKey,
        metadata: {
          uploadedByUser: credentials.identityId,
          uploadedByUsername: userInfo.username
        }
    };
}

export const SpareScoresInputStorageManager = () => {
  let [files, setFiles] = React.useState({});
  
  return (
   <>
    <StorageManager
      acceptedFileTypes={['.csv']}
      accessLevel="private"
      maxFileCount={1}
      shouldAutoProceed={false}
      processFile={processFileForSpareScoresInput}
      //onSuccess={onSuccess}
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
      <ScrollView height="100px">
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
      </ScrollView>
    </>
  );
};

export const SpareScoresDemographicStorageManager = () => {
  let [files, setFiles] = React.useState({});
  
  return (
   <>
    <StorageManager
      acceptedFileTypes={['.csv']}
      accessLevel="private"
      maxFileCount={1}
      shouldAutoProceed={false}
      processFile={processFileForSpareScoresDemographics}
      //onSuccess={onSuccess}
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
      <ScrollView height="100px">
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}
      </ScrollView>
    </>
  );
};

export async function launchSpareScores() {
    console.log("launchSpareScores")
    const credentials = await Auth.currentCredentials();
    const client = new LambdaClient({
          credentials: Auth.essentialCredentials(credentials),
          region: 'us-east-1',
       });
    const command = new InvokeCommand({
         FunctionName: 'cbica-nichart-sparescores-jobprocessor',
         //Payload: JSON.stringify(payload),
         LogType: LogType.Tail,
       });
  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  console.log("result: " + result)
  console.log("logs: " + logs)
  return result.replaceAll('"', '');
}

export async function getSpareScoresOutput(doBrowserDownload) {
    try {
        let resp = await downloadOutputFile("sparescores/output.csv", doBrowserDownload);
        if (getUseModule2Results()) {
            setModule2Cache({'csv': resp})
        }
    } catch (e) {
        console.log("Caught an exception while downloading.")
        console.log(e)
        alert("Could not retrieve SPARE score output. Please wait until your job has succeeded or regenerate output if necessary.");
    }
        
}

export const JobMonitor = () => {
  let [job, setJob] = useState({});
  let [currentUsername, setCurrentUsername] = useState({});
  let [currentStatus, setCurrentStatus] = useState({});
  
  //setCurrentStatus("none")
  
  async function update() {
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
      //let user = userInfo;
      console.log(username)
      //console.log("username: " + username);
      console.log(userInfo)
      const input  = {
          jobQueue: "cbica-nichart-sparescores-jobqueue",
          filters: [{
              name: "JOB_NAME",
              values: [username+"*"]
          }]
      };
      const command = new ListJobsCommand(input);
      const response = await batchClient.send(command);
      if (response.jobSummaryList.length >= 1) {  
        const item = response.jobSummaryList[0]
        setCurrentStatus(item['status'])
        setJob(item['jobId'])
      }
      
  }
  
  useEffect(() => {
    const interval =  setInterval(() => {
        update();
    }, 10000);

    return () => clearInterval(interval);
  }, [job]);
  
  return ( 
    <>
    <div>
        <Flex>
        <Text>Status:</Text>
        { status == "SUCCEEDED"? <Badge variation="success" /> : <Loader size="large"/> }
        </Flex>   
    </div>    
    </>
  );
}