import React from 'react'

export default function NotificationCard() {
  return (
    <div className="border border-secondary rounded p-3 mt-3 mx-auto" style={{ width: '95%', marginLeft: '10px' }}>
      <div className="d-flex justify-content-between">
        <h6>Upload All Documents</h6>
        <h6><strong>Sent:</strong> 13 July 2024</h6>
      </div>
      <p>Please ensure that all your document's are properly uploaded to delay acceptance</p>
      <div className="d-flex justify-content-start mt-3">
        <button className="btn btn-sm" style={{ backgroundColor: 'orange', color: 'white', marginLeft: 'auto' }}>Send Reminder</button>
      </div>
    </div>
  )
}
