"use client";
import PageHeader from "./PageHeader";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  

  return (
    <>
      <div className="mdk-header-layout__content page-content ">
      
        <div className="mdk-header-layout__content page-content ">
          <PageHeader />
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
