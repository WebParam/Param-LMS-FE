"use client";
import { adminUpdateUserDetails, getAdminUser } from "@/app/lib/actions/users";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const BasicInformation = () => {
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [viewMsg, setViewMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async () => {
    setFormError("");
    setFormSuccess("");
    setViewMsg(false);
 
    if (!firstName || !lastName || !email) {
      setFormError("All fields are required.");
      setViewMsg(true);
      return;
    }

    const payload = {
      userId: user?.id,
      firstName,
      lastName,
      email
    };
    setLoading(true)
    const response = await adminUpdateUserDetails(payload);
    if (response?.id) {
             setFormSuccess("Your information has been successfully updated.");
    setViewMsg(true);
      setFormError("");
      setTimeout(() => {
        setViewMsg(false);
      },3000)
    } else {
      setFormError("An error occurred while updating your information. Please try again.");
      setViewMsg(true);
      setFormSuccess("");
      setIsUpdated(true)
      setTimeout(() => {
        setViewMsg(false);
      },3000)
    }
    setLoading(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const getAdminDetails = await getAdminUser(user?.id);
        setFirstName(getAdminDetails?.firstName);
        setLastName(getAdminDetails?.lastName);
        setEmail(getAdminDetails?.email)
    }
    getUser();
  },[isUpdated])

  return (
    <div className="col-lg-9 pr-lg-0">
      <div className="page-section">
        <h4>Basic Information</h4>
        {viewMsg && (
          <div
            className={`alert ${formError ? "alert-danger" : "alert-success"}`}
          >
            <div className="d-flex flex-wrap align-items-center">
              {formError && (
                <div className="text-danger text-100">{formError}</div>
              )}
              {formSuccess && (
                <div className="text-success text-100">{formSuccess}</div>
              )}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="list-group list-group-form">
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                First name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <small className="form-text text-muted">
                  Note that if you change your email, you will have to confirm
                  it again.
                </small>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className={`btn  ${loading ? "btn-secondary" : "btn-success"}`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicInformation;
