import React from 'react';

const ChartSkeleton: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({
  width = '100%',
  height = '300px',
  style = {},
}) => {
  // Bar heights are slightly randomized to simulate a more realistic loading effect
  const barHeights = ['70%', '50%', '80%', '60%', '90%', '40%', '60%', '50%'];

  return (
    <div
      className="chart-skeleton"
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px',
        padding: '10px 0',
        ...style,
      }}
    >
      {barHeights.map((barHeight, index) => (
        <div
          key={index}
          className="skeleton-bar"
          style={{
            height: barHeight,
            width: '10%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        ></div>
      ))}
    </div>
  );
};

export default ChartSkeleton;
