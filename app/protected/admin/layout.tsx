"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNavDrawer";
import { useState } from "react";
import withAuth from "./AdminAuthWrapper";
import { useParams, useSearchParams } from "next/navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const courseId = params.id;
  const courseTitle = searchParams.get("title") || "";

  const sideTabs = [
    {
      name: "Back To Courses",
      url: `/protected/home/courses`,
      icon: "home",
    },
    {
      name: "Course Applicants",
      url: `/protected/admin/courses/${courseId}/course-applicants?title=${courseTitle}`,
      icon: "person",
    },
    {
      name: "Enrolled Students",
      url: `/protected/admin/courses/${courseId}/enrollments?title=${courseTitle}`,
      icon: "group",
    },
    {
      name: "Edit Course",
      url: `/protected/admin/courses/${courseId}?title=${courseTitle}`,
      icon: "edit",
    },

    {
      name: "Create Course",
      url: `/protected/home/courses/create`,
      icon: "add_box",
    },
  ];

  return (
    <>
      <div className="mdk-header-layout js-mdk-header-layout">
        <HeadNav setIsOpen={setIsOpen} isOpen={isOpen} />

        {/* <!-- Header Layout Content --> */}
        <div className="mdk-header-layout__content page-content ">
          <nav className="navbar navbar-light bg-alt border-bottom">
            <div className="container page__container">
              <ul className="nav navbar-nav">
                <li className="nav-item"></li>
              </ul>
            </div>
          </nav>

          {children}
        </div>
        {/* <!-- // END Header Layout Content --> */}
      </div>
      {/* <!-- // END Header Layout --> */}

      {/* <!-- drawer --> */}
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs} />
    </>
  );
}

export default withAuth(RootLayout);
