"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const cookies = new Cookies();
const axios = require("axios").default;

export default function Login() {
  const [disable, setDisable] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const navigateToRegister = () => {
    router.push("/auth/register");
  };

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

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "20px" }}
      >
        <div className="card p-4" style={{ width: "450px", height: "480px" }}>
          <h2 className="text-center mb-4">Log in to your account</h2>
          <p className="text-center mb-4">
            Welcome back! Please enter your details
          </p>
          <form>
            <div className="form-group mb-3">
              <input
                id="email"
                type="text"
                value={email}
                onChange={onChangeEmail}
                className="form-control"
                placeholder="Enter Email *"
                style={{ height: "50px", fontSize: "16px" }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                className="form-control"
                placeholder="Enter Password *"
                style={{ height: "50px", fontSize: "16px" }}
              />
            </div>
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ marginTop: "20px" }}
            ></div>
            <div
              className="d-grid mb-3"
              style={{ marginTop: "40px", textAlign: "center" }}
            >
              <button
                disabled={disable}
                onClick={LoginUser}
                className="btn btn-primary"
                style={{
                  backgroundColor: "#24345c",
                  borderColor: "#24345c",
                  height: "50px",
                  fontSize: "16px",
                  width: "80%",
                }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
