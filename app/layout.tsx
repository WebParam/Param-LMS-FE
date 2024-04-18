import "./css/style.css";
import "./vendor/perfect-scrollbar.css";
import "./css/material-icons.css";
import "./css/fontawesome.css";
import "./vendor/spinkit.css";
import "./css/preloader.css";
import "./css/app.css";
import "./css/dark-mode.css";
import "./globals.css";
import JsScripts from "@/app/template-components/JsScripts";
import type { Metadata } from "next";
import { ReduxProvider } from "./provider";

export const metadata: Metadata = {
  title: "Param LMS",
  description: "Param LMS |  A new way to learn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700%7COswald:300,400,500,700%7CRoboto:400,500%7CExo+2:600&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="layout-app layout-sticky-subnav">
        <ReduxProvider> {children} </ReduxProvider>
        <JsScripts />
      </body>
    </html>
  );
}