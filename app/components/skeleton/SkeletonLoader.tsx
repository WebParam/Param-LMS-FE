import React from 'react';
import '@/app/css/LongQuestionSkeleton.css';

const SkeletonLoader: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({ width = "100%", height = "1em", style = {} }) => {
  return (
    <div className="skeleton-loader" style={{ width, height, ...style }}></div>
  );
};

export default SkeletonLoader;
