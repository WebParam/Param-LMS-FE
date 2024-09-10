import React from 'react';

interface ResetPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  disable: boolean;
  setDisable: (disable: boolean) => void;
  emailError: boolean;
  setEmailError: (error: boolean) => void;
  SendOtp: () => void;
  showMessage: boolean;
  setShowMessage: (show: boolean) => void;
}

const ResetPasswordForm = ({ email, setEmail, disable, setDisable, emailError, setEmailError, SendOtp, showMessage, setShowMessage }: ResetPasswordFormProps) => {
  return (
    <div className="page-section">
      <div className="container page__container">
        <div className="page-separator">
          <div className="page-separator__text">Reset Password</div>
        </div>
        <div className="col-sm-6 p-0">
          {showMessage && 
            <div className="alert alert-soft-warning">
              <div className="d-flex flex-wrap">
                <div className="mr-8pt">
                  <i className="material-icons">check_circle</i>
                </div>
                <div className="flex" style={{ minWidth: 180 }}>
                  <small className="text-100">
                    An email with password reset instructions has been sent to
                    your email address, if it exists on our system.
                  </small>
                </div>
              </div>
            </div>
          }
          <form>
            <div className="form-group">
              <label className="form-label">Email:</label>
              {emailError ? <span style={{ color: "red", fontWeight: "600px", marginLeft: "1em" }}>* required field</span> : null}
              <input
                value={email}
                type="text"
                className="form-control"
                placeholder="Your email address ..."
                onChange={(e) => {
                  setDisable(false);
                  setEmail(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                We will email you with info on how to reset your password.
              </small>
            </div>
            <button disabled={disable} onClick={SendOtp} className="btn btn-success">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;