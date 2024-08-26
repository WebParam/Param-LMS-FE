"use client";
import { useState } from "react";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import thooto from "@/app/images/thooto.png";

const cookies = new Cookies();

export default function Login() {
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onChangeEmail = (e:any) => setEmail(e.target.value);
  const onChangePassword = (e:any) => setPassword(e.target.value);

  async function LoginUser(event:any) {
    event.preventDefault();
    setDisable(true);
    setErrorMessage("");

    cookies.remove("param-lms-user");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
      setDisable(false);
      return;
    }

    const payload = { Email: email, Password: password } as IUserLoginModel;

    try {
      const user = await Api.POST_Login(payload);

      if (user?.data?.id) {
        cookies.set("param-lms-user", JSON.stringify(user.data), { path: "/" });
        router.push("/protected/home/courses");
      } else {
        setErrorMessage("Invalid login credentials");
        setDisable(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setDisable(false);
    }
  }

  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <div className="w-50 h-100">
        <Image
          className="w-100 h-100"
          src={thooto}
          width={500}
          height={300}
          alt="banner"
          layout="responsive"
        />
      </div>

      <div
        className="p-4 w-50 h-100"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          padding: "40px",
          maxWidth: "500px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <h2 className="text-center mb-4">Log in to your account</h2>
        <p className="text-center mb-4">Welcome back! Please enter your details</p>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={LoginUser}>
          <div className="form-group mb-3">
            <input
              id="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              className="form-control"
              placeholder="Enter Email *"
              required
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
              required
              style={{ height: "50px", fontSize: "16px" }}
            />
          </div>
          <div
            className="d-grid mb-3"
            style={{ marginTop: "40px", textAlign: "center" }}
          >
            <button
              type="submit"
              disabled={disable}
              className="btn btn-primary"
              style={{
                backgroundColor: "#24345c",
                borderColor: "#24345c",
                height: "50px",
                fontSize: "16px",
                width: "80%",
              }}
            >
              {disable ? (
                <div className="spinner-border text-white" role="status" />
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
