import PageHeader from "@/components/Notifications/PageHeader";
import Table from "@/components/Notifications/recent-notifications/Table";
import HeaderTitles from "./(components)/HeaderTitles";
import NotificationCard from "@/components/Notifications/notification_card";





export default function Page() {
  return (

    <>
      <HeaderTitles />

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


