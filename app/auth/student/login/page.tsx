'use client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../../lib/restapi/endpoints';
import { IUserLoginModel, IUserRegisterModel } from '../../../interfaces/user';
import Cookies from 'universal-cookie'; // Import the library
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { IActivity, IActivityType } from '@/app/interfaces/analytics';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies();
export default function Login() {
  const[disable , setDisable] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [targetId, setTargetId] = useState<string>("")
  const dispatch = useDispatch();

  const onChangeEmail = (e:any) => {
    setEmail(e.target.value);

  }

  const onChangePassword = (e:any) => {
    setPassword(e.target.value);
  }
  const router = useRouter();
  const navigateToRegister= () => { 
    router.push('/auth/student/register');
  }
  const today = new Date();
  const year = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  let hours: number | string = today.getHours();
  let minutes: number | string = today.getMinutes();
  let seconds: number | string = today.getSeconds();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  const todayDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
async function LoginUser (event:any){
  cookies.remove('param-lms-user')
  setDisable(true)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let _id = toast.loading("Logging in..", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

      if (!emailRegex.test(email)) {
   toast.update(_id, {
     render: "Invalid email address",
     type: "error",
     isLoading: false,
   });
   setTimeout(() => {
    setDisable(false)
    toast.dismiss(_id);
  }, 2000);
  
 
 }else{

  const payload = {
    Email : email,
    Password : password,
    } as IUserLoginModel; 
    const user = await  Api.POST_Login(payload);
    
    try {
      
    if(user?.data?.id){
      toast.update(_id, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
      });

     cookies.set('param-lms-user', JSON.stringify(user.data), { path: '/' });

     if (typeof localStorage !== 'undefined') {
      const targetId = uuidv4();
      localStorage.setItem("targetId", targetId);
      setTargetId(targetId);

      const date = new Date();
      const loginData = {
        sessionStart : new Date().toISOString(),
        sessionEnd : new Date(date.getTime() + 2 * 60000),
        lastActitive: new Date().toISOString()
      }

  
      localStorage.setItem("user-session",     JSON.stringify(loginData))
  } else {

      console.log('localStorage is not available in this environment');
  }
    
   
     router.push('/protected/student/course/all-courses')
   
    }else{
      toast.update(_id, {
        render: "Invalid login credentials",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false)
        toast.dismiss(_id);
      }, 3000);
    }
    }
     catch (error) {
      toast.update(_id, {
        render: "Invalid login credentials",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false)
        toast.dismiss(_id);
      }, 3000);
      console.log(error);
    }
  event?.preventDefault();
  }
 
}


  return (
<>
<ToastContainer />
      <div className=" pt-32pt pt-sm-64pt pb-32pt">
        <div className="container page__container">
          <form  className="col-md-5 p-0 mx-auto">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="text"
                value = {email}
                onChange = {onChangeEmail}

                className="form-control"
                placeholder="Your email address ..."
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                value = {password}
                onChange = {onChangePassword}
                className="form-control"
                placeholder="Your password ..."
              />
              
            </div>
            <div className="text-center">
              <button disabled ={disable} onClick = {LoginUser} className="btn btn-accent">Login</button>
            </div>

          </form>
        </div>
      </div>
      <div className="page-separator justify-content-center m-0">
        <div className="page-separator__text">or sign-in with</div>
        <div className="page-separator__bg-top " />
      </div>
      <div className="bg-body pt-32pt pb-32pt pb-md-64pt text-center">
      

        <div className="page-separator__text mt-3">Do not have an account? <span style={{cursor:"pointer", color:"blue"}} onClick = {navigateToRegister}>sign-up</span></div>
      </div>
      </>
  
 
  )
}