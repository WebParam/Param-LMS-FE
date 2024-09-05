"use client";
import "./freemium.scss";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel, IUserRegisterFreeMiumModel, IUserRegisterModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const cookies = new Cookies();
const axios = require("axios").default;

export default function RegisterFreemium() {
  const [disable, setDisable] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const router = useRouter();


  async function registerAdd(event: any) {
    setDisable(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let _id = toast.loading("Registering...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (password !== confirmPassword) {
      toast.update(_id, {
        render: "Passwords do not match",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false);
        toast.dismiss(_id);
      }, 2000);
      return
    }

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
    } else {
      const payload = {
        firstName: firstName,  
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        role: "Admin",
        loginType: 0
      } as IUserRegisterFreeMiumModel;

      const user = await Api.POST_RegisterFreeMium(payload);
      console.log("data", user);
      try {
        if (user?.data?.id) {
          cookies.set("user-verify-email", JSON.stringify(user.data.email), {
            path: "/",
          });

          router.push("/auth/verify-account");
        } 
      } catch (error) {
        toast.update(_id, {
          render: "There was an error registering your account",
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false);
          toast.dismiss(_id);
        }, 3000);
        console.log(error);
      }

      event?.preventDefault();
    }
  }

  function onChangeFirstName(event: ChangeEvent<HTMLInputElement>): void {
    setFirstName(event.target.value);
  }


  function onChangeUsername(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function onChangeLastName(event: ChangeEvent<HTMLInputElement>): void {
    setLastName(event.target.value);
  }

  function onChangeConfirmPassword(event: ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(event.target.value);
  }

  

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "20px" }}
      >
        <div className="card p-4" style={{ width: "600px", height: "auto" }}>
          <h2 className="text-center">Register Your FreeMium Account</h2>
          <p className="text-center text-dark">
            Please enter your details below
          </p>
          <form>
          <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">Enter First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={onChangeFirstName}
                  className="form-control"
                  placeholder="John"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Enter Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={onChangeLastName}
                  className="form-control"
                  placeholder="Doe"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Enter Email *</label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                  className="form-control"
                  placeholder="example@gmail.com"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="username">Enter Username *</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={onChangeUsername}
                  className="form-control"
                  placeholder="johndoe"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
            </div>
            
            <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="password">Enter Password *</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  className="form-control"
                  placeholder="********"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password">Confirm Password *</label>
                <input
                  id="password"
                  type="password"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  className="form-control"
                  placeholder="********"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
             
            </div>
            <div className="row">
              <div className="col-12 d-grid mb-3" style={{ marginTop: "20px" }}>
                <button
                  disabled={disable}
                  onClick={registerAdd}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#24345c",
                    borderColor: "#24345c",
                    height: "50px",
                    fontSize: "16px",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
