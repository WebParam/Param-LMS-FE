'use client'
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import './verify.scss';
import { Api } from "@/app/lib/restapi/endpoints";



export default function VerifyAccount() {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const[otp, setOtp] = useState<Number>(0);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    
    const cookies = new Cookies();
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        setErrorMessage(false);
      
        if (/^[0-9]$/.test(value)) {
          const newOtpValues = [...otpValues];
          newOtpValues[index] = value;
          setOtpValues(newOtpValues);
      
          if (index <= 5) {
            inputRefs[index + 1]?.current && inputRefs[index + 1].current?.focus();
            const otp = Number(newOtpValues.join(''));
            setOtp(otp);
          }
      
          // Remove the "incorrect" class when a valid input is entered
          e.target.classList.remove('incorrect');
         
        
        } else {
          // Clear the input if the value is not a number
          const newOtpValues = [...otpValues];
          newOtpValues[index] = '';
          setOtpValues(newOtpValues);
      
          // Optionally, you can move focus back to the previous input
          if (index > 0 && inputRefs[index - 1].current) {
            inputRefs[index - 1].current?.focus();
          }
      
          e.target.classList.add('incorrect');
        }
      };


      async function handleVerify(e:any) {
        e.preventDefault();
        setIsSubmitted(true);
        const email = cookies.get('user-verify-email');
        const payload = {
            email,
            otp: String(otp)
        }

        const res = await Api.POST_VerifyEmail(payload);
        debugger;
        if (res?.data.message != `Otp don't match`) {
            console.log(res);
            setIsSubmitted(false);
            cookies.set("param-lms-user", JSON.stringify(res.data), {
              path: "/",
            });
            if(res.data.role == "Freemium"){
              router.push('/protected/home/projects');
            }else{
              router.push('/protected/home/courses');
   
            }
        } else {
            setIsSubmitted(false);
            setErrorMessage(true)
        }
      }
  
    return (
        <div className="verify">
          <div className="card">
            <h1>Confirm  your email address</h1>
            <p>We’ve sent an email to the address you provided.<br/>
            Check your inbox and enter the 5 digit code.</p>
            <form onSubmit={handleVerify}>
                <div className="otpContainer">
                    {inputRefs.map((ref, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`input${index + 1}`}
                      maxLength={1}
                      ref={ref}
                      value={otpValues[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  ))}
                </div>
                {errorMessage && <span className={`errorMessage`} style={{marginBottom:'3px'}}>Incorrect OTP, please check and try again</span>}
                <button type="submit" disabled={isSubmitted}>
                    {
                        isSubmitted ? 
                        <div className="spinner-border" role="status"/>
                        :
                        'Confirm'
                    }
                </button>
                <div className="account">
                    <p>Already have an account?
                    <Link href='/login'> Log in</Link></p>
                </div>
            </form>
          </div>
        </div>
    )
}