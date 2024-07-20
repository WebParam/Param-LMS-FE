import React from 'react';

const SkeletonLoader: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({ width = "100%", height = "1em", style = {} }) => {
  const skeletonStyle = {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    animation: 'skeleton-loading 1.5s infinite',
    width,
    height,
    ...style,
  };

  return (
    <div style={skeletonStyle}>
      <style>
        {`
          @keyframes skeleton-loading {
            0% {
              background-color: #e0e0e0;
            }
            50% {
              background-color: #f0f0f0;
            }
            100% {
              background-color: #e0e0e0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;
