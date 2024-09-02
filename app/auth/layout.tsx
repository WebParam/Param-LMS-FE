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
  let bannerName = '';
  const pathname = usePathname();
  if (pathname == "/auth/admin/login") bannerName = "Thooto Admin Login"
  else if (pathname == "/auth/host/login") bannerName = "Thooto Host Login"
  else if (pathname == "/auth/admin/register") bannerName = "Thooto Admin Register"
  else if (pathname == "/auth/verify-account") bannerName = "Verify Account"
  else if (pathname == "/" || pathname == "/auth/login" ) bannerName = "Thooto Admin Portal"
  else bannerName = "Thooto Admin Register"

  return (
    <>
      <ReduxProvider>
        <div>{children}</div>
      </ReduxProvider>
    </>
  );
}
