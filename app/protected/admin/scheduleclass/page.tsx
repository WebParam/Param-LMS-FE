"use client";
import React, { useState } from "react";
import Calendar from "../../../components/ScheduleClass/Calendar";
import CreateNotificationModal from "@/components/Notifications/CreateNotificationModal";

function ScheduleClassPage() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
        <CreateNotificationModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
        }}
      />
      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button onClick={() => setShowModal(true)} className="btn btn-success">Create Class</button>
        </div>
      </div>

      <Calendar />
    </div>
  );
}

export default ScheduleClassPage;
