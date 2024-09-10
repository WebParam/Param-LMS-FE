'use client';
import { IUserResetPasswordModel } from '@/app/interfaces/user';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordForm from './ResetPasswordForm'; 
import VerifyOtpForm from './VerifyOtpForm'; 
import { adminForgotResetPassword, AdminSendResetOTP } from '@/app/lib/actions/users';

export default function ResetPassword() {

  const [email, setEmail] = useState<string>("");
  const [showPassInputs, setShowPassInputs] = useState<boolean>(true)
  const [disable, setDisable] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [otpLength, setOtpLength] = useState(0);
  const [otp, setOTP] = useState("");
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const setOtp = (e: string) => {
    setOTP(e);
    setOtpLength(e.length);

    if (e.length === 5) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const ChangePassword = async (event: any) => {
    setDisable(true)
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

    const payload = {
      email: email,
      password: password,
      otp: otp,
    };
    const ResetPassword = await adminForgotResetPassword(payload);
    if(ResetPassword.id){
      console.log("response", ResetPassword);

      toast.update(_id, {
        render: `Password changed successfully. You may now login.`,
        type: "success",
        isLoading: false,
      });
      setShowPassInputs(false)

    }else{
      toast.update(_id, {
        render: `invalid OTP..}`,
        type: "error",
        isLoading: false,
      });
    }

    event.preventDefault();
  }

  const SendOtp = async () => {
    setDisable(true)
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
      const sendOtp = await AdminSendResetOTP(payload)
      if(sendOtp.id){
        console.log("response", sendOtp);

        toast.update(_id, {
          render: `OTP sent succesfully to ${email}.`,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false)
          toast.dismiss(_id);
        }, 2000);
        setShowPassInputs(false)
        setShowMessage(true)
      }else{
        toast.update(_id, {
          render: `Error sending OTP..`,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false)
          toast.dismiss(_id);
        }, 2000);
      }
      
    }
  }

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
          <a href="" className="btn btn-outline-secondary flex-column">
            Need Help?
            <span className="btn__secondary-text">Contact us</span>
          </a>
        </div>
      </div>
      
      <div className="page-section">
        {showPassInputs ? (
          <ResetPasswordForm 
            email={email} 
            setEmail={setEmail} 
            disable={disable} 
            setDisable={setDisable} 
            emailError={emailError} 
            setEmailError={setEmailError} 
            SendOtp={() => SendOtp()} 
            showMessage={showMessage} 
            setShowMessage={setShowMessage} 
          />
        ) : (
          <VerifyOtpForm 
            setOtp={setOtp} 
            password={password} 
            setPassword={setPassword} 
            ConfirmPassword={ConfirmPassword} 
            setConfirmPassword={setConfirmPassword} 
            disable={disable} 
            ChangePassword={ChangePassword} 
          />
        )}
      </div>
    </>
  )
}
