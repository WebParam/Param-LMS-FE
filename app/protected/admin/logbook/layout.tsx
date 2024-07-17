"use client";
import PageHeader from "@/app/protected/admin/logbook/(components)/PageHeader";
import { useSearchParams, usePathname } from "next/navigation";

function Layout({ children , params}: { children: React.ReactNode, params:{assessmentId : string} }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
 


  return (
    <>
      <div className="mdk-header-layoutcontent page-content ">
        <div className="mdk-header-layoutcontent page-content ">
        <PageHeader title={title}  />

          <div className="container pagecontainer pagecontainer page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;