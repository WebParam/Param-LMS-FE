"use client";
import { useState, useEffect } from 'react';
import { useDeploymentTime } from "../components/maintenance/useDeploymentTime";
import Banner from "../components/maintenance/Banner";
import { ReduxProvider } from "../provider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { showBanner } = useDeploymentTime();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <>
      <ReduxProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {showBanner ? (
            <Banner />
          ) : (
            children
          )}
        </div>
      </ReduxProvider>
    </>
  );
}
