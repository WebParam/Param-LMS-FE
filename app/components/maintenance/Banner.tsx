import React from 'react';
import { useDeploymentTime } from './useDeploymentTime';
import MaintenanceModal from './MaintenanceModal';

const Banner: React.FC = () => {
  const { showBanner, endTime } = useDeploymentTime();

  if (!showBanner) return null;

  return (
    <MaintenanceModal show={showBanner} onHide={() => {}} endTime={endTime || undefined} />
  );
};

export default Banner;