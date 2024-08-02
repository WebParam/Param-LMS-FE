import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IUserResetPasswordModel } from '@/app/interfaces/user';
import { SendResetPasswordOtp } from '@/app/lib/actions/users';

interface SendOtpFormProps {
  email: string;
  setEmail: (email: string) => void;
  setStep: (step: 'sendOtp' | 'verifyOtp' | 'changePassword') => void;
}

export default function SendOtpForm({ email, setEmail, setStep }: SendOtpFormProps) {
  const [disable, setDisable] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const SendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setDisable(true);
    let _id = toast.loading("Sending OTP...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const payload = { email } as IUserResetPasswordModel;

    if (email !== "") {
      setEmailError(false);
      try {
        const response = await SendResetPasswordOtp(payload);

        toast.update(_id, {
          render: `OTP sent successfully to ${email}.`,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
          setStep('verifyOtp');
        }, 2000);
      } catch (error) {
        toast.update(_id, {
          render: `Error sending OTP.`,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
        }, 2000);
        console.log(error);
      }
    }
  };

  return (
    <div className="container page__container">
      <div className="page-separator">
        <div className="page-separator__text">Reset Password</div>
      </div>
      <div className="col-sm-6 p-0">
        <form onSubmit={SendOtp}>
          <div className="form-group">
            <label className="form-label">Email:</label>
            {emailError && <span style={{ color: "red", fontWeight: "600", marginLeft: "1em" }}>* required field</span>}
            <input
              value={email}
              type="email"
              className="form-control"
              placeholder="Your email address ..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <small className="form-text text-muted">
              We will email you with an OTP to reset your password.
            </small>
          </div>
          <button disabled={disable} type="submit" className="btn btn-primary">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}