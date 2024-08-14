"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNav";
import { useState } from "react";
import withAuth from "./AdminAuthWrapper";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const sideTabs = [
    {
      name: "Analytics",
      url: "#",
      icon: "show_chart",

      children: [
        {
          name: "Course Analytics",
          url: "/protected/admin/course-dashboard/graphs/course",
          icon: "list",
        },
        {
          name: "Student Analytics",
          url: "/protected/admin/student-analytics",
          icon: "person",
        },
        {
          name: "Analytic Averages",
          url: `/protected/admin/grouped-progress/1/assessments`,
          icon: "show_chart",
        },
        {
          name: "Workbook-Logbook Analytics",
          url: `/protected/admin/grouped-progress/1/assessments`,
          icon: "show_chart",
        },
        {
          name: "Host Company Analytics",
          url: `/protected/admin/grouped-progress/1/assessments`,
          icon: "show_chart",
        },
        {
          name: "Assessment-Assignments Analytics",
          url: `/protected/admin/grouped-progress/1/assessments`,
          icon: "show_chart",
        },
      ],
    },
    {
      name: "Course",
      url: "#",
      icon: "list",
      children: [
        {
          name: "Course Applicants",
          url: `/protected/admin/course-applicants`,
          icon: "person",
        },
        {
          name: "Enrollments",
          url: `/protected/admin/enrollments`,
          icon: "assignment_turned_in",
        },
        {
          name: "Manage Courses",
          url: `/protected/admin/courses`,
          icon: "folder_open",
        },
        {
          name: "Create Course",
          url: `/protected/admin/courses/create`,
          icon: "add_box",
        },
        {
          name: "Edit Course",
          url: `#/protected/admin/courses`,
          icon: "edit",
        },
      ],
    },
    {
      name: "Facilitator",
      url: `/protected/admin/facilitator?title=Facilitator Dashboard&homeTitle=HOME`,
      icon: "dashboard",
    },
    {
      name: "Moderator",
      url: "#",
      icon: "supervisor_account",
      children: [
        {
          name: "Assessments",
          url: `/protected/admin/moderator/pages/assessment?title=Mark Assessments&homeTitle=HOME&page=grouped`,
          icon: "assignment_ind",
        },
        {
          name: "Assignments",
          url: `/protected/admin/moderator/pages/assignments?title=Mark Assignments&homeTitle=HOME&page=grouped`,
          icon: "assignment_ind",
        },
      ],
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
