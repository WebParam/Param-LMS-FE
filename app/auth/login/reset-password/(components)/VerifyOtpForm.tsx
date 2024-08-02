import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BasicOTPComponent } from './basic-otp';
import { VerifyOTP } from '@/app/lib/actions/users';

interface VerifyOtpFormProps {
  email: string;
  otp: string;
  setOTP: (otp: string) => void;
  setStep: (step: 'sendOtp' | 'verifyOtp' | 'changePassword') => void;
}

export default function VerifyOtpForm({ email, otp, setOTP, setStep }: VerifyOtpFormProps) {
  const [disable, setDisable] = useState<boolean>(true);

  const setOtp = (e: string) => {
    setOTP(e);
    setDisable(e.length !== 5);
  };

  const verifyOTP = async (event: React.FormEvent) => {
    event.preventDefault();
    setDisable(true);
    const _id = toast.loading("Verifying OTP...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const payload = { email, otp };

    try {
      const response = await VerifyOTP(payload);

      toast.update(_id, {
        render: `OTP verified successfully.`,
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        setStep('changePassword');
        toast.dismiss(_id);
      }, 2000);
    } catch (error) {
      toast.update(_id, {
        render: `Invalid OTP.`,
        type: "error",
        isLoading: false,
      });
      setDisable(false);
      console.log(error);
    }
  };

  return (
    <div className="container page__container">
      <div className="page-separator">
        <div className="page-separator__text">Verify OTP</div>
      </div>
      <div className="col-sm-6 p-0">
        <div className="alert alert-info" role="alert">
          An OTP has been sent to your email address: {email}
        </div>
        <form onSubmit={verifyOTP}>
          <div className="form-group">
            <label className="form-label">Enter OTP:</label>
            <BasicOTPComponent onChange={setOtp} />
          </div>
          <button disabled={disable} type="submit" className="btn btn-primary">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}