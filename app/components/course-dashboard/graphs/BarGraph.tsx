import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const BarGraph = ({chartData}:any) => {

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
      />
    </div>
  );
};

export default BarGraph;