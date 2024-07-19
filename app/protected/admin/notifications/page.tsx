'use client';
import PageHeader from "@/components/Notifications/PageHeader";
import NotificationCard from "@/components/Notifications/notification_card";
import { useState } from "react";
import CreateNotificationModal from "@/components/Notifications/CreateNotificationModal";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      title: 'Upload All Documents',
      message: "Please ensure that all your document's are properly uploaded to delay acceptance",
      recipient: 'Course Student',
      sentDate: '13 July 2024',
    },
    {
      title: 'Prepare for Summative Assessment',
      message: "Dear Students, Please note that you will be writing your summative on the 20th of July 2024. The assessment will be open from 08:00am until 11:59pm. Please ensure that you submit your work in record time.",
      recipient: 'Course Student',
      sentDate: '10 July 2024',
    },
  ]);

  const addNotification = (notification: { title: string; message: string; recipient: string; sentDate: string }) => {
    setNotifications([...notifications, notification]);
  };

  return (
    <>
      <CreateNotificationModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        onAddNotification={addNotification}
      />
      <PageHeader headerTitle="Notifications" buttonTitle="Create Notification" />
      <div className="card mt-3">
        <div className="table-responsive">
          <NotificationCard setShowModal={setShowModal} notifications={notifications} />
        </div>
      </div>
    </>
  );
}
// Header Component 