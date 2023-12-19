import React, { useState } from 'react';
import { FormControl, MenuItem, Select, Button, InputLabel } from '@mui/material';
import { Heading } from '@aws-amplify/ui-react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Divider } from '@aws-amplify/ui-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Papa from 'papaparse';
import Chart from './Chart';
import styles from '../../styles/Portal_Module_3.module.css';
import MUSEROICompleteList from '/public/content/Portal/Visualization/Dicts/MUSE_ROI_complete_list.json';
import { setUseModule2Results, getUseModule2Results, getModule2Cache } from '../../utils/NiChartPortalCache.js'
import { getSpareScoresOutput } from '../../utils/uploadFiles.js'
import { ToggleButton, ToggleButtonGroup, FormControlLabel, Radio, RadioGroup } from '@mui/material';


async function getDefaultCSV () {
    let cachedResult = await getModule2Cache();
    if (Object.keys(cachedResult).length === 0) {
        alert("We couldn't import your results because there doesn't appear to be output from Module 2. Please generate the output first or upload the file to Module 3 manually.")
        return null;
    }
    return cachedResult.csv
}

const Module_3 = ({moduleSelector}) => {
  const [referenceDataOption, setReferenceDataOption] = useState('CN');
  const [roiColumn, setROIColumn] = useState('702');
  const [uploadedFile, setUploadedFile] = useState(getDefaultCSV);
  const [plots, setPlots] = useState([]);
  const [useModule2Cache, setUseModule2Cache] = useState(getUseModule2Results());

  const disableModule2Results = async ( ) => {
    setUseModule2Cache(false);
    setUseModule2Results(false);
  }
  const enableModule2Results = async ( ) => {
    setUseModule2Cache(true);
    setUseModule2Results(true);
    getSpareScoresOutput(false);
    
    let cachedResult = getModule2Cache();
    if (Object.keys(cachedResult).length === 0) {
        alert("We couldn't export your results because there doesn't appear to be output from Module 2. Please generate the output first or upload the file to Module 3 manually.")
        return;
    }
    //console.log("cachedResult", cachedResult);
    const csvText = await cachedResult.csv.text()
    //console.log("csvText", csvText);
    setUploadedFile(csvText);
    
  }
   
  const roiFullNames = Object.entries(MUSEROICompleteList).map(([id, roiData]) => ({
    id,
    name: roiData.Name,
    fullName: roiData.Full_Name,
    consisting_of_ROIS: roiData.Consisting_of_ROIS,
    MUSE_ROI_Name: roiData.MUSE_ROI_Name,
    available: roiData.Available,
  }));

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  
  const handleAddPlot = async () => {
    
    let referenceData;
    let referenceFilePath;
    // CN
      if (referenceDataOption === 'CN') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_CN_Centiles.csv';
    } else if (referenceDataOption === 'CN - Female only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_CN_Centiles.csv';
    } else if (referenceDataOption === 'CN - Male only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_CN_Centiles.csv';
    } 
    // AD
      else if (referenceDataOption === 'AD') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_AD_Centiles.csv';
    } else if (referenceDataOption === 'AD - Female only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_AD_Centiles.csv';
    } else if (referenceDataOption === 'AD - Male only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_AD_Centiles.csv';
    } 
    // MCI
      else if (referenceDataOption === 'MCI') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_MCI_Centiles.csv';
    } else if (referenceDataOption === 'MCI - Female only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_MCI_Centiles.csv';
    } else if (referenceDataOption === 'MCI - Male only') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_MCI_Centiles.csv';
    } 
    // Backup
    else {
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
      referenceData = Papa.parse(content, { header: true }).data;
    } catch (error) {
      console.error('Error loading reference data:', error);
      setReferenceDataOption('Error loading reference data');
      return;
    }
    
    if (uploadedFile && uploadedFile instanceof File && uploadedFile.name) {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data;
          const selectedROI = roiFullNames.find((roi) => roi.id === roiColumn);
          const plotName = `${selectedROI.id}: ${selectedROI.fullName} | ${referenceDataOption} | ${uploadedFile.name}`;
          const newPlot = {
            name: plotName,
            data: parsedData,
            reference: referenceData,
            referenceOption: referenceDataOption,
            roi: roiColumn,
          };
      
          setPlots([...plots, newPlot]);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        },
      });
    } else{
      const selectedROI = roiFullNames.find((roi) => roi.id === roiColumn);
      const newPlot = {
        name: `${selectedROI.id}: ${selectedROI.fullName} | ${referenceDataOption}`,
        data: [],
        reference: referenceData,
        referenceOption: referenceDataOption,
        roi: roiColumn,
      };
      setPlots([...plots, newPlot]);
      return;
    };
  }    

  const handleDeletePlot = (plotName) => {
    setPlots(plots.filter(plot => plot.name !== plotName));
  };

  const handleROIChange = (plotName, newROI) => {
    setPlots(prevPlots => {
      const updatedPlots = prevPlots.map(plot => {
        if (plot.name === plotName) {
          const selectedROI = roiFullNames.find(roi => roi.id === newROI);
          if (selectedROI) {
            let newName = plotName;
            if ( uploadedFile && uploadedFile instanceof File ) {
              newName = `${selectedROI.id}: ${selectedROI.fullName} | ${plot.referenceOption} | ${uploadedFile.name}`;
            } else {
              newName = `${selectedROI.id}: ${selectedROI.fullName} | ${plot.referenceOption}`;
            }
            return { ...plot, roi: newROI, name: newName };
          }
        }
        return plot;
      });
      return updatedPlots;
    });
  };
  

  const handleReferenceChange = async (plotName, newReference) => {
    let newReferenceFilePath;
    // CN
    if (newReference === 'CN') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_CN_Centiles.csv';
    } else if (newReference === 'CN - Female only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_CN_Centiles.csv';
    } else if (newReference === 'CN - Male only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_CN_Centiles.csv';
    } 
    // AD
      else if (newReference === 'AD') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_AD_Centiles.csv';
    } else if (newReference === 'AD - Female only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_AD_Centiles.csv';
    } else if (newReference === 'AD - Male only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_AD_Centiles.csv';
    } 
    // MCI
      else if (newReference === 'MCI') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_ALL_MCI_Centiles.csv';
    } else if (newReference === 'MCI - Female only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_F_MCI_Centiles.csv';
    } else if (newReference === 'MCI - Male only') {
      newReferenceFilePath = '/content/Portal/Visualization/Reference_Data/NiChart_M_MCI_Centiles.csv';
    } 
    // Backup
    else {
      return;
    }
  
    try {
      const response = await fetch(newReferenceFilePath);
      if (response.status === 404) {
        console.error('Error loading reference data:', response.statusText);
        return;
      }
      const content = await response.text();
      const newReferenceData = Papa.parse(content, { header: true }).data;
  
      // Update the plots state with the new reference data
      setPlots(prevPlots => {
        return prevPlots.map(plot => {
          if (plot.name === plotName) {
            const selectedROI = roiFullNames.find(roi => roi.id === plot.roi);
            let newPlotName = plotName;
            if ( uploadedFile && uploadedFile instanceof File) {
              newPlotName = `${selectedROI.id}: ${selectedROI.fullName} | ${newReference} | ${uploadedFile.name}`;
            } else {
              newPlotName = `${selectedROI.id}: ${selectedROI.fullName} | ${newReference}`;
            }
            return { ...plot, reference: newReferenceData, referenceOption: newReference, name: newPlotName };
          }
          return plot;
        });
      });
  
    } catch (error) {
      console.error('Error loading reference data:', error);
    } 
  };
  
  const [diagnosis, setDiagnosis] = useState('CN');
  const [sex, setSex] = useState('All');
  const handleDiagnosisChange = (event, newDiagnosis) => {
    if (newDiagnosis !== null) {
      setDiagnosis(newDiagnosis);
      updateReferenceDataOption(newDiagnosis, sex);
    }
  };

  const handleSexChange = (event, newSex) => {
    if (newSex !== null) {
      setSex(newSex);
      updateReferenceDataOption(diagnosis, newSex);
    }
  };

  const updateReferenceDataOption = (selectedDiagnosis, selectedSex) => {
    let option = selectedDiagnosis;
    if (selectedSex !== 'All') {
      option += ` - ${selectedSex}`;
    }
    setReferenceDataOption(option);
  };

  return (
    <div>
      <Heading level={1}>Module 3: Visualization</Heading>
      <Divider orientation="horizontal" />
      <div className={styles.moduleContainer}>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlItem}>
            <p>Select the reference data characteristics:</p>
          </div>
          <div className={styles.controlItem}>
            <ToggleButtonGroup
              value={diagnosis}
              exclusive
              onChange={handleDiagnosisChange}
              aria-label="Diagnosis"
            >
              <ToggleButton value="CN" aria-label="CN">
                CN
              </ToggleButton>
              <ToggleButton value="MCI" aria-label="MCI">
                MCI
              </ToggleButton>
              <ToggleButton value="AD" aria-label="AD">
                AD
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={styles.controlItem}>
            <Autocomplete
              value={roiFullNames.find(roi => roi.id === roiColumn) || null}
              onChange={(event, newValue) => {
                // If newValue is null (input cleared), use the default ROI ID
                setROIColumn(newValue ? newValue.id : "702: Intra Cranial Volume");
              }}
              options={roiFullNames.filter(roi => roi.available === 'Yes')}
              getOptionLabel={(option) => `${option.id}: ${option.fullName}`}
              renderInput={(params) => (
                <TextField {...params} label="Select ROI column" variant="standard" />
              )}
              disableClearable
            />
          </div>
          <div className={styles.controlItem}>
            <ToggleButtonGroup
              value={sex}
              exclusive
              onChange={handleSexChange}
              aria-label="Sex"
            >
              <ToggleButton value="All" aria-label="All">
                All
              </ToggleButton>
              <ToggleButton value="Female only" aria-label="Female only">
                Female only
              </ToggleButton>
              <ToggleButton value="Male only" aria-label="Male only">
                Male only
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          
        </div>

        <div className={styles.controlsGrid}>
          { !getUseModule2Results() && (
          <div className={styles.controlItem}>
            <div className={styles.fileDropZone}>
              <div>
                <div className={styles.dropIcon}>
                  <CloudUploadIcon />
                </div>
                {uploadedFile ? (
                  <div>{uploadedFile.name}</div>
                ) : (
                  <div>Drop your data file here or</div>
                )}
              </div>
              <Button variant="contained" component="label">
                Browse File
                <input type="file" accept=".csv" style={{ display: 'none' }}  onChange={handleFileUpload}/>
              </Button>
            </div>
            <Button onClick={async () => {enableModule2Results()}}>Import from Module 2</Button> 
            </div>
          )
          }
          { getUseModule2Results() && (
          <div>
          <p>Using results from Module 2!</p>
          <Button onClick={async () => {disableModule2Results()}}>Upload a CSV Instead</Button> 
          </div>
          )}
          <div className={styles.controlItem}>
            <Button variant="contained" color="primary" onClick={handleAddPlot} className="add-plot-button">
              Add Plot
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.instructions}>
        <p>Explore the chart for a detailed view: Hover over data points to reveal more information. Click and drag to zoom into specific areas; double-click to return to the original view. Use the toolbar for additional functionalities like adjusting the scale, panning across the chart, or saving the chart as an image. Toggling data series on or off is also possible by interacting with the legend entries.</p>
    </div>
      <div className={styles.plotsContainer}>
          {plots.map(plot => (
            <div key={plot.name} className={styles.plotItem}>
              <Chart
                name={plot.name}
                data={plot.data}
                reference={plot.reference}
                roi={plot.roi}
                referenceOption={plot.referenceOption}
                onDelete={() => handleDeletePlot(plot.name)}
                onROIChange={newROI => handleROIChange(plot.name, newROI)}
                onReferenceDataChange={newRef => handleReferenceChange(plot.name, newRef)}
              />
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default Module_3;
