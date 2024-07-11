"use client"; // Add this line at the top

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../css/calendar.css';
import dynamic from 'next/dynamic';

const ScheduleClassModal = dynamic(() => import('./ScheduleClassModal'), { ssr: false });

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30); // default duration in minutes
  const [endTime, setEndTime] = useState('');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    calculateEndTime(e.target.value, duration);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);
    setDuration(newDuration);
    calculateEndTime(startTime, newDuration);
  };

  const calculateEndTime = (start: string, duration: number) => {
    const [hours, minutes] = start.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    setEndTime(`${endHours}:${endMinutes}`);
  };

  const renderCalendar = () => {
    const daysInCurrentMonth = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(
        <div key={i} className="calendar-day">
          <span>{i}</span>
          <Button variant="link" className="create-button" onClick={handleDateClick}>+</Button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <Button variant="link" onClick={handlePrevMonth} className="calendar-nav">&lt;</Button>
          <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <Button variant="link" onClick={handleNextMonth} className="calendar-nav">&gt;</Button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day-header">{day}</div>
          ))}
          {renderCalendar()}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-lg">
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>Schedule Class</Modal.Title>
          <Button variant="link" onClick={handleCloseModal} className="btn btn-sm">&times;</Button>
        </Modal.Header>
        <Modal.Body>
          
          <ScheduleClassModal onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;