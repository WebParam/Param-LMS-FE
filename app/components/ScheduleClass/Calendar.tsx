"use client"; // Add this line at the top

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../css/calendar.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="success" onClick={handleCloseModal}>Create Class</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;