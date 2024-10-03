'use client'
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartProvider({ chartData }: any) {


  return (
    <div>
      <div style={{ height: "300px" }} id="chart" className="chart w-100 card p-2">
      <ReactApexChart 
            options={chartData.options} 
            series={chartData.series} 
            type={chartData.options.chart.type} 
            height={300} 
          />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}