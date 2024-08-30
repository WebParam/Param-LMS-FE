"use client";
import "./freemium.scss";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const cookies = new Cookies();
const axios = require("axios").default;

export default function () {
  const [disable, setDisable] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loginType, setLoginType] = useState<number>(0);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const router = useRouter();


  async function LoginUser(event: any) {
    cookies.remove("param-lms-user");
    setDisable(true);
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
        setDisable(false);
        toast.dismiss(_id);
      }, 2000);
    } else {
      const payload = {
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Image: image,
        LoginType: loginType,
      } as IUserLoginModel;

      const user = await Api.POST_Login(payload);
      console.log("data", user);
      try {
        if (user?.data?.id) {
          toast.update(_id, {
            render: "Successfully logged in",
            type: "success",
            isLoading: false,
          });

          cookies.set("param-lms-user", JSON.stringify(user.data), {
            path: "/",
          });

          console.log(user.data);
          console.log("Role", user?.data?.role);
          router.push("/protected/home/courses");
        } else {
          toast.update(_id, {
            render: "Invalid login credentials",
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            setDisable(false);
            toast.dismiss(_id);
          }, 3000);
        }
      } catch (error) {
        toast.update(_id, {
          render: "Invalid login credentials",
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

  function onChangeImage(event: ChangeEvent<HTMLInputElement>): void {
    setImage(event.target.value);
  }

  function onChangeUsername(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function onChangeLastName(event: ChangeEvent<HTMLInputElement>): void {
    setLastName(event.target.value);
  }
  

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "20px" }}
      >
        <div className="card p-4" style={{ width: "600px", height: "auto" }}>
          <h2 className="text-center">Register Your Organization</h2>
          <p className="text-center text-dark">
            Please enter your details to register your organization
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
                <label htmlFor="image">Upload Logo (Optional)</label>
                <input
                  id="image"
                  type="file"
                  onChange={onChangeImage}
                  className="form-control"
                  accept="image/*"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-grid mb-3" style={{ marginTop: "20px" }}>
                <button
                  disabled={disable}
                  onClick={LoginUser}
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
