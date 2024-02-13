"use client"
import React, { Component, useEffect} from "react";
import { Routes, Route, BrowserRouter, Outlet,Navigate } from "react-router-dom";
import Login from "./auth/login/page";
import RootLayout from "./auth/layout";
import Register from "./auth/register/page";
import Cookies from "universal-cookie";
import CourseVideo from "./protected/student/course/video/page";
import AllCourses from "./protected/student/course/all-courses/page";

var cookies =new Cookies();


export default function Page() {
  // useEffect(() => {
    // function Restrict(){
    //    let auth =cookies.get('param-lms-user');
    //   debugger;
    //       if (!auth) {
    //         window.location.href='/auth/login'; // Redirect to login if not authenticated
    //       }
    // }
   
  // }, []);


  return (
    <BrowserRouter>
    <Routes>
      {/* Specify the route for the root path */}
    
     <Route path="/" element={<RootLayout> <Login /> </RootLayout>} />

          {/* <Route path="auth/register" element={<Register/>} />

          <Route element={<PrivateRoute/>}>
            <Route path="protected/student/course/video" element={<CourseVideo/>}/>
            <Route path="protected/student/course/all-courses" element={<AllCourses/>}/>
          </Route> */}
    </Routes>
  </BrowserRouter>
 
  );
}
// const PrivateRoute =()=>
// {
//   let auth =cookies.get('param-lms-user');
//   console.log("Auth",auth);
//   
//   return (
   
//     auth!==undefined? <Outlet/>:<Navigate to={'auth/Login'}/>
//   )
// }