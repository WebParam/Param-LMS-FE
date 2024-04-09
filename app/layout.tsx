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
//     setIsNavigatingWithinApp(true)
//     if (!isNavigatingWithinApp) {
//       event.preventDefault();

//       try {
//         const targetId = localStorage.getItem("targetId") || '';
//         const activity = {
//           UserId: user?.id,
//           ActivityType: IActivityType.Logout,
//           Duration: 0,
//           TargetId: targetId,
//         };

//         await Api.POST_Activity(activity);
//       } catch (error) {
//         console.error('Error sending data:', error);
//       }
//     }
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, [isNavigatingWithinApp]);

// const handleNavigationWithinApp = () => {
//   setIsNavigatingWithinApp(true);
// };

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
