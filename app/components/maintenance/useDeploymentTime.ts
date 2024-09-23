import { useState, useEffect } from 'react';

interface DeploymentSlot {
  startTime: string;
  endTime: string;
}

export const useDeploymentTime = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [endTime, setEndTime] = useState<string | null>(null);

  const checkDeploymentTime = () => {
    const currentTime = new Date();
    let slots: DeploymentSlot[] = [];
    
    try {
      slots = JSON.parse(process.env.NEXT_PUBLIC_DEPLOYMENTSLOTS || '[]');
    } catch (error) {
      console.error('Error parsing NEXT_PUBLIC_DEPLOYMENTSLOTS:', error);
      return { isDeploymentTime: false, endTime: null };
    }
    
    for (const slot of slots) {
      const [startHour, startMinute] = slot.startTime.split(':').map(Number);
      const [endHour, endMinute] = slot.endTime.split(':').map(Number);
      
      const startDate = new Date(currentTime);
      startDate.setHours(startHour, startMinute, 0, 0);
      
      const endDate = new Date(currentTime);
      endDate.setHours(endHour, endMinute, 0, 0);
      
      if (currentTime >= startDate && currentTime <= endDate) {
        return { isDeploymentTime: true, endTime: slot.endTime };
      }
    }
    
    return { isDeploymentTime: false, endTime: null };
  };

  useEffect(() => {
    const { isDeploymentTime, endTime } = checkDeploymentTime();
    setShowBanner(isDeploymentTime);
    setEndTime(endTime);

    if (!isDeploymentTime) {
      const interval = setInterval(() => {
        const { isDeploymentTime: newIsDeploymentTime, endTime: newEndTime } = checkDeploymentTime();
        setShowBanner(newIsDeploymentTime);
        setEndTime(newEndTime);
        if (newIsDeploymentTime) {
          clearInterval(interval);
        }
      }, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, []);

  return { showBanner, endTime };
};