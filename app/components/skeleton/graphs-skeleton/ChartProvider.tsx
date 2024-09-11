'use client'
import ChartSkeleton from '@/components/skeleton/Charts/chart-skeleton-loader/ChartSkeleton';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartProvider({ chartData }: any) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 4000); 

    return () => clearTimeout(timer);
  }, [chartData]);

  return (
    <div>
      <div style={{ height: "300px" }} id="chart" className="chart w-100 card p-2">
        {isLoading ? (
          <ChartSkeleton width="100%" height="300px" /> 
        ) : (
          <ReactApexChart 
            options={chartData.options} 
            series={chartData.series} 
            type={chartData.options.chart.type} 
            height={300} 
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
