"use client"
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendOtpForm from './(components)/SendOtpForm';
import VerifyOtpForm from './(components)/VerifyOtpForm';
import ChangePasswordForm from './(components)/ChangePasswordForm';

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<'sendOtp' | 'verifyOtp' | 'changePassword'>('sendOtp');
  const [otp, setOTP] = useState("");

  return (
    <>
      <ToastContainer />
      <div className="page-section pb-0">
        <div className="container page__container d-flex flex-column flex-sm-row align-items-sm-center">
          <div className="flex">
            <h1 className="h2 mb-0">Reset Password</h1>
            <p className="text-breadcrumb">Account Management</p>
          </div>
          <p className="d-sm-none" />
          {step === 'sendOtp' ? (
            <a href="/" className="btn btn-primary">
              Login
            </a>
          ) : step === 'verifyOtp' ? (
            <button onClick={() => setStep('sendOtp')} className="btn btn-primary">
              Resend email
            </button>
          ) : (
            <a href="" className="btn btn-primary">
              Need Help?
              <span className="btn__secondary-text">Contact us</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="page-section">
        {step === 'sendOtp' && (
          <SendOtpForm 
            email={email} 
            setEmail={setEmail} 
            setStep={setStep} 
          />
        )}
        {step === 'verifyOtp' && (
          <VerifyOtpForm 
            email={email}
            otp={otp}
            setOTP={setOTP}
            setStep={setStep}
          />
        )}
        {step === 'changePassword' && (
          <ChangePasswordForm 
            email={email} 
            otp={otp} 
          />
        )}
      </div>
    </>
  );
}