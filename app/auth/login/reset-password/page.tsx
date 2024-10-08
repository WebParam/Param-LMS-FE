"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BasicOTPComponent } from "./basic-otp";
import {
  adminForgotResetPassword,
  AdminSendResetOTP,
} from "@/app/lib/actions/users";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [showPassInputs, setShowPassInputs] = useState(true);
  const [disable, setDisable] = useState(false);
  const [sendEmailSuccess, setSendEmailSuccess] = useState(false);
  const [sendEmailError, setSendEmailError] = useState(false);
  const [sendOtpError, setSendOtpError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const router = useRouter();

  const handleOTPChange = (otpValue: string) => {
    setOTP(otpValue);
    setDisable(otpValue.length !== 5);
  };

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    setPasswordMatchError(false);

    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setDisable(true);
    try {
      const payload = { email, password, otp };
      await adminForgotResetPassword(payload);

      setSendOtpError(false);
      setShowPassInputs(false);
      router.push("/");
    } catch (error: any) {
      console.error(error);

      setDisable(false);
    }
  };

  const sendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    setSendEmailError(false);
    setSendEmailSuccess(false);
    event.preventDefault();
    if (!email.trim()) {
     
      return;
    }

    setDisable(true);
    try {
      const payload = { email };
      const response = await AdminSendResetOTP(payload);
      if (response == "User does not exist") {
        setSendEmailError(true);
        setSendEmailSuccess(false);
      } else if (response.data.id) {
        setSendEmailError(false);
        setSendEmailSuccess(true);
        debugger;
        setTimeout(() => {
          setSendEmailError(false);
          setSendEmailSuccess(false);
          setShowPassInputs(false);
        }, 4000);
      }
    } catch (error: any) {
      console.error("Error", error);
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
          {showPassInputs ? (
            <a href="/" className="btn btn-success flex-column">
              <span className="btn__secondary-text">Login</span>
            </a>
          ) : (
            <div
              onClick={() => setShowPassInputs(true)}
              className="btn btn-success flex-column"
            >
              <span className="btn__secondary-text">Resend OTP</span>
            </div>
          )}
        </div>
      </div>

      <div className="page-section">
        {showPassInputs ? (
          <>
            <div className="container page__container">
              <div className="page-separator">
                <div className="page-separator__text">Reset Password</div>
              </div>
              <div className="col-sm-6 p-0">
                <form onSubmit={sendOtp}>
                  <div className="form-group">
                    <label className="form-label">Email:</label>

                    <input
                      value={email}
                      type="email"
                      className="form-control"
                      required
                      placeholder="Your email address ..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small className="form-text text-muted">
                      We will email you with info on how to reset your password.
                    </small>
                  </div>
                  <button disabled={disable} className="btn btn-success">
                    {disable ? (
                      <div
                        className="spinner-border text-white"
                        role="status"
                      />
                    ) : (
                      "Reset"
                    )}
                  </button>
                  {sendEmailSuccess && (
                    <span className=" ml-5 alert alert-success">
                      OTP successfully sent to {email}
                    </span>
                  )}
                  {sendEmailError && (
                    <span className=" ml-5 alert alert-danger">
                      Failed to send OTP sent to {email}
                    </span>
                  )}
                </form>
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
                <BasicOTPComponent onChange={handleOTPChange} />
              </div>

              <div className="page-separator">
                <div className="page-separator__text">Change Password</div>
              </div>

              <form onSubmit={changePassword} className="col-sm-5 p-0">
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Type a new password ..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password2">
                    Confirm Password:
                  </label>
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="password2"
                    type="password"
                    className="form-control"
                    placeholder="Confirm your new password ..."
                    required
                  />
                </div>
                <button
                  disabled={disable}
                  type="submit"
                  className="btn btn-success"
                >
                  Save password
                </button>
                {!sendOtpError && (
                  <span className=" ml-5 alert alert-danger">Invalid OTP</span>
                )}

                {sendOtpError && (
                  <span className=" ml-5 alert alert-success">
                    Password changed successfully
                  </span>
                )}
                {passwordMatchError && (
                  <span className=" ml-5 alert alert-danger">
                    Passwords do not match
                  </span>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
