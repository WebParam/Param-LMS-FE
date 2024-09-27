"use client";
import { useState } from "react";
import { Api } from "../../lib/restapi/endpoints";
import { IUserLoginModel } from "../../interfaces/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/lib/actions/users";

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

    try {
      const user = await login(email, password);

      if (user?.data?.id) {
        cookies.set("param-lms-user", JSON.stringify(user.data), { path: "/" });
        localStorage.setItem("id", user?.data?.id);

        if (user?.data.role == "Freemium") {
          router.push("protected/home/projects");
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
            <div className="text-center mb-3 text-danger">{errorMessage}</div>
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
          <p className="text-center text-dark">
            Don't have an account?{" "}
            <Link
              href={
                process.env.NEXT_PUBLIC_isFreeMium
                  ? "/auth/freemium-register"
                  : "/auth/404"
              }
              className="text-primary"
            >
              <u>Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
