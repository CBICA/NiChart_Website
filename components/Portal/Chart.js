import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const PlotlyChart = dynamic(() => import('react-plotly.js'), { ssr: false });

const Chart = ({ data, name, onDestroy }) => {
  const [chartData, setChartData] = useState([]);
  const [chartLayout, setChartLayout] = useState(null);
  const [chartConfig, setChartConfig] = useState(null);
  const [eventHandlers, setEventHandlers] = useState(null);

  useEffect(() => {
    const updatedData = [
      {
        // x: data.x,
        // y: data.y,
        x: [1,2,3],
        y: [1,2,3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' ,
                  size: 16,},
        line: {color: 'red'},
      },
    ];

    const layout = {
      title: name,
      xaxis: { title: "Age" },
      yaxis: { title: "ROI" },
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
          const { x, y, curveNumber, pointNumber, fullData} = clickedDataPoint;
          const message = `Clicked Data Point:\nX: ${x}\nY: ${y}\nCurve Number: ${curveNumber}`;
          console.log(message);
        }
    };

    const onHoverHandler = (event) => {
      if (event.points) {
        const hoveredDataPoint = event.points[0];
        const { pointNumber, data } = hoveredDataPoint;
        var color = data.marker.color;
    
        // Create a deep copy of the original data
        const new_updatedData = JSON.parse(JSON.stringify(data));
    
        // Make sure new_updatedData.marker.color is an array
        new_updatedData.marker.color = Array.isArray(color) ? color : [color];
    
        // Update the color of the hovered data point
        var colors = Array(data.x.length).fill(color);
        colors[pointNumber] = 'blue';
        new_updatedData.marker.color = colors;
    
        // Set the updated data, layout, and config in state
        setChartData([new_updatedData]);
        setChartLayout(layout);
        setChartConfig(config);
        setEventHandlers({
          click: onClickHandler,
          hover: onHoverHandler,
          unhover: onUnHoverHandler,
        });
      }
    };
    
    
    const onUnHoverHandler = (event) => {
      if (event.points) {
        const hoveredDataPoint = event.points[0];
        const { data } = hoveredDataPoint;
        var color = data.marker.color;
    
        // Create a deep copy of the original data
        const new_updatedData = JSON.parse(JSON.stringify(data));
    
        // Make sure new_updatedData.marker.color is an array
        new_updatedData.marker.color = Array.isArray(color) ? color : [color];
    
        // Update the color of the hovered data point
        var colors = Array(data.x.length).fill('red');
        new_updatedData.marker.color = colors;
        setChartData([new_updatedData]);
        setChartLayout(layout);
        setChartConfig(config);
        setEventHandlers({
          click: onClickHandler,
          hover: onHoverHandler,
          unhover: onUnHoverHandler,
        });
        }
    };
    setChartData(updatedData);
    setChartLayout(layout);
    setChartConfig(config);
    setEventHandlers({ click: onClickHandler,
                       hover: onHoverHandler, 
                       unhover: onUnHoverHandler,});
  }, [data.x, data.y, name]);

  return (
    <div>
      <button onClick={onDestroy}>Destroy Chart</button>
      <PlotlyChart  data={chartData} 
                    layout={chartLayout} 
                    config={chartConfig} 
                    onClick={eventHandlers?.click}
                    onHover={eventHandlers?.hover}
                    onUnhover={eventHandlers?.unhover}
                    />
    </div>
  );
};

export default Chart;
