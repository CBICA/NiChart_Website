import React, { useState } from 'react';
import { FormControl, MenuItem, Select, Button, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Papa from 'papaparse';
import Chart from './Chart';
import styles from '../../styles/Portal_Module_3.module.css';

const Module_3 = () => {
  const [referenceDataOption, setReferenceDataOption] = useState('iSTAGING data');
  const [roiColumn, setROIColumn] = useState('MUSE_ICV');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [plots, setPlots] = useState([]);

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

    if (!uploadedFile) {
      const newPlot = {
        name: `${roiColumn} | ${referenceDataOption}`,
        data: [],
        reference: referenceData,
        referenceOption: referenceDataOption,
        roi: roiColumn,
      };
      setPlots([...plots, newPlot]);
      return;
    };

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        const plotName = `${roiColumn} | ${referenceDataOption} | ${uploadedFile.name}`;
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
  };

  const handleDeletePlot = (plotName) => {
    setPlots(plots.filter(plot => plot.name !== plotName));
  };

  const handleROIChange = (plotName, newROI) => {
    setPlots(prevPlots => {
      const updatedPlots = prevPlots.map(plot => {
        if (plot.name === plotName) {
          const newName = plot.name.replace(plot.roi, newROI);
          return { ...plot, roi: newROI, name: newName };
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
      <div className={styles.controlsContainer}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlItem}>
            <FormControl variant="outlined" className={styles.referenceDataSelect}>
                <InputLabel htmlFor="reference-data-select">Select Reference Data</InputLabel>
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
          </div>
        </div>
        <div className={styles.controlsGrid}>
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
          </div>
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
  );
};

export default Module_3;
