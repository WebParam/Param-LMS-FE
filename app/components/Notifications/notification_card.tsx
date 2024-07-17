import React from 'react'


interface NotificationCardProps {
  setShowModal: (show: boolean) => void;
}

interface Notification {
  title: string;
  message: string;
  recipient: string;
  sentDate: string;
}

export default function NotificationCard({ setShowModal }: NotificationCardProps) {
  const notifications: Notification[] = [
    {
      title: 'Upload All Documents',
      message: "Please ensure that all your document's are properly uploaded to delay acceptance",
      recipient: 'Course Student',
      sentDate: '13 July 2024',
    },

    {
      title: 'Prepare for Summative Assessment',
      message: "Dear Students, Please note that you will be writing your summative on the 20th of July 2024.  The assessment will be open from 08:00am until 11:59pm. Please ensure that you submit your work in record time.",
      recipient: 'Course Student',
      sentDate: '10 July 2024',
    },
    // Add more notifications as needed
  ];

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 style={{ marginBottom: '0.5rem' }}>Notifications History</h6>
        <div>
          <button className="btn mx-1" style={{ color: 'green' }}>{'<'}</button>
          <button className="btn mx-1" style={{ color: 'green' }}>{'>'}</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Message</th>
              <th scope="col">Recipient</th>
              <th scope="col">Sent Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index} style={{ height: '100px' }}>
                <td>{notification.title}</td>
                <td style={{ overflowY: 'auto' }}>{notification.message}</td>
                <td>{notification.recipient}</td>
                <td>{notification.sentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}