"use Client"
import './globals.css'
import './css/app.css'
import './vendor/perfect-scrollbar.css'
import './css/material-icons.css'
import './css/fontawesome.css'
import './vendor/spinkit.css'
import './css/preloader.css'
import './css/dark-mode.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const Sentry = require('@sentry/node');
export const metadata: Metadata = {
  title: 'Param LMS',
  description: 'Param LMS |  A new way to learn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head
      ><link href="https://fonts.googleapis.com/css?family=Lato:400,700%7COswald:300,400,500,700%7CRoboto:400,500%7CExo+2:600&amp;display=swap" rel="stylesheet"/>
      </head>
     <body className="layout-mini-secondary has-drawer-opened">{children}</body>
    </html>
  )
}
