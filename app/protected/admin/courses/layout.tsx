"use client";
import React, { useState, useEffect } from "react";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

function Layout({ children }: { children: React.ReactNode }) {
  const [flagsLoaded, setFlagsLoaded] = useState(false);

  useEffect(() => {
    flagsmith.init({
      environmentID: "GTGFWiyEFuVDfna2gjdqQC",
      onChange: () => {
        console.log("Flags updated", flagsmith.getAllFlags());
        setFlagsLoaded(true);
      },
      onError: (error) => {
        console.error("Error loading flags", error);
        setFlagsLoaded(true); 
      },
    });
  }, []);

  return (
    <FlagsmithProvider
      options={{
        environmentID: "GTGFWiyEFuVDfna2gjdqQC",
      }}
      flagsmith={flagsmith}
    >
      <div className="mdk-header-layout__content page-content">
        {flagsLoaded &&
          <div className="mdk-header-layout__content page-content">
            {children}
          </div>
        }
      </div>
    </FlagsmithProvider>
  );
}

export default Layout;
