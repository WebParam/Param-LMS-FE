"use client"
import { NextPage } from "next";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { IActivity, IActivityType } from "../interfaces/analytics";
import { Api } from "../lib/restapi/endpoints";
import { useEffect, useState } from "react";

const HeadNav: NextPage<{ setIsOpen: any; isOpen: boolean }> = ({
  setIsOpen,
  isOpen,
}) => {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const router = useRouter();
  const [targetId, setTargetId] = useState<string>("")
  const [loginTime, setLoginTime] = useState<string>("")


  
  const today = new Date();
  const year = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  let hours: number | string = today.getHours();
  let minutes: number | string = today.getMinutes();
  let seconds: number | string = today.getSeconds();
  
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  
  const logoutTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const time1 :any = new Date(loginTime);
const time2 : any = new Date(logoutTime);
const differenceInMilliseconds = Math.abs(time2 - time1);
const differenceInSeconds = differenceInMilliseconds / 1000;

  const logout = async () => {

  
    const activity = {
        UserId: loggedInUser?.id,
        ActivityType: IActivityType.Logout,
        Duration: differenceInSeconds,
        TargetId: targetId,
    };

    try {
        const response = await Api.POST_Activity(activity);
        if (response.data?.id) {
          console.log("User LoggedIn",loggedInUser)
            if (loggedInUser?.role === "Admin") {
                router.push("/auth/admin/login");
            } else {
                router.push("/");
            }
            cookies.remove("param-lms-user", {
                path: "/",
            });
        }
    } catch (error) {
        console.error("Error logging out:", error);
        if (loggedInUser?.role === "Admin") {
            router.push("/auth/admin/login");
        } else {
            router.push("/");
        }
        cookies.remove("param-lms-user", {
            path: "/",
        });
    }
};

useEffect(() => {

  if (typeof localStorage !== 'undefined') {
    const logInTime = localStorage.getItem("loginTime")!
    setLoginTime(logInTime);
    const targetId = localStorage.getItem("targetId")!;
    setTargetId(targetId);
} else {

    console.log('localStorage is not available in this environment');
}

}, [])




  return (
    <>
      {/* <!-- Header --> */}
      <div id="header" className="mdk-header js-mdk-header mb-0" data-fixed>
        <div className="mdk-header__content">
          <div
            className="navbar navbar-expand px-0 nav-bar-bg navbar-dark"
            id="default-navbar"
            data-primary
          >
            {/* <!-- Navbar toggler --> */}
            <button
              className="navbar-toggler d-block rounded-0"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              type="button"
              data-toggle="sidebar"
            >
              <span className="material-icons">menu</span>
            </button>

            {/* <!-- Navbar Brand --> */}
            <a className="navbar-brand mr-16pt">
              <span className=" d-lg-block">Khumla</span>
            </a>

            <div className="flex"></div>

            <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
              <div className="nav-item dropdown d-none d-sm-flex">
                <a
                  href="#"
                  className="nav-link d-flex align-items-center dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span className="user-icon material-icons sidebar-menu-icon sidebar-menu-icon--left rounded-circle mr-8pt">
                    account_circle
                  </span>
                  <span className="flex d-flex flex-column mr-8pt">
                    <span className="navbar-text-100">
                      {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </span>
                    <small className="navbar-text-50">
                      {loggedInUser?.role}
                    </small>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-header">
                    <strong>Account</strong>
                  </div>
                  <a className="dropdown-item">Edit Account</a>
                  <a className="dropdown-item" onClick={() => logout()}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- // END Header --> */}
    </>
  );
};

export default HeadNav;
