"use client";
import React, { useState, useEffect, FormEvent } from "react";
import "@/app/css/scheduleclassform.css";
import { createClass, updateClass } from "@/app/lib/actions/class-session";
import { IClassSession } from "@/app/interfaces/class-session";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

interface ScheduleClassModalProps {
  onClose: () => void;
  selectedDate: Date | null;
  defaultTitle?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  defaultLink?: string;
  isSpecialDate: boolean;
  event?: IClassSession;
}

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({
  onClose,
  selectedDate,
  defaultTitle,
  defaultStartTime,
  defaultEndTime,
  defaultLink,
  event,
  isSpecialDate,
}) => {
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const [title, setTitle] = useState(event?.title || defaultTitle || "");
  const [startDate, setStartDate] = useState(
    event?.date
      ? event.date.split("T")[0]
      : selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""
  );
  const [startTime, setStartTime] = useState(
    event?.startingTime || defaultStartTime || ""
  );
  const [endDate, setEndDate] = useState(
    event?.date
      ? event.date.split("T")[0]
      : selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""
  );
  const [endTime, setEndTime] = useState(defaultEndTime || "");
  const [location, setLocation] = useState(event?.location || "");
  const [link, setLink] = useState(event?.classLink || defaultLink || "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const courseId = searchParams.get("id") || "";
  const [loading, setLoading] = useState(false);
  const [classDuration, setClassDuration] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setStartDate(formattedDate);
      setEndDate(formattedDate);
    }
  }, [selectedDate]);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setStartTime(selectedTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setEndTime(selectedTime);
  };

  const calculateTimeDifference = () => {
    if (startTime && endTime) {
      const start = startTime.split(":");
      const end = endTime.split(":");
      const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
      const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
      const diff = endMinutes - startMinutes;
      return diff.toString();
    }
  };

  const validateInputs = () => {
    if (!title.trim()) return "Title is required.";
    if (!startDate) return "Start date is required.";
    if (!startTime) return "Start time is required.";
    if (!endTime) return "End time is required.";
    if (!link.trim()) return "Class link is required.";
    return null;
  };

  const createClassSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);
    calculateTimeDifference();

    const validationError = validateInputs();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);
    const payload: IClassSession = {
      id: event?.id ?? "",
      sessionType: 0,
      classLink: link,
      date: startDate,
      title: title,
      courseId: courseId,
      moduleId: "",
      classDuration: calculateTimeDifference()!,
      startingTime: startTime,
      adminId: user.id,
      location: location,
    };

    try {
      if (event) {
        const response:any = await updateClass(payload);
        if(response.id){
          setLoading(false);
          setSuccessMessage(true);
          setErrorMessage(false);
    
          const date = new Date();
          const path = `/protected/admin/scheduleclass?title=${courseTitle}&id=${courseId}&refreshId=${date}`;
          router.replace(path);
          setTimeout(() => {
            onClose();
            setSuccessMessage(false);
            setErrorMessage(false);
          }, 4000);
        }

      } else {
        const response :any = await createClass(payload);
        if(response.id){
          setLoading(false);
          setSuccessMessage(true);
          setErrorMessage(false);
    
          const date = new Date();
          const path = `/protected/admin/scheduleclass?title=${courseTitle}&id=${courseId}&refreshId=${date}`;
          router.replace(path);
          setTimeout(() => {
            onClose();
            setSuccessMessage(false);
            setErrorMessage(false);
          }, 4000);
        }

      }
 
    } catch (error) {
      setSuccessMessage(false);
      setErrorMessage(true);
      console.error("Error during class session creation:", error);
      setLoading(false);
    }
  };

  return (
    <form className="schedule-class-form" onSubmit={createClassSession}>
      <div className="form-group">
        <div className="w-100">
          <label htmlFor="title">Class Title</label>

          {successMessage && (
            <p className="alert alert-success">
              Class Session Created Successfully
            </p>
          )}
          {errorMessage && (
            <p className="alert alert-danger">Failed Creating Class Session</p>
          )}
        </div>

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
            onChange={(e) => handleStartTimeChange(e)}
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
          <label htmlFor="endTime">End Time</label>
          <select
            id="endTime"
            className="form-control"
            value={endTime}
            onChange={(e) => handleEndTimeChange(e)}
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
      <button className={`btn ${!loading ? "btn-success" : "btn-secondary"}`}>
        {loading ? (
          <span className="spinner-border text-white" role="status" />
        ) : (
          "Save Class"
        )}
      </button>
    </form>
  );
};

export default ScheduleClassModal;
