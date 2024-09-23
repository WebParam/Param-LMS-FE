"use client";
import NotificationCard from "@/components/Notifications/notification_card";
import { useState } from "react";
import CreateNotificationModal from "@/components/Notifications/CreateNotificationModal";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <CreateNotificationModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      />
      <div className="page-separator">
        <div className="page-separator__text">Recent Notifications</div>
      </div>
      <div className="card mt-3">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <NotificationCard setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
}
