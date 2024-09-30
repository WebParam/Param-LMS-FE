"use client";
import React, { useEffect, useState } from "react";
import Calendar from "../../../components/ScheduleClass/Calendar";
import CreateNotificationModal from "@/components/Notifications/CreateNotificationModal";
import { Button, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import { IClassSession } from "@/app/interfaces/class-session";
import { getCourseClassSessions } from "@/app/lib/actions/class-session";
import { useSearchParams } from "next/navigation";


const ScheduleClassModal = dynamic(
  () => import("@/app/components/ScheduleClass/ScheduleClassModal"),
  { ssr: false }
);

function ScheduleClassPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30); // default duration in minutes
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isSpecialDate, setIsSpecialDate] = useState(false);
  const [courseClassSessions, setCourseClassSessions] = useState<IClassSession[]>([]);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateClick = (date: Date) => {
    if (
      date.getDate() === 31 &&
      date.getMonth() === 6 &&
      date.getFullYear() === 2024
    ) {
      setSelectedDate(date);
      setShowModal(true);
      setStartTime("08:00");
      setEndTime("09:00");
      setTitle("Python Lesson");
      setLink("https://meet.google.com/vca-twic-ijk");
      setIsSpecialDate(true);
    } else {
      setSelectedDate(date);
      setShowModal(true);
      setStartTime("");
      setEndTime("");
      setTitle("");
      setLink("");
      setIsSpecialDate(false);
    }
  };
  const getCurrentDay = () => {
    return new Date().getDate(); 
  };

  const fetchCourseClassSessions = async () => {
    try {
      const classSessions = await getCourseClassSessions("6669f0ff8759b480859c10a7");
      setCourseClassSessions(classSessions);
    } catch (error) {
      console.log("Error on getCourseClassSessions", error);
    }
  }

  useEffect(() => {
    fetchCourseClassSessions();
  }, [searchParams]);

  return (
    <div className="container">
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-lg"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>
            {isSpecialDate ? "Class Details" : "Schedule Class"}
          </Modal.Title>
          <Button
            variant="link"
            onClick={handleCloseModal}
            className="btn btn-sm"
          >
            &times;
          </Button>
        </Modal.Header>
        <Modal.Body>
          <ScheduleClassModal
            onClose={handleCloseModal}
            selectedDate={selectedDate}
            defaultTitle={title}
            defaultStartTime={startTime}
            defaultEndTime={endTime}
            defaultLink={link}
            isSpecialDate={isSpecialDate}
          />
        </Modal.Body>
      </Modal>
      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button
            onClick={() =>
              handleDateClick(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), getCurrentDay() + 1)
              )
            }
            className="btn btn-success"
          >
            Create Class
          </button>
        </div>
      </div>

      <Calendar sessions={courseClassSessions} />
    </div>
  );
}

export default ScheduleClassPage;
