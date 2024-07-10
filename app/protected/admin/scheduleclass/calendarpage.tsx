import React from 'react';
import MainLayout from '../layout';
import Calendar from '../../../components/ScheduleClass/Calendar';

const CalendarPage: React.FC = () => {
  return (
    <MainLayout>
      <h1>Calendar</h1>
      <Calendar />
    </MainLayout>
  );
};

export default CalendarPage;