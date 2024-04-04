"use client"
import './css/style.css'
import './vendor/perfect-scrollbar.css'
import './css/material-icons.css'
import './css/fontawesome.css'
import './vendor/spinkit.css'
import './css/preloader.css'
import './css/app.css'
import './css/dark-mode.css'
import './globals.css'
import JsScripts from '@/app/template-components/JsScripts'
import Cookies from "universal-cookie"
import { UseDispatch, useDispatch } from 'react-redux'
import type { Metadata } from 'next'
import { ReduxProvider } from './provider'
import { Api } from './lib/restapi/endpoints'
import { IActivity, IActivityType } from './interfaces/analytics'
import { setLogoutTime } from './redux/timeSlice'
import {  useEffect, useState } from 'react'

// export const metadata: Metadata = {
//   title: 'Param LMS',
//   description: 'Param LMS |  A new way to learn',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookies = new Cookies();
  const user = cookies.get('param-lms-user');

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
  
  const todayDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

function differenceInSeconds(startTime:string, endTime:string) {
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);
  const difference = Math.abs(endDateTime.getTime() - startDateTime.getTime());
  return Math.floor(difference / 1000);
}


 const handleBeforeUnload = async (event:any) => {
    event.preventDefault(); 

    try {
      const loginTime = localStorage.getItem("loginTime");
      const parsedLogInTime  = loginTime ? JSON.parse(loginTime) : null;
      const targetId = localStorage.get("targetId")
      const duration =   differenceInSeconds("2024-04-03 15:15:45", todayDateTime);
  const activity : IActivity = {
    UserId: user?.id,
    TimeStamp: null,
    ActivityType: IActivityType.Logout,
    Duration: duration,
    TargetId: targetId,
   }

      const response = await Api.POST_Activity(activity)
      debugger;
      if (!response.data?.UserId) {
        console.error('Failed to send data:', response.error);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }

    event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
  };

  window.addEventListener('beforeunload', handleBeforeUnload);


useEffect(() => {
 
}, []);

  return (
    <html lang="en" dir="ltr">
      <head
      ><link href="https://fonts.googleapis.com/css?family=Lato:400,700%7COswald:300,400,500,700%7CRoboto:400,500%7CExo+2:600&amp;display=swap" rel="stylesheet"/>
      </head>
      <body className="layout-app layout-sticky-subnav"><ReduxProvider> {children} </ReduxProvider>
      <JsScripts />
      </body>
  
    </html>
  )
}
