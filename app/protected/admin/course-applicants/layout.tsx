"use client";
import { useSearchParams } from "next/navigation";
import PageHeader from "./PageHeader";
import Cookies from "universal-cookie";

function Layout({ children }: { children: React.ReactNode }) {

  const searchParams = useSearchParams();
  const cookies = new Cookies();

  const courseTitle = searchParams.get("courseTitle")
  const courseTitleCooki = cookies.get("courseTitle")

  console.log("course title: ",courseTitle)

  let title = 'Course Applicants';

  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader title={courseTitle||courseTitleCooki} />
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
