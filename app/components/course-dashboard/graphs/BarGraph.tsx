'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarGraph({chartData}:any) {


  return (
    <div>

<ReactApexChart options={chartData.options as any} series={chartData.series} type={chartData.options.chart.type as any}  />

    </div>
  );
}