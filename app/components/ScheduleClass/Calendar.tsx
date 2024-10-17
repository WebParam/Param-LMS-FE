"use client"; 
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import "../../css/calendar.css";
import { createClass } from "@/app/lib/actions/class-session";
import { IClassSession } from "@/app/interfaces/class-session";
import DeleteClassModal from "./DeleteClassModal";

const ScheduleClassModal = dynamic(() => import("./ScheduleClassModal"), {
  ssr: false,
});

const Calendar: React.FC<{ sessions: IClassSession[] }> = ({ sessions }) => {
  const [classId, setClassId] = useState<string | undefined>("");
  const [classTitle, setClassTitle] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [deleteClassModalOpen, setDeleteClassModalOpen] = useState<boolean>(false);
  const [duration, setDuration] = useState(30); // default duration in minutes
  const [endTime, setEndTime] = useState("");
  const [isSpecialDate, setIsSpecialDate] = useState(false);
  const [link, setLink] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [title, setTitle] = useState("");
  const [classSessions, setClassSessions] = useState<IClassSession | any>()

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDateClick = (date: Date) => {
    
    setClassSessions(null);
    setSelectedDate(date);
    setShowModal(true);
    if (date.getDate() === 31 && date.getMonth() === 6 && date.getFullYear() === 2024) {
      setStartTime("08:00");
      setEndTime("09:00");
      setTitle("Python Lesson");
      setLink("https://meet.google.com/vca-twic-ijk");
      setIsSpecialDate(true);
    } else {
      setStartTime("");
      setEndTime("");
      setTitle("");
      setLink("");
      setIsSpecialDate(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const calculateEndTime = (start: string, duration: number) => {
    const [hours, minutes] = start.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    setEndTime(`${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`);
  };

  const renderCalendar = () => {
    const daysInCurrentMonth = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
      const formattedDate = currentDayDate.toISOString().split("T")[0];
      const eventsData = sessions.filter((event) => event.date.startsWith(formattedDate));
      days.push(
        <div key={i} className="calendar-day">
          <span className="calendar-day-number">{i}</span>
          <button className="create-button" onClick={() => handleDateClick(currentDayDate)}>+</button>
          {eventsData.length > 0 && (
            <div className="events-container">
              {eventsData.map((event, index) => (
                <div key={index} className="event">
                  <button className="event-dot"></button>
                  <span onClick = {() => {
                  
                    setClassSessions(event);
                    setShowModal(true);
                  }} className="event-text">{event.startingTime} {event.title.length > 20 ? `${event.title.substring(0, 20)}...` : event.title}</span>
                  <i onClick={() => {
                    setDeleteClassModalOpen(true);
                    setClassTitle(event.title);
                    setClassId(event.id);
                  }} className="material-icons text-danger" style={{color:"tomato", fontSize: "15px", position:"absolute", right:"-16px", cursor:"pointer"}}>
                    delete
                  </i>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };



  return (
    <div className="calendar p-2">
      <DeleteClassModal show={deleteClassModalOpen} id={classId} classTitle={classTitle} onHide={() => setDeleteClassModalOpen(false)} />
      <div className="calendar-header">
        <Button variant="link" onClick={handlePrevMonth} className="calendar-nav">&lt;</Button>
        <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
        <Button variant="link" onClick={handleNextMonth} className="calendar-nav">&gt;</Button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => <div key={index} className="calendar-day-header">{day}</div>)}
        {renderCalendar()}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-lg">
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>{isSpecialDate ? "Class Details" : "Schedule Class"}</Modal.Title>
          <Button variant="link" onClick={handleCloseModal} className="btn btn-sm">&times;</Button>
        </Modal.Header>
        <Modal.Body>
          <ScheduleClassModal onClose={handleCloseModal} event={classSessions} selectedDate={selectedDate} defaultTitle={title} defaultStartTime={startTime} defaultEndTime={endTime} defaultLink={link} isSpecialDate={isSpecialDate} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;
