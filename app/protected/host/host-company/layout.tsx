"use client";
import PageHeader from "../../../components/PageHeaders/host-company/PageHeader";

function Layout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader title="Sanlam Program" />
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
