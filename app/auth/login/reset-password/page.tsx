import Image from 'next/image'
import styles from './page.module.css'

export default function ResetPassword() {
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
        <div className="container page__container">
          <div className="page-separator">
            <div className="page-separator__text">Reset Password</div>
          </div>
          <div className="col-sm-6 p-0">
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
            <form action="fixed-change-password.html">
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your email address ..."
                />
                <small className="form-text text-muted">
                  We will email you with info on how to reset your password.
                </small>
              </div>
              <button className="btn btn-accent">Reset</button>
            </form>
          </div>
        </div>
      </div>
      <div className="page-section">
      <div className="container page__container">
        <div className="page-separator">
          <div className="page-separator__text">Change Password</div>
        </div>
        <form action="login.html" className="col-sm-5 p-0">
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
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
              id="password2"
              type="password"
              className="form-control"
              placeholder="Confirm your new password ..."
            />
          </div>
          <button type="submit" className="btn btn-accent">
            Save password
          </button>
        </form>
      </div>
    </div>
</>
  
  )
}
