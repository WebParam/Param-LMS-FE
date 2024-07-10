import React, { useState } from "react";
import MyVerticallyCenteredModal from "@/app/components/course/Modal";

const NotificationPage = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleHide = () => {
    setShowNotificationModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowNotificationModal(true)}>Create Notification</button>

      {showNotificationModal && (
        <MyVerticallyCenteredModal
          modalType="notification"
          title="New Notification"
          onHide={handleHide}
        />
      )}
    </div>
  );
};

export default NotificationPage;