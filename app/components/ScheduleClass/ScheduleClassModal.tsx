"use client";
import React, { useState, useEffect, FormEvent } from "react";
import "@/app/css/scheduleclassform.css"; 
import { createClass } from "@/app/lib/actions/class-session";
import { IClassSession } from "@/app/interfaces/class-session";
import { useRouter, useSearchParams } from "next/navigation";

interface ScheduleClassModalProps {
  onClose: () => void;
  selectedDate: Date | null;
  defaultTitle?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  defaultLink?: string;
  isSpecialDate: boolean;
}

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ onClose, selectedDate, defaultTitle, defaultStartTime, defaultEndTime, defaultLink, isSpecialDate }) => {
  const [title, setTitle] = useState(defaultTitle || "");
  const [startDate, setStartDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : "");
  const [startTime, setStartTime] = useState(defaultStartTime || "");
  const [endDate, setEndDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : "");
  const [endTime, setEndTime] = useState(defaultEndTime || "");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState(defaultLink || "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setStartDate(formattedDate);
      setEndDate(formattedDate);
    }
  }, [selectedDate]);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    startDate.setMinutes(startDate.getMinutes() + 60); 
    const endHours = startDate.getHours().toString().padStart(2, "0");
    const endMinutes = startDate.getMinutes().toString().padStart(2, "0");
    return `${endHours}:${endMinutes}`;
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setStartTime(selectedTime);

    const endTime = calculateEndTime(selectedTime);
    setEndTime(endTime);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  
  const createClassSession = async () => {
    const payload: IClassSession = {
      sessionType: 0,
      classLink: link,
      date: selectedDate?.toISOString() || "",
      title: title,
      courseId: "6669f0ff8759b480859c10a7",
      moduleId: "6669f0ff8759b480859c10a7",
      classDuration: "40",
      startingTime: startTime,
      adminId: "2266e99d85cd38e3ea88319d40",
      location: "",
    };
    try {
      const response = await createClass(payload);
      console.log("response",response);
      const date = new Date();
      const path = `/protected/admin/scheduleclass?title=${courseTitle}&refreshId=${date}`;
      router.replace(path);
    } catch (error) {
      console.log("error",error);
      alert(error);
    }
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
            onChange={handleStartTimeChange}
            required
          >
            <option value="">Select time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
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
      <button onClick={createClassSession} type="submit" className={`btn ${isSpecialDate ? "btn-danger" : "btn-success"} save-button`}>
        {isSpecialDate ? "Cancel Class" : "Save Class"}
      </button>
    </form>
  );
};

export default ScheduleClassModal;
