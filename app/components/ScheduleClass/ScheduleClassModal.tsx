"use client"; // Add this line at the top
import "../../css/ScheduleClassForm.css"; // Import the CSS file

import React, { useState, FormEvent } from "react";

interface ScheduleClassModalProps {
  onClose: () => void;
}

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="schedule-class-form">
      <div className="form-group">
        <label htmlFor="title">Class Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group date-time-group">
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <select
            id="startTime"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          >
            <option value="">Select time</option>
            <option value="15:00">3:00pm</option>
            <option value="15:30">3:30pm (30 mins)</option>
            <option value="15:45">3:45pm (45 mins)</option>
            <option value="16:00">4:00pm (1 hr)</option>
            <option value="16:30">4:30pm (1.5 hrs)</option>
            <option value="17:00">5:00pm (2 hrs)</option>
          </select>
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            className="form-control"
            value={endTime}
            readOnly
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="location">Add location</label>
        <input
          type="text"
          id="location"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="link">Class Link</label>
        <input
          type="url"
          id="link"
          className="form-control"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success save-button">Save</button>
    </form>
  );
};

export default ScheduleClassModal;