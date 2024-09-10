import React from 'react';
import { BasicOTPComponent } from './basic-otp';
interface VerifyOtpFormProps {
  setOtp: (otp: string) => void;
  password: string;
  setPassword: (password: string) => void;
  ConfirmPassword: string;
  setConfirmPassword: (password: string) => void;
  disable: boolean;
  ChangePassword: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const VerifyOtpForm = ({ setOtp, password, setPassword, ConfirmPassword, setConfirmPassword, disable, ChangePassword }: VerifyOtpFormProps) => {
  return (
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
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="form-control"
            placeholder="Type a new password ..."
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password2">Confirm Password:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="password2"
            type="password"
            className="form-control"
            placeholder="Confirm your new password ..."
          />
        </div>
        <button disabled={disable} onClick={ChangePassword} type="submit" className="btn btn-accent">
          Save password
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;