"use client";
import PageHeader from "./PageHeader";

function Layout({ children }: { children: React.ReactNode }) {

  let title = 'Course Applicants';

  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader title={title} />
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
