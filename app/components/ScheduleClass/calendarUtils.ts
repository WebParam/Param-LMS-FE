export const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
  
    const endDate = new Date(startDate.getTime() + duration * 60000); // duration in minutes
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
  
    return `${endHours}:${endMinutes < 10 ? '0' : ''}${endMinutes}`;
  };