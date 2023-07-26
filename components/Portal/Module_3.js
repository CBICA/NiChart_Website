import React, { useState, useEffect } from 'react';
import { Text, Link } from '@aws-amplify/ui-react';
import Chart from './Chart';
import styles from '../../styles/Portal_Module_3.module.css';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Papa from 'papaparse';


function Module_3() {
  const [chartCount, setChartCount] = useState(0);
  const [chartsData, setChartsData] = useState(null);
  const [chartNames, setChartNames] = useState([]);
  const [referenceDataOption, setReferenceDataOption] = useState('All data');
  const [referenceData, setReferenceData] = useState(null);
  const defaultDataFile = 'Output_of_Module_2.csv';
  const [roiColumn, setROIColumn] = useState('MUSE_ICV');


  const handleAddChart = () => {
    setChartCount((prevCount) => prevCount + 1);
    const newChartName = `Chart ${chartCount + 1}`;
    setChartNames((prevNames) => [...prevNames, newChartName]);
  };

  const handleDestroyChart = (index) => {
    setChartCount((prevCount) => prevCount - 1);
    setChartsData((prevData) => prevData.filter((_, i) => i !== index));
    setChartNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };


  // Function to read user data from the uploaded CSV file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const userData = results.data;
          setChartsData(userData);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        },
      });
    }
  };


// Function to handle the reference data selection change
const handleReferenceDataChange = async (event) => {
  const selectedOption = event
  let referenceFilePath;

  if (selectedOption === 'All data') {
    // referenceFilePath = '/public/content/Portal/Visualization/Reference_Data/All_Data.csv';
    return;
  } else if (selectedOption === 'iSTAGING data') {
    referenceFilePath = '/content/Portal/Visualization/Reference_Data/iSTAGING_Data.csv';
  } else if (selectedOption === 'UK Biobank data') {
    // referenceFilePath = '/public/content/Portal/Visualization/Reference_Data/UK_Biobank_Data.csv';
    return;
  } else if (selectedOption === 'ADNI data') {
    // referenceFilePath = '/public/content/Portal/Visualization/Reference_Data/ADNI_Data.csv';
    return;
  } else {
    // Handle any other option here (optional)
    return;
  }

  try {
    const response = await fetch(referenceFilePath);
    if (response.status === 404) {
      console.error('Error loading reference data:', response.statusText);
      setReferenceDataOption('Error loading reference data');
      return;
    }
    const content = await response.text();
    const parsedData = Papa.parse(content, { header: true });
    setReferenceData(parsedData.data);
    setReferenceDataOption(selectedOption);
  } catch (error) {
    console.error('Error loading reference data:', error);
    setReferenceDataOption('Error loading reference data');
  }
};

  return (
    <div>
      <h2>Module 3: Plotting</h2>
      <div className={styles.moduleContainer}>
        <Text>
        This module is currently under construction.
        In the meantime, visit some work in progress at <Link isExternal="true" href="http://gurayerus.pythonanywhere.com/">our demo site.</Link>
        <Link external="true" href="http://gurayerus.pythonanywhere.com/"></Link>
        </Text>
      </div>
      <div className={styles.inputsContainer}>
        <FormControl variant="outlined" className={styles.referenceDataSelect}>
          <InputLabel htmlFor="reference-data-select">Select Reference Data</InputLabel>
          <Select
            defaultValue="All data"
            value={referenceDataOption}
            onChange={(e) => handleReferenceDataChange(e.target.value)}
            label="Reference Data"
            inputProps={{
              name: 'reference-data',
              id: 'reference-data-select',
            }}
          >
            <MenuItem value="All data">All data</MenuItem>
            <MenuItem value="iSTAGING data">iSTAGING data</MenuItem>
            <MenuItem value="UK Biobank data">UK Biobank data</MenuItem>
            <MenuItem value="ADNI data">ADNI data</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.fileDropZone}>
          <div>
            <div className={styles.dropIcon}>
              <CloudUploadIcon />
            </div>
            <div>Drop your data file here or</div>
          </div>
          <Button variant="contained" component="label">
            Browse File
            <input type="file" accept=".csv" style={{ display: 'none' }}  onChange={handleFileUpload}/>
          </Button>
          <div className={styles.selectedFile}>
            File to be used: {defaultDataFile}
          </div>
        </div>
        <FormControl variant="outlined" className={styles.referenceDataSelect}>
          <InputLabel htmlFor="ROI-column-select">Select ROI column</InputLabel>
          <Select
            defaultValue='MUSE_ICV'
            value={roiColumn}
            onChange={(e) => setROIColumn(e.target.value)}
            label="ROI column"
            inputProps={{
              name: 'ROI-column',
              id: 'ROI-column-select',
            }}
          >
            <MenuItem value="MUSE_ICV">MUSE_ICV</MenuItem>
            <MenuItem value="MUSE_TBR">MUSE_TBR</MenuItem>
            <MenuItem value="MUSE_GM">MUSE_GM</MenuItem>
            <MenuItem value="MUSE_WM">MUSE_WM</MenuItem>
            <MenuItem value="MUSE_VN">MUSE_VN</MenuItem>
            <MenuItem value="MUSE_HIPPOL">MUSE_HIPPOL</MenuItem>
            <MenuItem value="MUSE_HIPPOR">MUSE_HIPPOR</MenuItem>
          </Select>
        </FormControl>
        <button onClick={handleAddChart}>Add Plot</button>
      </div>
      <div className={styles.chartsContainer}>
        {Array.from({ length: chartCount }).map((_, index) => (
          <Chart
            key={index}
            name={chartNames[index]}
            data={chartsData}
            reference={referenceData}
            roi={roiColumn}
            onDestroy={() => handleDestroyChart(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Module_3;