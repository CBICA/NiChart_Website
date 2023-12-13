import { React, useState, useEffect } from 'react';
import { Flex, Heading, Divider, Text, ScrollView, Collection } from '@aws-amplify/ui-react';
import styles from '../../styles/Portal_Module_1.module.css'
import { listBucketContentsForUser, deleteKeyForUser, getKeyMetadata } from '../../utils/uploadFiles.js'
import { ResponsiveButton as Button } from '../components/ResponsiveButton.js'
// This widget uses the user's Cognito credentials to list that user's bucket contents for a given bucket.
// It also provides functionality to individually delete/remove those contents.

export const RemoteFileDisplay = ({bucket}) =>  {
    
    let [remoteFiles, setRemoteFiles] = useState({});
    let [justCreated, setJustCreated] = useState(true);
    let [numberOfFiles, setNumberOfFiles] = useState(0);
    let [numberOfArchives, setNumberOfArchives] = useState(0);
    let [numberOfScans, setNumberOfScans] = useState(0);
    
    async function update() {
      console.log("Updating RemoteFileDisplay")
      const out_list = await listBucketContentsForUser(bucket)
      setRemoteFiles(out_list)
      
      var n_archives = 0;
      var n_scans = 0;
      var n_files = 0;
      if (out_list === undefined || out_list.length == 0) {
        return;
      }
      for (const item of out_list) {
          n_files += 1;
          if (fileIsArchive(item.key)) {
              n_archives += 1;
          }
          if (fileIsImage(item.key)) {
              n_scans += 1;
          }
        }
      setNumberOfFiles(n_files)
      setNumberOfArchives(n_archives)
      setNumberOfScans(n_scans)
      console.log(remoteFiles)
    } 
    
    async function deleteKeyFromBucket(key) {
        await deleteKeyForUser(bucket, key)
        //alert("Placeholder From RemoteFileDisplay: User attempting to delete key " + key);
        update()
    }
    
    function fileIsArchive (key) {
        return key.endsWith(".zip") ? true 
           : key.endsWith(".tar.gz") ? true
           : key.endsWith(".tar")? true
           : false
    }
    
    function fileIsImage (key) {
        return key.endsWith(".nii.gz") ? true
        : key.endsWith(".nii") ? true
        : false
    }
    
    function fileIsMacThumbnail (key) {
        return key.toLowerCase().includes("_macosx")
    }
    
    async function getFileStatus (key) {
        if (fileIsMacThumbnail(key)) {
            return "macOS thumbnail file (will not be processed)"
        }
        if (fileIsArchive(key)) {
            const meta = await getKeyMetadata(bucket, key)
            if (meta['ARCHIVE_STATUS'] == 'EXTRACTED') {
                return "Archive (Extracted)"
            }
            else if (meta['ARCHIVE_STATUS'] == 'FAILED') {
                return "Failed to Extract"
            }
            else {
                return "Archive (awaiting extraction)" 
            }
        }
        else if (fileIsImage(key)) {
            const meta = await getKeyMetadata(bucket, key)
            if (meta['QC_STATUS'] == 'SUCCEEDED') {
                return "Image (QC Passed)"
            }
            else if (meta['QC_STATUS'] == 'FAILED'){
                return "QC Failed: " + meta['QC_REASON']
            }
            else {
                return "Image (Status Unknown)"
            }
        }
        else {
            return "N/A";
        }
    }
    
   useEffect(() => {
    const interval =  setInterval(() => {
        update();
        //alert("updating RemoteFileDisplay");
    }, 10000);

    return () => clearInterval(interval);
    }, [remoteFiles]);
    
    if (justCreated) {
        update();
        setJustCreated(false);
    }
    
    return (
        <div>
        <Divider orientation="horizontal" />
        <h2>Successfully uploaded scans:</h2>
            <ScrollView height='400px'> 
                <Collection 
                    items={remoteFiles}
                    type="list"
                    direction="column"
                    gap="10px"
                    wrap="nowrap"
                 >
                {(item, index) => (
                    <div>
                    <Flex direction={{ base: 'row' }} width="100%" justifyContent="space-between">
                    <Text>File key: {item.key}</Text>
                    <Text>Type: { fileIsMacThumbnail(item.key)? "macOS Thumbnail (Won't be processed)" : fileIsArchive(item.key)? "Archive" : fileIsImage(item.key)? "Scan" : "Other"}</Text>
                    <Text>Status: { getFileStatus (item.key) }</Text>
                    <Button loadingText="Deleting..." variation="destructive" onClick={async () => {deleteKeyFromBucket(item.key)}}>Delete</Button>
                    </Flex>
                    <Divider />
                    </div> 
                    )}
                </Collection>
            </ScrollView>
        <p><b>Total files: {numberOfFiles} ({numberOfArchives} archives, {numberOfScans} scans)</b></p>
        <Divider orientation="horizontal" />
        </div>
    )
}