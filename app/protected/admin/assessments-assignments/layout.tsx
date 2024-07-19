"use client";
import { useSearchParams, usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

function Layout({ children , params}: { children: React.ReactNode, params:{assessmentId : string} }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
 


  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
        <PageHeader title={title}  />

          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
