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
 




  return (
    <html lang="en" dir="ltr">
      <head
            // onClick={handleNavigationWithinApp}

      ><link href="https://fonts.googleapis.com/css?family=Lato:400,700%7COswald:300,400,500,700%7CRoboto:400,500%7CExo+2:600&amp;display=swap" rel="stylesheet"/>
      </head>
      <body 
     // onClick={handleSubmit}
      className="layout-app layout-sticky-subnav"
      ><ReduxProvider> {children} </ReduxProvider>
      <JsScripts />
      </body>
  
    </html>
  )
}
