'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../lib/restapi/endpoints';
import { IUserLoginModel } from '../../interfaces/user';
import Cookies from 'universal-cookie'; // Import the library

const cookies = new Cookies(); // Create an instance of Cookies



const axios = require("axios").default;


export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (e:any) => {

    setEmail(e.target.value);
  
  }

  const onChangePassword = (e:any) => {
    setPassword(e.target.value);
  }


  

async function LoginUser (event:any){
 

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let _id = toast.loading("Logging in..", {//loader
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
  
 }else if(!passwordRegex.test(password)){
  toast.update(_id, {
    render:
      "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters",
    type: "error",
    isLoading: false,
  });
 }else{

  const payload = {
    Email : email,
    Password : password,
    } as IUserLoginModel; 

    axios
    .post(
      "https://f281-154-117-172-210.ngrok-free.app/api/Account/Login",
      payload
    )
    .then((response: any) => {
      console.log("response", response);

      toast.update(_id, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
      });

      // Set cookies here after successful login
      cookies.set('param-user', response.data, { path: '/' });

      // Optionally, you can redirect the user to another page
      // window.location.href = '/dashboard'; // Replace 'dashboard' with the desired route

    })
    .catch((error: any) => {
      toast.update(_id, {
        render: "Cannot register user with the supplied information",
        type: "error",
        isLoading: false,
      });
      console.log(error);
    });

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
                placeholder="Your first and last name ..."
              />
              <p className="text-right">
                <a href="fixed-reset-password.html" className="small">
                  Forgot your password?
                </a>
              </p>
            </div>
            <div className="text-center">
              <button onClick = {LoginUser} className="btn btn-accent">Login</button>
            </div>
          </form>
        </div>
      </div>
      <div className="page-separator justify-content-center m-0">
        <div className="page-separator__text">or sign-in with</div>
        <div className="page-separator__bg-top " />
      </div>
      <div className="bg-body pt-32pt pb-32pt pb-md-64pt text-center">
        <div className="container page__container">
          <a href="fixed-index.html" className="btn btn-secondary btn-block-xs">
            Facebook
          </a>
          <a href="fixed-index.html" className="btn btn-secondary btn-block-xs">
            Twitter
          </a>
          <a href="fixed-index.html" className="btn btn-secondary btn-block-xs">
            Google+
          </a>
        </div>
      </div>
      </>
  
 
  )
}
