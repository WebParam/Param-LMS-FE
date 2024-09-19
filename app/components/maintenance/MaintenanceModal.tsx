import React from 'react';

const MaintenanceModal: React.FC = () => (
  <div style={{
    width: '100%',
    backgroundColor: '#FFF3CD',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center'
  }}>
    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>System Maintenance</h2>
    <p style={{ fontSize: '14px' }}>The system is currently undergoing maintenance. Some features may be unavailable.</p>
  </div>
);

export default MaintenanceModal;