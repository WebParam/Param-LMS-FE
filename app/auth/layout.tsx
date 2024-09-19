"use client";
import { useDeploymentTime } from "../components/maintenance/useDeploymentTime";
import Banner from "../components/maintenance/Banner";
import MaintenanceModal from "../components/maintenance/MaintenanceModal";
import { ReduxProvider } from "../provider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { showBanner } = useDeploymentTime();
  const pathname = usePathname();

  let bannerName = '';
  if (pathname == "/auth/admin/login") bannerName = "Thooto Admin Login"
  else if (pathname == "/auth/host/login") bannerName = "Thooto Host Login"
  else if (pathname == "/auth/admin/register") bannerName = "Thooto Admin Register"
  else if (pathname == "/auth/verify-account") bannerName = "Verify Account"
  else if (pathname == "/" || pathname == "/auth/login" ) bannerName = "Thooto Admin Portal"
  else bannerName = "Thooto Admin Register"

  return (
    <>
      <ReduxProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {showBanner ? (
            <>
              <Banner />
              <MaintenanceModal />
            </>
          ) : (
            children
          )}
        </div>
      </ReduxProvider>
    </>
  );
}
