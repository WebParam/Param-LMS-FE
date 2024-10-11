"use client";
import { IUserResetPasswordModel } from "@/app/interfaces/user";
import { useState } from "react";
import { BasicOTPComponent } from "./basic-otp";
import {
  adminForgotResetPassword,
  AdminSendResetOTP,
} from "@/app/lib/data/users";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [showPassInputs, setShowPassInputs] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [otpLength, setOtpLength] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");
  const router = useRouter();

  const setOtp = (e: string) => {
    setOTP(e);
    setOtpLength(e.length);
    setDisable(e.length !== 5);
  };

  const ChangePassword = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setAlertType("alert-danger");
      return;
    }

    setDisable(true);

    const payload = {
      email: email,
      password: password,
      otp: otp,
    };

    try {
      const response = await adminForgotResetPassword(payload);
      setAlertMessage("Password changed successfully. You may now login.");
      setAlertType("alert-success");
      setShowPassInputs(false);
      router.push("/auth/login");
    } catch (error: any) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertMessage(error.response.data.message);
      } else {
        setAlertMessage(
          "An error occurred while changing the password. Please try again."
        );
      }
      setAlertType("alert-danger");
    } finally {
      setDisable(false);
    }
  };

  const SendOtp = async (event: any) => {
    event.preventDefault();

    if (email.trim() === "") {
      setEmailError(true);
      setAlertMessage("Email is required.");
      setAlertType("alert-danger");
      return;
    }

    setEmailError(false);
    setDisable(true);

    try {
      const sendOtp = await AdminSendResetOTP(email);
      if (sendOtp === "User does not exist") {
        setAlertMessage(`User does not exist with email: ${email}.`);
        setAlertType("alert-danger");
        setShowPassInputs(false);
      } else if (sendOtp.id) {
        setAlertMessage(`OTP sent to ${email}.`);
        setAlertType("alert-success");
        setShowPassInputs(false);
      }
      setShowMessage(true);
    } catch (error: any) {
      console.error(error);
      setAlertMessage("Error sending OTP. Please try again later.");
      setAlertType("alert-danger");
    } finally {
      setDisable(false);
    }
  };

  return (
    <>
      <div className="page-section pb-0">
        <div className="container page__container d-flex flex-column flex-sm-row align-items-sm-center">
          <div className="flex">
            <h1 className="h2 mb-0">Reset Password</h1>
            <p className="text-breadcrumb">Account Management</p>
          </div>
          <p className="d-sm-none" />
          <a href="" className="btn btn-outline-secondary flex-column">
            Need Help?
            <span className="btn__secondary-text">Contact us</span>
          </a>
        </div>
      </div>

      <div className="page-section">
        {showPassInputs ? (
          <>
            <div className="page-section">
              <div className="container page__container">
                <div className="page-separator">
                  <div className="page-separator__text">Reset Password</div>
                </div>
                <div className="col-sm-6 p-0">
                  {showMessage && (
                    <div className={`alert ${alertType}`}>
                      <div className="d-flex flex-wrap">
                        <div className="mr-8pt">
                          <i className="material-icons">check_circle</i>
                        </div>
                        <div className="flex" style={{ minWidth: 180 }}>
                          <small className="text-100">{alertMessage}</small>
                        </div>
                      </div>
                    </div>
                  )}
                  <form>
                    <div className="form-group">
                      <label className="form-label">Email:</label>
                      {emailError && (
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600px",
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
                        We will email you with info on how to reset your
                        password.
                      </small>
                    </div>

                    <button
                      disabled={disable}
                      onClick={SendOtp}
                      className="btn btn-success"
                    >
                      {disable ? (
                        <div
                          className="spinner-border text-white"
                          role="status"
                        />
                      ) : (
                        "Reset"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container page__container">
              <div className="page-separator">
                <div className="page-separator__text">Verify OTP</div>
              </div>
              <div style={{ width: "50%", marginBottom: "1em" }}>
                <BasicOTPComponent onChange={setOtp} />
              </div>

              <div className="page-separator">
                <div className="page-separator__text">Change Password</div>
              </div>

              <form className="col-sm-5 p-0">
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <input
                    onChange={(e: any) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Type a new password ..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password2">
                    Confirm Password:
                  </label>
                  <input
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    id="password2"
                    type="password"
                    className="form-control"
                    placeholder="Confirm your new password ..."
                  />
                </div>
                <button
                  disabled={disable}
                  onClick={ChangePassword}
                  type="submit"
                  className="btn btn-success"
                >
                  Save password
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
