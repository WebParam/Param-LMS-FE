'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../lib/restapi/endpoints';
import { IUserLoginModel, IUserRegisterModel } from '../../interfaces/user';
import Cookies from 'universal-cookie'; // Import the library
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaWindowMaximize } from 'react-icons/fa';


const cookies = new Cookies(); // Create an instance of Cookies



const axios = require("axios").default;


export default function Login() {
  cookies.remove("param-lms-user"); 
  const[disable , setDisable] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChangeEmail = (e:any) => {
    setEmail(e.target.value);

  }

  const onChangePassword = (e:any) => {
    setPassword(e.target.value);
  }
  const router = useRouter();

  const navigateToRegister= () => {
    // Replace "/your-target-page" with the path to the specific page you want to navigate to
    router.push('/auth/register');
  };

 

  

async function LoginUser (event:any){
 
  setDisable(true)
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
    debugger;
    console.log("User",user);
     
    try {
      
      console.log("response", user);
      console.log("data", user.data);
    if(user.data)
    {
      
      toast.update(_id, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
      });
      // Set cookies here after successful login
     // cookies.set('param-lms-user', user.data);
      cookies.set('param-lms-user', JSON.stringify(user.data), { path: '/' });
 
      console.log(user.data);
      //Optionally, you can redirect the user to another page
   
      console.log("Role",user.data.role);
      if(user.data.role=="Admin")
      {
        window.location.href = '/protected/admin/manage-courses'; 
      }
      else{
        window.location.href = '/protected/student/course/all-courses'; 
        console.log(user.data);

      }
    }
    else if(!user){
      toast.update(_id, {
        render: "Error has occured",
        type: "error",
        isLoading: false,
      }); 
    }
      

      }
     catch (error) {
      toast.update(_id, {
        render: `${error}`,
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false)
        toast.dismiss(_id);
      }, 3000);
      console.log(error);
    }

    // axios
    // .post(
    //   "https://86e8-154-0-14-142.ngrok-free.app/api/Users/Login",
    //   payload
    // )
    // .then((response: any) => {
    //   console.log("response", response);

    
    //   toast.update(_id, {
    //     render: "Successfully logged in",
    //     type: "success",
    //     isLoading: false,
    //   });

    //   // Set cookies here after successful login
    //   cookies.set('param-lms-user', response.data);

    //   // Optionally, you can redirect the user to another page
    //   window.location.href = '/protected/admin/manage-courses'; 

    // })
    // .catch((error: any) => {

 
    //   toast.update(_id, {
    //     render: "error logging in.",
    //     type: "error",
    //     isLoading: false,
    //   });
    //   setTimeout(() => {
    //     setDisable(false)
    //     toast.dismiss(_id);
    //   }, 2000);
    //   console.log(error);
    // });

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
                <Link href="/auth/login/reset-password" className="small">
                  Forgot your password?
                </Link>
              </p>
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
      <div style={{
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}} className="container page__container">
  <a href="fixed-index.html" className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>
    Facebook
  </a>
  <a href="fixed-index.html" className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>
    Twitter
  </a>
  <a href="fixed-index.html" className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>
    Google+
  </a>
</div>

        <div className="page-separator__text mt-3">Do not have an account? <span style={{cursor:"pointer"}} onClick = {navigateToRegister}>sign-up</span></div>
      </div>
      </>
  
 
  )
}
