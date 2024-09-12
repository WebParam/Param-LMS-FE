'use client'
import PieChartSkeleton from '@/components/skeleton/Charts/PieChartSkeletonLoader/PieChartSkeletonLoader';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart({ options, series }: any) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
      {isLoading ? (
        <PieChartSkeleton size="150px" style={{width:"250px", height:"250px"}} /> // Adjust the size for your design
      ) : (
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      )}
    </div>
  );
}
