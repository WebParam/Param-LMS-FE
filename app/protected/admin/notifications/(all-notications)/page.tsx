import NotificationCard from "@/components/Notifications/notification_card";
export default function Page() {
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
            <NotificationCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
