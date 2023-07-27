'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../lib/restapi/endpoints';
import { IUserLoginModel, IUserRegisterModel } from '../../interfaces/user';
import Cookies from 'universal-cookie'; // Import the library

const cookies = new Cookies(); 
const axios = require("axios").default;


export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [fname, setFname] = useState<string>("");

  const onChangeEmail = (e:any) => {

    setEmail(e.target.value);
  
  }

  const onChangePassword = (e:any) => {
    setPassword(e.target.value);
  }


  const Register = (event:any) => {

    const date = new Date();

    
    let _id = toast.loading("Registering user..", {//loader
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
    id : 2,
    FirstName:"",
    LastName: "",
    Email : email,
    Password : password,
    Image : "",
    CreatedOn : date,
    CreatedBy : 2,
    ChangedBy : 3,
    ChangedOn: date,
    } as IUserRegisterModel; 

    axios
    .post(
      "https://f9bb-41-113-235-150.ngrok-free.app/api/Account/Register",
      payload
    )
    .then((response: any) => {
      console.log("response", response);

      toast.update(_id, {
        render: "Successfully registered",
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

  return (
<>
<ToastContainer />
      <div className=" pt-32pt pt-sm-64pt pb-32pt">
        <div className="container page__container">
          <form  className="col-md-5 p-0 mx-auto">

          <div className="form-group">
              <label className="form-label" htmlFor="email">
                First Name:
              </label>
              <input
                id="email"
                type="text"
                value = {fname}
                onChange = {(e) => setFname(e.target.value)}

                className="form-control"
                placeholder="Your First Name ..."
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Last Name:
              </label>
              <input
                id="email"
                type="text"
                value = {lname}
                onChange = {(e) => setLname(e.target.value)}

                className="form-control"
                placeholder="Your Last Name ..."
              />
            </div>

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
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Confirm Password:
              </label>
              <input
                id="password"
                type="password"
                value = {ConfirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm password ..."
              />
            
            </div>
            <div className="text-center">
              <button  className="btn btn-accent" onClick={Register}>signup</button>
            </div>
          </form>
        </div>
      </div>
      <div className="page-separator justify-content-center m-0">
        <div className="page-separator__text">or sign-up with</div>
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
