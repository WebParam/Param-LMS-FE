"use client";
import Image from "next/image";
import Cookies from "universal-cookie";
import { ReduxProvider } from "../provider";
import { usePathname } from "next/navigation";

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
        <div>{children}</div>
      </ReduxProvider>
    </>
  );
}
