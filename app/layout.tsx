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
import type { Metadata } from 'next'
import { ReduxProvider } from './provider'
import { Api } from './lib/restapi/endpoints'
import { IActivity, IActivityType } from './interfaces/analytics'
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
  const [isNavigatingWithinApp, setIsNavigatingWithinApp] = useState(false);
 



// useEffect(() => {
//   const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
//     event.preventDefault();
//     const date = new Date();
//     const user_session = localStorage.getItem("user-session") || null;
    
//     if (user_session) {
//         const parseSession = JSON.parse(user_session);
//         const sessionEnd = new Date(parseSession.sessionEnd);
    
//         if (date > sessionEnd) {
//             // Session has ended, redirect user to the home page
//             window.location.href = "/";
//         } else {
//             // Session is still active, update last active time and extend session
//             const loginData = {
//                 sessionStart: parseSession.sessionStart,
//                 sessionEnd: new Date(date.getTime() + (2 * 60000)), // Adding 2 minutes for testing
//                 lastActive: new Date().toISOString()
//             };
    
//             localStorage.setItem("user-session", JSON.stringify(loginData));
//         }
//     } else {
//         // Handle case when no user session is found
//         console.log("User session not found.");
//     }
  
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, []);


  return (
    <html lang="en" dir="ltr">
      <head
            // onClick={handleNavigationWithinApp}

      ><link href="https://fonts.googleapis.com/css?family=Lato:400,700%7COswald:300,400,500,700%7CRoboto:400,500%7CExo+2:600&amp;display=swap" rel="stylesheet"/>
      </head>
      <body 
      className="layout-app layout-sticky-subnav"
      ><ReduxProvider> {children} </ReduxProvider>
      <JsScripts />
      </body>
  
    </html>
  )
}
