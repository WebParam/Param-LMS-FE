"use client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function KillSwitchPage({ message }: { message: string }) {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Service Temporarily Unavailable</h1>
        </div>
        <div className="card-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default KillSwitchPage;