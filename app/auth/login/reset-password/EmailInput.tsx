"use client";
import { IUserResetPasswordModel } from "@/app/interfaces/user";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AdminSendResetOTP } from "@/app/lib/actions/users";
import { send } from "process";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  setShowPassInputs: (show: boolean) => void;
  setDisable: (disable: boolean) => void;
  setEmailError: (error: boolean) => void;
  setShowMessage: (show: boolean) => void;
  emailError: boolean; // Added missing prop definition
  disable: boolean; // Added missing prop definition
}

export function EmailInput({
  email,
  setEmail,
  setShowPassInputs,
  setDisable,
  setEmailError,
  setShowMessage,
  emailError, // Added missing prop
  disable, // Added missing prop
}: EmailInputProps) {
  const SendOtp = async (event: any) => {
    setDisable(true);
    let _id = toast.loading("Sending Otp..", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const payload = {
      email: email,
    } as IUserResetPasswordModel;

    if (email !== "") {
      setEmailError(false);

      const sendOtp = await AdminSendResetOTP(payload);
      if (sendOtp.id) {
        toast.update(_id, {
          render: `OTP sent successfully to ${email}.`,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
        }, 2000);
        setShowPassInputs(false);
        setShowMessage(true);
      } else {
        toast.update(_id, {
          render: `Error sending OTP..`,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
        }, 2000);
      }
    }
    event.preventDefault();
  };

  return (
    <>
      <ToastContainer />
      <div className="page-section">
        <div className="container page__container">
          <div className="page-separator">
            <div className="page-separator__text">Reset Password</div>
          </div>
          <div className="col-sm-6 p-0">
            <form>
              <div className="form-group">
                <label className="form-label">Email:</label>
                {emailError && (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "600",
                      marginLeft: "1em",
                    }}
                  >
                    * required field
                  </span>
                )}
                <input
                  value={email}
                  type="text"
                  className="form-control"
                  placeholder="Your email address ..."
                  onChange={(e: any) => {
                    setDisable(false);
                    setEmail(e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  We will email you with info on how to reset your password.
                </small>
              </div>
              <button
                disabled={disable}
                onClick={SendOtp}
                className="btn btn-accent"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
