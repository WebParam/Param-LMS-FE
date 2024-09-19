import React, { useState, useMemo } from 'react';
import { useDeploymentTime } from './useDeploymentTime';

const Banner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { showBanner } = useDeploymentTime();
  const message = process.env.NEXT_PUBLIC_DEPLOYMENTMESSAGE || '';
  
  const truncatedMessage = useMemo(() => {
    if (message.length <= 300) return message;
    return message.slice(0, 200) + '...';
  }, [message]);

  if (!showBanner) return null;

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FFF9C4',
      padding: '10px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <div style={{
        transition: 'all 0.3s ease-in-out',
        maxHeight: expanded ? '1000px' : '60px',
        overflow: 'hidden'
      }}>
        <p style={{ fontSize: '14px', margin: 0 }}>
          {expanded ? message : truncatedMessage}
        </p>
      </div>
      {message.length > 100 && (
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#1976D2',
            cursor: 'pointer',
            fontSize: '12px',
            marginTop: '5px'
          }}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      )}
    </div>
  );
};

export default Banner;