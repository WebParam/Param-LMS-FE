import React from 'react';

// Skeleton loader component for simulating a pie chart
const PieChartSkeleton: React.FC<{ size?: string; style?: React.CSSProperties }> = ({
  size = '400px',
  style = {},
}) => {
  return (
    <div
      className="pie-chart-skeleton"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'conic-gradient(#e0e0e0 25%, #f0f0f0 25% 50%, #e0e0e0 50% 75%, #f0f0f0 75%)',
        animation: 'rotate 1.5s linear infinite',
        ...style,
      }}
    ></div>
  );
};

export default PieChartSkeleton;
