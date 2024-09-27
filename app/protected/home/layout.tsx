"use client";
import HeadNav from "@/app/topbar-components/HeadNav";
import { useEffect, useState } from "react";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";
import AOS from "aos";
import "aos/dist/aos.css";
import KillSwitchPage from "@/components/maintenance/KillSwitchPage";
function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [killSwitch, setKillSwitch] = useState<any>();
  const [killSwitchMessage, setKillSwitchMessage] = useState<any>(101);

  useEffect(() => {
    flagsmith.init({
      environmentID: "GTGFWiyEFuVDfna2gjdqQC",
      onChange: () => {
        console.log("Flags updated", flagsmith.getAllFlags());
        const flags = flagsmith.getAllFlags();
        setKillSwitch(flags.next_public_killswitch.value);
        setKillSwitchMessage(flags.next_public_deploymentmessage.value);
      },
      onError: (error: any) => {
        console.error("Error loading flags", error);
      },
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
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
        <div
          style={{ backgroundColor: "white" }}
          className="mdk-header-layout js-mdk-header-layout"
        >
          <HeadNav setIsOpen={setIsOpen} isOpen={isOpen} />

          <div className="mdk-header-layout__content page-content ">
            <nav className="navbar navbar-light bg-alt border-bottom">
              <div className="container page__container">
                <ul className="nav navbar-nav">
                  <li className="nav-item"></li>
                </ul>
              </div>
            </nav>
            {killSwitch == 101 ? (
              <KillSwitchPage message={killSwitchMessage} />
            ) : (
              children
            )}{" "}
          </div>
        </div>
      </FlagsmithProvider>
    </>
  );
}

export default RootLayout;
