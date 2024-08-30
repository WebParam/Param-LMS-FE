"use client";
import { useState } from "react";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import "./login.css";

const cookies = new Cookies();

export default function Login() {
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onChangeEmail = (e: any) => setEmail(e.target.value);
  const onChangePassword = (e: any) => setPassword(e.target.value);

  async function LoginUser(event: any) {
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

        if (process.env.NEXT_PUBLIC_USER_ACCESS === "FREEMIUM") {
          router.push("/freemium/home");// currently waiting for lihle side
        } else {
          router.push("/protected/home/courses");
        }
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
    <div className="login-container">
      <div
        className="login-left"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_LOGIN_IMAGE_URL})`,
          color: "white",
          padding: "40px",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="login-right">
      <h1>Sign in</h1>
        <p>Welcome back! Please enter your details</p>
        {errorMessage && <div className={errorMessage.includes('Invalid') ? 'alert alert-danger' : 'alert alert-success'} style={{ marginTop: '10px' }}>{errorMessage}</div>}

        <form onSubmit={LoginUser}>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input required={true} type="email" id="email" placeholder="Enter your email" value={email} onChange={onChangeEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChangePassword}
              required={true}
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