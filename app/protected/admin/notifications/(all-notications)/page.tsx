import NotificationCard from "@/components/Notifications/notification_card";
import { useState } from "react";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card mt-3">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          {[...Array(4)].map((_, index) => (
            <NotificationCard key={index} setShowModal={setShowModal} />
          ))}
        </div>
      </div>
    </>
  );
}
