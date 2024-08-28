"use client";
import React from "react";
import Cookies from "universal-cookie";

const BasicInformation = () => {
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");

  return (
    <div className="col-lg-9 pr-lg-0">
      <div className="page-section">
        <h4>Basic Information</h4>
        <div className="list-group list-group-form">
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                First name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user?.firstName}
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                Last name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user?.lastName}
                  placeholder={user?.lastName}
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                Email address
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  defaultValue={user?.email}
                />
                <small className="form-text text-muted">
                  Note that if you change your email, you will have to confirm
                  it again.
                </small>
              </div>
            </div>
          </div>
          <button disabled  className="btn btn-secondary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
