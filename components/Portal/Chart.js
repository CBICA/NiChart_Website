import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const PlotlyChart = dynamic(() => import('react-plotly.js'), { ssr: false });

const Chart = ({ data, xAxis, yAxis, name, onXAxisChange, onYAxisChange, onDestroy }) => {
  const [chartData, setChartData] = useState(null);
  const [chartLayout, setChartLayout] = useState(null);

  useEffect(() => {
    const updatedData = [
      {
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      },
    ];

    const layout = {
      title: name,
      xaxis: { title: xAxis },
      yaxis: { title: yAxis },
    };

    setChartData(updatedData);
    setChartLayout(layout);
  }, [data.x, data.y, name, xAxis, yAxis]);

  const handleXAxisChange = (e) => {
    onXAxisChange(e.target.value);
  };

  const handleYAxisChange = (e) => {
    onYAxisChange(e.target.value);
  };

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div>
      <input type="text" value={xAxis} onChange={handleXAxisChange} placeholder="X-axis" />
      <input type="text" value={yAxis} onChange={handleYAxisChange} placeholder="Y-axis" />
      <button onClick={onDestroy}>Destroy Chart</button>
      <PlotlyChart data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Chart;
