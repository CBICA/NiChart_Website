import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PlotlyChart = dynamic(() => import('react-plotly.js'), { ssr: false });

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch or generate your chart data here
    const data = [
      {
        x: [1, 2, 3, 4, 5],
        y: [1, 4, 9, 16, 25],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      },
    ];

    setChartData(data);
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return <PlotlyChart data={chartData} layout={{ title: 'My Chart' }} />;
};

export default Chart;
