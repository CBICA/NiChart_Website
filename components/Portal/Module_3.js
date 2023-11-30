import React, { useState } from 'react';
import { FormControl, MenuItem, Select, Button, InputLabel } from '@mui/material';
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


async function getDefaultCSV () {
    let cachedResult = await getModule2Cache();
    if (Object.keys(cachedResult).length === 0) {
        alert("We couldn't import your results because there doesn't appear to be output from Module 2. Please generate the output first or upload the file to Module 3 manually.")
        return null;
    }
    return cachedResult.csv
}

const Module_3 = ({moduleSelector}) => {
  const [referenceDataOption, setReferenceDataOption] = useState('iSTAGING data');
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
    fullName: roiData.Full_Name,
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
    if (referenceDataOption === 'iSTAGING data') {
      referenceFilePath = '/content/Portal/Visualization/Reference_Data/iSTAGING_Data.csv';
    } else if (referenceDataOption === 'UK Biobank data') {
      // referenceFilePath = '/public/content/Portal/Visualization/Reference_Data/UK_Biobank_Data.csv';
    } else if (referenceDataOption === 'ADNI data') {
      // referenceFilePath = '/public/content/Portal/Visualization/Reference_Data/ADNI_Data.csv';
    } else {
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
    
    if (uploadedFile && uploadedFile instanceof File) {
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
            const newName = `${selectedROI.id}: ${selectedROI.fullName} | ${plot.referenceOption}`;
            return { ...plot, roi: newROI, name: newName };
          }
        }
        return plot;
      });
      return updatedPlots;
    });
  };
  

  const handleReferenceChange = (plotName, newReference) => {
    setPlots(prevPlots => {
      const updatedPlots = prevPlots.map(plot => {
        if (plot.name === plotName) {
          const newName = plot.name.replace(plot.referenceOption, newReference);
          return { ...plot, referenceOption: newReference, name: newName };
        }
        return plot;
      });
      return updatedPlots;
    });
  };

  return (
    <div>
      <h2>Module 3: Visualization</h2>
      <Divider orientation="horizontal" />
      <div className={styles.moduleContainer}>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlItem}>
            <FormControl variant="standard">
                <InputLabel>Select Reference Data</InputLabel>
                <Select
                  value={referenceDataOption}
                  onChange={(e) => setReferenceDataOption(e.target.value)}
                >
                  <MenuItem value="All data">All data</MenuItem>
                  <MenuItem value="iSTAGING data">iSTAGING data</MenuItem>
                  <MenuItem value="UK Biobank data">UK Biobank data</MenuItem>
                  <MenuItem value="ADNI data">ADNI data</MenuItem>
                </Select>
              </FormControl>
          </div>
          <div className={styles.controlItem}>
            <Autocomplete
              value={roiFullNames.find(roi => roi.id === roiColumn) || null}
              onChange={(event, newValue) => {
                // If newValue is null (input cleared), use the default ROI ID
                setROIColumn(newValue ? newValue.id : "702: Intra Cranial Volume");
              }}
              options={roiFullNames}
              getOptionLabel={(option) => `${option.id}: ${option.fullName}`}
              renderInput={(params) => (
                <TextField {...params} label="Select ROI column" variant="standard" />
              )}
              disableClearable
            />
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
