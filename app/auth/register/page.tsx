"use client";
import { useState } from "react";
import { Api } from "../../lib/restapi/endpoints";
import { IUserRegisterModel } from "../../interfaces/user";
import thooto from "@/app/images/thooto.png";
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation'
import Image from "next/image";

const cookies = new Cookies();
const axios = require("axios").default;

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [fname, setFname] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const date = new Date();

  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/');
  };

  const Register = async (event: any) => {
    event.preventDefault();
    setDisable(true);
    setError("");
    cookies.remove("param-lms-user");

    if (!fname || !lname || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setDisable(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      setDisable(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.");
      setDisable(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setDisable(false);
      return;
    }

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
      role: "Student",
      LoginType: 0,
    } as IUserRegisterModel;

    try {
      let user;
      if (payload.role === "Student") {
        user = await Api.POST_RegisterAdmin(payload);
      } else {
        user = await Api.POST_Register(payload);
      }

      if (user?.data) {
        cookies.set("param-lms-user", JSON.stringify(user.data), { path: "/" });
        router.push('/protected/home/courses');
      } else if (!user) {
        setError("Failed to register. Please try again later.");
        setDisable(false);
      }
    } catch (error) {
      setError("Cannot register user with the supplied information.");
      setDisable(false);
    }
  };

  return (
    <div style={{ backgroundColor: "white" }} className="d-flex">
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
        style={{
          backgroundColor: "white",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          padding: "40px",
          maxWidth: "500px",
          maxHeight: "90vh",
          margin: "auto",
          marginTop: "30px",
        }}
        className="p-4 w-50"
      >
        <h2 className="text-center mb-3">Register your account</h2>
        <p className="text-center mb-3">Welcome! Please enter your details</p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={Register}>
          <div className="form-group mb-2">
            <input
              id="fname"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="form-control"
              placeholder="Your First Name ..."
              style={{ height: "50px", fontSize: "16px" }}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              id="lname"
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="form-control"
              placeholder="Your Last Name ..."
              style={{ height: "50px", fontSize: "16px" }}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Your email address ..."
              style={{ height: "50px", fontSize: "16px" }}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Your password ..."
              style={{ height: "50px", fontSize: "16px" }}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirm password ..."
              style={{ height: "50px", fontSize: "16px" }}
              required
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disable}
              type="submit"
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
                "Sign Up"
              )}
            </button>
          </div>

          <div className="text-center mt-2">
            Already have an account?{" "}
            <span className="text-success" onClick={navigateToLogin} style={{ cursor: "pointer"}}>
              Sign-in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
