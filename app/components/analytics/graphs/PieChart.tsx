'use client'
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart({options, series}: any) {
  return <ReactApexChart options={options} series={series} type="pie" width={380} />;
}