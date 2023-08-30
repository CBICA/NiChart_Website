import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import NiiVue from '../../utils/niiViewer.js'
import Modal from 'react-modal';
import { Select, MenuItem, Button} from '@mui/material';



const PlotlyChart = dynamic(() => import('react-plotly.js'), { ssr: false });

const Chart = ({ name, data, reference, roi, referenceOption, onDelete, onROIChange, onReferenceDataChange }) => {
  const [chartData, setChartData] = useState([]);
  const [chartLayout, setChartLayout] = useState(null);
  const [chartConfig, setChartConfig] = useState(null);
  const [eventHandlers, setEventHandlers] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [selectedDataPoint, setSelectedDataPoint] = useState(null); // State for clicked data point info

  const openModal = (dataPoint) => {
    setSelectedDataPoint(dataPoint);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedDataPoint(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Calculate the marker size based on the number of data points
    const calculateMarkerSize = (dataLength) => {
      const minSize = 12;
      const maxSize = 6;
      const minDataLength = 10;
      const maxDataLength = 1000;
    
      // Clamp dataLength between minDataLength and maxDataLength
      const clampedDataLength = Math.min(Math.max(dataLength, minDataLength), maxDataLength);
    
      // Calculate the interpolation factor (0 to 1) based on dataLength
      const interpolationFactor = (clampedDataLength - minDataLength) / (maxDataLength - minDataLength);
    
      // Linearly interpolate the marker size between minSize and maxSize
      const markerSize = minSize + interpolationFactor * (maxSize - minSize);
      return Math.floor(markerSize);
    };
    const filteredData = reference.filter((row) => row.ROI === roi);
    const updatedData = [];
    const referenceDataKeys = ["centile_5", "centile_10", "centile_25", "centile_50", "centile_75", "centile_90", "centile_95"];
    const redColors = referenceDataKeys.map((key, index) => {
      const centerIndex = (referenceDataKeys.length - 1) / 2;
      const distanceFromCenter = Math.abs(index - centerIndex);
      const lightness = 80 + distanceFromCenter * distanceFromCenter * 2;
      return `hsl(0, 100%, ${lightness}%)`;
    });

    // Add reference scatter traces for each centile key
    for (let i = 0; i < referenceDataKeys.length; i++) {
      const key = referenceDataKeys[i];
      updatedData.push({
        x: filteredData.map((row) => row.Age_At_Visit),
        y: filteredData.map((row) => row[key]),
        mode: 'line',
        line: {
          color: redColors[i],
        },
        fill: key=="centile_5" ? 'none':'tonexty', // Fill area below the line
        fillcolor: redColors[i], // Use the same color for the filled area
        type: 'scatter',
        name: key,
        hovermode: false,
      });
    }
    // Add user data scatter trace
    updatedData.push({
      x: data.map((row) => parseFloat(row["Age"])),
      y: data.map((row) => parseFloat(row[roi])),
      id: data.map((row) => row["ID"]),
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'blue',
        size: calculateMarkerSize(data.length),
      },
      name: "User data",
    });
    
    const yValues = data.map((row) => parseFloat(row[roi]));
    const minDataPoint = Math.min(...yValues);
    const maxDataPoint = Math.max(...yValues);
    // Calculate the range based on 25% of the highest and lowest data points
    const dataRange = [minDataPoint * 0.75, maxDataPoint * 1.25];
    
    const layout = {
      title: name,
      xaxis: { title: "Age" },
      yaxis: { 
        title: roi,
        range: dataRange,
      },
      hovermode:'closest',
    };
    
    const config = {
      scrollZoom: true,
      editable: true,
      toImageButtonOptions: {
                              format: 'svg', // one of png, svg, jpeg, webp
                              filename: 'custom_image',
                              height: 500,
                              width: 700,
                              scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                            },
      displaylogo: false,
    };

    const onClickHandler = (event) => {
      if (event.points) {
          const clickedDataPoint = event.points[0];
          const { x, y, curveNumber, pointNumber, data} = clickedDataPoint;
          if ("id" in data){
            // If ID exists, we have user data. 
            const id = data["id"][pointNumber];

            // Do w/e
            const message = `Clicked Data Point:\nX: ${x}\nY: ${y}\nCurve Number: ${curveNumber} \nID: ${id}`;
            console.log(message);
            openModal({
              x,
              y,
              curveNumber,
              id,
              // Other data you want to pass to the modal, e.g. url
            });
          }
          else {
            // do nothing, as centile data points were clicked
          }
        }
    };

    setChartData(updatedData);
    setChartLayout(layout);
    setChartConfig(config);
    setEventHandlers({ click: onClickHandler,});
  }, [data.x, data.y, name, reference, roi]);

  return (
    <div>
      <PlotlyChart  data={chartData} 
                    layout={chartLayout} 
                    config={chartConfig} 
                    onClick={eventHandlers?.click}
                    />
      <div>
        {/* Dropdown to select ROI */}
        <label>Select ROI:</label>
        <Select value={roi} onChange={(e) => onROIChange(e.target.value)}>
          <MenuItem value="MUSE_ICV">MUSE_ICV</MenuItem>
            <MenuItem value="MUSE_TBR">MUSE_TBR</MenuItem>
            <MenuItem value="MUSE_GM">MUSE_GM</MenuItem>
            <MenuItem value="MUSE_WM">MUSE_WM</MenuItem>
            <MenuItem value="MUSE_VN">MUSE_VN</MenuItem>
            <MenuItem value="MUSE_HIPPOL">MUSE_HIPPOL</MenuItem>
            <MenuItem value="MUSE_HIPPOR">MUSE_HIPPOR</MenuItem>
        </Select>

        {/* Dropdown to select reference data */}
        <label>Select Reference Data:</label>
        <Select value={referenceOption} onChange={(e) => onReferenceDataChange(e.target.value)}>
            <MenuItem value="All data">All data</MenuItem>
            <MenuItem value="iSTAGING data">iSTAGING data</MenuItem>
            <MenuItem value="UK Biobank data">UK Biobank data</MenuItem>
            <MenuItem value="ADNI data">ADNI data</MenuItem>
        </Select>

        {/* Button to destroy the plot */}
        <Button onClick={onDelete}>Destroy Chart</Button>
      </div>
      {/* Modal to show the NiiVue component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="NiiVue Modal"
        style={{
          overlay: {
            // Overlay styles (if needed)
          },
          content: {
            width: '50%',    // Adjust the width as needed
            height: '50%',   // Adjust the height as needed
            margin: 'auto',  // Center the modal horizontally
          },
        }}
      >
      {/* Nii Vue visualization here */}
        {selectedDataPoint && (
          <NiiVue imageUrl={"/content/Portal/Visualization/Reference_Data/T1_0000.nii.gz"}> </NiiVue>
          // <NiiVue imageUrl={`/content/Portal/Visualization/Reference_Data/${selectedDataPoint.id}.nii.gz`} />
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Chart;
