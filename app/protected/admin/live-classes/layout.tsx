"use client";
import PageHeader from "./(graphs)/PageHeader";
import { useSearchParams, usePathname } from "next/navigation";

function Layout({ children , params}: { children: React.ReactNode, params:{assessmentId : string} }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  const home_title = searchParams.get("home_title")!;
 


  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
        <PageHeader homeTitle={home_title} title={title}  />
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
