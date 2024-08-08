"use client";
import { useSearchParams, usePathname } from "next/navigation";
import PageHeader from "@/app/components/account/PageHeader";
import Steppers from "@/components/account/Steppers";

function Layout({ children , params}: { children: React.ReactNode, params:{assessmentId : string} }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("account-title")!;
 


  return (
    <div
    className="mdk-drawer-layout js-mdk-drawer-layout"
    data-push
    data-responsive-width="992px"
  >
    <div className="mdk-drawer-layout__content page-content">
      <PageHeader title={title} />
      <div className="container-fluid page__container">
      <div className="row">
            {children}
            <Steppers />
          </div>
      </div>
    </div>
  </div>
  );
}

export default Layout;
