"use client";
import Cookies from "universal-cookie";
import { ReduxProvider } from "../provider";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

const cookies = new Cookies();

const isLoggedIn = cookies.get("param-lms-user");

console.log(isLoggedIn);

const metadata = {
  title: "Login",
  description: "Supercharge your learning",
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <ReduxProvider>
        <FlagsmithProvider
          options={{
            environmentID: "GTGFWiyEFuVDfna2gjdqQC",
          }}
          flagsmith={flagsmith}
        >
        <div className="h-100 w-100">{children}</div>
        </FlagsmithProvider>
      </ReduxProvider>
    </>
  );
}
