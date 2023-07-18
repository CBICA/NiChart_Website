import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PlotlyChart = dynamic(() => import('react-plotly.js'), { ssr: false });

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartLayout, setChartLayout] = useState(null);

  useEffect(() => {
    // Fetch or generate your chart data here
    const data = [
      {
          type: 'scatter',  // all "scatter" attributes: https://plotly.com/javascript/reference/#scatter
          x: [1, 2, 3],     // more about "x": #scatter-x
          y: [3, 1, 6],     // #scatter-y
          marker: {         // marker is an object, valid marker keys: #scatter-marker
              color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
          }
      },
      {
          type: 'bar',      // all "bar" chart attributes: #bar
          x: [1, 2, 3],     // more about "x": #bar-x
          y: [3, 1, 6],     // #bar-y
          name: 'bar chart example' // #bar-name
      }
  ];

  const layout = {             
      title: 'simple example', 
      xaxis: {                 
          title: 'Age'         
      }
  };
    setChartData(data);
    setChartLayout(layout);
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return <PlotlyChart data={chartData} layout={chartLayout} />;
};

export default Chart;
