"use client";
import { IAdminPasswordChangeReset } from "@/app/interfaces/user";
import { AdminResetPassword } from "@/app/lib/data/users";
import React, { useState } from "react";
import Cookies from "universal-cookie";

// Function to check if a password is strong
const isStrongPassword = (password: string): boolean => {
  // Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [viewMsg, setViewMsg] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [strengthMessage, setStrengthMessage] = useState("");

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);

    // Check password strength
    if (!isStrongPassword(password)) {
      setStrengthMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setStrengthMessage("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const changePassword = async () => {
    // Validate form before submission
    if (newPassword !== confirmPassword) {
      setFormError("New password and confirm password do not match.");
      setFormSuccess("");
      setViewMsg(true);
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setFormError("New password is not strong enough.");
      setFormSuccess("");
      setViewMsg(true);
      return;
    }

    // Prepare payload
    const payload: IAdminPasswordChangeReset = {
      userId: user?.id,
      oldPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    setLoading(true);
    setViewMsg(false);

    // Call the API to reset password
    const response = await AdminResetPassword(payload);
    if (response?.id) {
      setViewMsg(true);
      setFormSuccess("Password changed successfully.");
      setFormError("");
    } else {
      setViewMsg(true);
      setFormError("Failed to change password.");
      setFormSuccess("");
    }
    setLoading(false);
  };

  return (
    <div className="col-lg-9 pr-lg-0">
      <div className="page-section">
        <h4>Change Password</h4>
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
        <div className="list-group list-group-form">
          <div className="list-group-item">
            <div className="form-group row mb-0">
              <label className="col-form-label col-sm-3">
                Current Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password ..."
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row mb-0">
              <label className="col-form-label col-sm-3">New Password</label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password ..."
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {strengthMessage && (
                  <small className="text-danger">{strengthMessage}</small>
                )}
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row mb-0">
              <label className="col-form-label col-sm-3">
                Confirm Password
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password ..."
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
          </div>
          <button
            onClick={changePassword}
            className={`btn  ${loading ? "btn-secondary" : "btn-success"}`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
