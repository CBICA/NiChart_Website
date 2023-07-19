import React, { useState } from 'react';
import Chart from './Chart';
import styles from '../../styles/Portal_Module_3.module.css';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Module_3() {
  const [chartCount, setChartCount] = useState(0);
  const [chartsData, setChartsData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartNames, setChartNames] = useState([]);
  const [referenceData, setReferenceData] = useState('iSTAGING data');
  const defaultDataFile = 'Output_of_Module_2.csv';

  const handleAddChart = () => {
    setChartCount((prevCount) => prevCount + 1);
    const newChartName = `Chart ${chartCount + 1}`;
    setChartsData((prevData) => [...prevData, { x: [], y: [] }]);
    setChartNames((prevNames) => [...prevNames, newChartName]);
  };

  const handleDestroyChart = (index) => {
    setChartCount((prevCount) => prevCount - 1);
    setChartsData((prevData) => prevData.filter((_, i) => i !== index));
    setChartNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  const handleXAxisChange = (index, value) => {
    setXAxis((prevAxes) => ({
      ...prevAxes,
      [index]: value,
    }));
  };

  const handleYAxisChange = (index, value) => {
    setYAxis((prevAxes) => ({
      ...prevAxes,
      [index]: value,
    }));
  };

  return (
    <div>
      <h2>Module 3: Plotting</h2>
      <div className={styles.inputsContainer}>
        <FormControl variant="outlined" className={styles.referenceDataSelect}>
          <InputLabel htmlFor="reference-data-select">Reference Data</InputLabel>
          <Select
            value={referenceData}
            onChange={(e) => setReferenceData(e.target.value)}
            label="Reference Data"
            inputProps={{
              name: 'reference-data',
              id: 'reference-data-select',
            }}
          >
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
            <input type="file" accept=".csv" style={{ display: 'none' }} />
          </Button>
          <div className={styles.selectedFile}>
            File to be used: {defaultDataFile}
          </div>
        </div>
        <button onClick={handleAddChart}>Add Plot</button>
      </div>
      <div className={styles.chartsContainer}>
        {Array.from({ length: chartCount }).map((_, index) => (
          <Chart
            key={index}
            data={chartsData[index]}
            xAxis={xAxis[index] || ''}
            yAxis={yAxis[index] || ''}
            name={chartNames[index]}
            onXAxisChange={(value) => handleXAxisChange(index, value)}
            onYAxisChange={(value) => handleYAxisChange(index, value)}
            onDestroy={() => handleDestroyChart(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Module_3;
