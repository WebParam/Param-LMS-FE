"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../lib/restapi/endpoints";
import { IUserRegisterModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation'

const cookies = new Cookies();
const axios = require("axios").default;

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [fname, setFname] = useState<string>("");

  const [NameError, setNameError] = useState<boolean>(false);
  const [PasswordError, setPasswordError] = useState<boolean>(false);
  const [LastNameError, setLastNameError] = useState<boolean>(false);
  const [ConfirmPassError, setConfirmPassError] = useState<boolean>(false);
  const [EmailError, setEmailError] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const date = new Date();

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const Register = async (event: any) => {
    setDisable(true);
    
    setNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setConfirmPassError(false);
    setPasswordError(false);
    cookies.remove("param-lms-user");

    if (lname === "" || fname === "" || password === "" || ConfirmPassword === "" || email === "") {
      if (fname === "") { setNameError(true) }
      if (lname === "") { setLastNameError(true) }
      if (password === "") { setPasswordError(true) }
      if (ConfirmPassword === "") { setConfirmPassError(true) }
      if (email === "") { setEmailError(true) }
    } else if (password === ConfirmPassword) {
      let _id = toast.loading("Registering user..", {
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
          setDisable(false);
          toast.dismiss(_id);
        }, 2000);
      } else if (!passwordRegex.test(password)) {
        toast.update(_id, {
          render: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters",
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
        }, 2000);
      } else {
        const payload = {
          firstName: fname,
          lastName: lname,
          email: email,
          password: password,
          image: "",
          headLine: "",
          summary: "",
          createdOn: date,
          createdBy: "",
          changedBy: "",
          changedOn: date,
          Otp: "",
          role: "Admin",
          LoginType: 0,
        } as IUserRegisterModel;

        try {
          
          const user = await Api.POST_RegisterAdmin(payload);
          if (user?.data) {
            toast.update(_id, {
              render: "Successfully registered",
              type: "success",
              isLoading: false,
            });

            cookies.set("param-lms-user", JSON.stringify(user.data), {
              path: "/",
            });

            router.push('/protected/home/courses');
          } else if (user?.error) {
            toast.update(_id, {
              render: user.message,
              type: "error",
              isLoading: false,
            });
          }
        } catch (error) {
          toast.update(_id, {
            render: "Cannot register user with the supplied information",
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
    } else {
      let _id = toast.loading("Registering user..", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setDisable(true);

      toast.update(_id, {
        render: "Passwords do not match",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false);
        toast.dismiss(_id);
      }, 2000);
    }
    event?.preventDefault();

    setTimeout(() => {
      setDisable(false);
    }, 2000);
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '20px' }}>
        <div className="card p-4" style={{ width: '500px', height: '680px' }}>
          <h2 className="text-center mb-4">Register your account</h2>
          <p className="text-center mb-4">Welcome! Please enter your details</p>
          <form>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="fname">
               {NameError ? <span style={{ color: "red", fontSize: "10px" }}>*required field</span> : null}
              </label>
              <input
                id="fname"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="form-control"
                placeholder="Your First Name ..."
                style={{ height: '50px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="lname">
                 {LastNameError ? <span style={{ color: "red", fontSize: "10px" }}>*required field</span> : null}
              </label>
              <input
                id="lname"
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="form-control"
                placeholder="Your Last Name ..."
                style={{ height: '50px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="email">
                 {EmailError ? <span style={{ color: "red", fontSize: "10px" }}>*required field</span> : null}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={onChangeEmail}
                className="form-control"
                placeholder="Your email address ..."
                style={{ height: '50px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="password">
                 {PasswordError ? <span style={{ color: "red", fontSize: "10px" }}>*required field</span> : null}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                className="form-control"
                placeholder="Your password ..."
                style={{ height: '50px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="confirmPassword">
                 {ConfirmPassError ? <span style={{ color: "red", fontSize: "10px" }}>*required field</span> : null}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm password ..."
                style={{ height: '50px', fontSize: '16px' }}
              />
            </div>

            <div className="text-center">
              <button className="btn btn-primary" disabled={disable} onClick={Register} style={{ backgroundColor: '#24345c', borderColor: '#24345c', height: '50px', fontSize: '16px', width: '80%' }}>
                Sign Up
              </button>
            </div>

            <div className="text-center mt-3">
              Already have an account? <span onClick={navigateToLogin} style={{ cursor: "pointer", color: "blue" }}>Sign-in</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
