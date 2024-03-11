"use Client"

import Head from 'next/head';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import JsScripts from '@/app/template-components/JsScripts'
import Drawer from '@/app/template-components/SideNav/Drawer'
import SearchNav from '@/app/template-components/HeadNav/HeadNav';

const inter = Inter({ subsets: ['latin'] })
// const Sentry = require('@sentry/node');
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
    <>
      <div className="mdk-drawer-layout js-mdk-drawer-layout"
              data-push
              data-responsive-width="992px">
                  <div className="mdk-drawer-layout__content page-content">
                  <SearchNav /> 
          
                      {children}
          </div>
          <Drawer />
        </div>
      <JsScripts />
    </>
  )
}
