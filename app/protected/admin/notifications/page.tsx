'use client' 
import PageHeader from "@/components/Notifications/PageHeader";
import Table from "@/components/Notifications/recent-notifications/Table";
import HeaderTitles from "./(components)/HeaderTitles";
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
      <HeaderTitles setShowModal = {setShowModal}/>

      <div className="card mt-3">

        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
         <NotificationCard/>


        </div>
      </div>
    </>

  )
}


