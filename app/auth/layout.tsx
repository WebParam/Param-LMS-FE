"use client";
import Cookies from "universal-cookie";
import { ReduxProvider } from "../provider";
import { usePathname } from "next/navigation";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";
import { useEffect, useState } from "react";
import KillSwitchPage from "@/components/maintanance/Maintance";
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
  let bannerName = "";
  const pathname = usePathname();
  if (pathname == "/auth/admin/login") bannerName = "Thooto Admin Login";
  else if (pathname == "/auth/host/login") bannerName = "Thooto Host Login";
  else if (pathname == "/auth/admin/register")
    bannerName = "Thooto Admin Register";
  else if (pathname == "/auth/verify-account") bannerName = "Verify Account";
  else if (pathname == "/" || pathname == "/auth/login")
    bannerName = "Thooto Admin Portal";
  else bannerName = "Thooto Admin Register";
  const [killSwitch, setKillSwitch] = useState<any>();
  const [killSwitchMessage, setKillSwitchMessage] = useState<any>(101);

  useEffect(() => {
    flagsmith.init({
      environmentID: "GTGFWiyEFuVDfna2gjdqQC",
      onChange: () => {
        console.log("Flags updated", flagsmith.getAllFlags());
        const flags = flagsmith.getAllFlags();
        setKillSwitch(flags.next_public_killswitch.value);
        setKillSwitchMessage(flags.next_public_deploymentmessage.value)
      },
      onError: (error) => {
        console.error("Error loading flags", error);
      },
    });
  }, []);

  return (
    <>
   <FlagsmithProvider
    options={{
      environmentID: "GTGFWiyEFuVDfna2gjdqQC",
    }}
    flagsmith={flagsmith}
  >
        
        <ReduxProvider>
          <div className="h-100 w-100">
            {
              killSwitch == 101 ? <KillSwitchPage message={killSwitchMessage} /> : children
            }
          </div>
        </ReduxProvider>
      </FlagsmithProvider>
    </>
  );
}
