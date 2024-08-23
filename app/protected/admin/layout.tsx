"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNavDrawer";
import { useEffect, useState } from "react";
import withAuth from "./AdminAuthWrapper";
import { useParams, useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";


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
      roles: ["Admin", "SuperAdmin"],
    },
    {
      name: "Course",
      url: `/protected/admin/courses/${courseId}?title=${courseTitle}`,
      icon: "person",
      roles: ["Admin", "SuperAdmin"],
      children: [
        {
          name: "Course Applicants",
          url: `/protected/admin/courses/${courseId}/course-applicants?title=${courseTitle}`,
          icon: "person",
          roles: ["Admin", "SuperAdmin"],
        },

        {
          name: "Enrolled Students",
          url: `/protected/admin/courses/${courseId}/enrollments?title=${courseTitle}`,
          icon: "group",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          name: "Edit Course",
          url: `/protected/admin/courses/${courseId}?title=${courseTitle}`,
          icon: "edit",
          roles: ["SuperAdmin"],
        },
        {
          name: "Create Course",
          url: `/protected/home/courses/create`,
          icon: "add_box",
          roles: ["SuperAdmin"],
        },
       
      ],
    },

    {
      name: "Course Analytics",
      url: `/protected/admin/course-dashboard/graphs/course?title=${courseTitle}`,
      icon: "bar_chart",
      roles: ["Admin", "SuperAdmin"],
    },
    {
      name: "Assessment Analytics",
      url: `/protected/admin/course-dashboard/graphs/assessments?title=${courseTitle}`,
      icon: "bar_chart",
      roles: ["Admin", "SuperAdmin"],
    },
   
    {
      name: "Schedule Classes",
      url: `/protected/admin/scheduleclass?title=${courseTitle}`,
      icon: "meeting_room",
      roles: ["Admin", "SuperAdmin"],
    },

     {
      name: "Facilitator",
      url: `/protected/admin/facilitator/?title=Facilitator Dashboard&homeTitle=Home`,
      icon: "person",
      roles: ["Admin", "SuperAdmin"],
    },
    {
      name: "Host",
      url: `/protected/admin/host/pages/completed?title=${courseTitle}`,
      icon: "add_box",
      roles: ["Admin","SuperAdmin"],
    },

  ];

  useEffect(()=>{
    AOS.init({
      duration: 1200,
    });
  },[])

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
