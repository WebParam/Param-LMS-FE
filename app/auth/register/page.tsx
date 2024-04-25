'use client';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from '@/app/lib/restapi/endpoints';
import { IUserRegisterModel } from '@/app/interfaces/user';
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { IActivityType } from "@/app/interfaces/analytics";

const cookies = new Cookies();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [NameError, setNameError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [ConfirmPassError, setConfirmPassError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [disable, setDisable] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const date = new Date();
  const router = useRouter();

  const onChangeEmail = (e: any) => setEmail(e.target.value);
  const onChangePassword = (e: any) => setPassword(e.target.value);

  const navigateToLogin = () => router.push('/auth/login');

  const Register = async (event: any) => {
    setDisable(true);
    setNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setConfirmPassError(false);
    setPasswordError(false);
    cookies.remove("param-lms-user");

    if (!lname || !fname || !password || !ConfirmPassword || !email) {
      setNameError(!fname);
      setLastNameError(!lname);
      setPasswordError(!password);
      setConfirmPassError(!ConfirmPassword);
      setEmailError(!email);
    } else if (password !== ConfirmPassword) {
      toast.error("Passwords do not match");
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
    } else if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters");
    } else {
      const _id = toast.loading("Registering user..", { autoClose: 1000 });
      const payload = {
        firstName: fname,
        lastName: lname,
        email,
        password,
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

      const user = await Api.POST_Register(payload);

      try {
        if (user.data) {

          const targetId = uuidv4();
          if (typeof localStorage !== 'undefined') {

            localStorage.setItem("targetId", targetId);
            const date = new Date();
            const loginData = {
              sessionStart: new Date().toISOString(),
              sessionEnd: new Date(date.getTime() + 2 * 60000),
              lastActitive: new Date().toISOString()
            }

            localStorage.setItem("user-session", JSON.stringify(loginData))
          } else {

            console.log('localStorage is not available in this environment');
          }

          const activity = {
            UserId: user?.data?.id,
            from: new Date().toISOString(),
            to: new Date().toISOString(),
            ActivityType: IActivityType.Login,
            Duration: 0,
            TargetId: targetId
          }

          const postActivity = await Api.POST_Activity(activity);
          if (postActivity.data?.id) {
            toast.success("Successfully registered");
            router.push('/protected/student/course/all-courses')
          }

        }
      } catch (error) {
        toast.error("Cannot register user with the supplied information");
        console.log(error);
      }

      setDisable(false);
    }

    event?.preventDefault();
  }

  return (
    <>
      <ToastContainer />
      <div className="pt-32pt pt-sm-64pt pb-32pt">
        <div className="container page__container">
          <form className="col-md-5 p-0 mx-auto">
            <div className="form-group">
              <label className="form-label" htmlFor="fname">First Name: {NameError && <span style={{ color: "red", fontSize: "10px" }}>*required field</span>}</label>
              <input id="fname" type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="form-control" placeholder="Your First Name ..." />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lname">Last Name: {LastNameError && <span style={{ color: "red", fontSize: "10px" }}>*required field</span>}</label>
              <input id="lname" type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="form-control" placeholder="Your Last Name ..." />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email: {EmailError && <span style={{ color: "red", fontSize: "10px" }}>*required field</span>}</label>
              <input id="email" type="text" value={email} onChange={onChangeEmail} className="form-control" placeholder="Your email address ..." />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password: {PasswordError && <span style={{ color: "red", fontSize: "10px" }}>*required field</span>}</label>
              <input id="password" type="password" value={password} onChange={onChangePassword} className="form-control" placeholder="Your password ..." />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password: {ConfirmPassError && <span style={{ color: "red", fontSize: "10px" }}>*required field</span>}</label>
              <input id="confirmPassword" type="password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm password ..." />
            </div>
            <div className="text-center">
              <button className="btn btn-accent" disabled={disable} onClick={Register}>signup</button>
            </div>
          </form>
        </div>
      </div>
      <div className="page-separator justify-content-center m-0">
        <div className="page-separator__text">or sign-up with</div>
        <div className="page-separator__bg-top " />
      </div>
      <div className="bg-body pt-32pt pb-32pt pb-md-64pt text-center">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} className="container page__container">
          <a className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>Facebook</a>
          <a className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>Twitter</a>
          <a className="btn btn-secondary btn-block-xs" style={{ marginRight: '5px' }}>Google+</a>
        </div>
        <div onClick={navigateToLogin} className="page-separator__text mt-3">Already have an account? <span style={{ cursor: "pointer", color: "blue" }}>sign-in</span></div>
      </div>
    </>
  );
}
