"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNavDrawer";
import { useEffect, useState } from "react";
import withAuth from "./AdminAuthWrapper";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const courseId = params.id;
  const courseTitle = searchParams.get("title") || "";
  const pathName = usePathname();
  const isHost = pathName == "/protected/host/host/completed"

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
      icon: "school",
      roles: ["Admin", "SuperAdmin"],
      children: [
        {
          name: "Course Applicants",
          url: `/protected/admin/courses/${courseId}/course-applicants?title=${courseTitle}`,
          icon: "group",
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
      name: "Analytics",
      url: `/protected/admin/analytics/graphs/course?title=${courseTitle}`,
      icon: "show_chart",
      roles: ["Admin", "SuperAdmin"],
      children: [
        {
          name: "Course Analytics",
          url: `/protected/admin/analytics/graphs/course?title=${courseTitle}`,
          icon: "bar_chart",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          name: "Assessment Analytics",
          url: `/protected/admin/analytics/graphs/assessments?title=${courseTitle}`,
          icon: "bar_chart",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          name: "Assignments Analytics",
          url: `/protected/admin/analytics/graphs/assignments?title=${courseTitle}`,
          icon: "bar_chart",
          roles: ["Admin", "SuperAdmin"],
        },
       
        {
          name: "Grouped Analytics",
          url: `/protected/admin/analytics/grouped-analytics?title=${courseTitle}`,
          icon: "bar_chart",
          roles: ["Admin", "SuperAdmin"],
        },
        
    {
      name: "Host Analytics",
      url: `/protected/admin/host-companies/companies?title=${courseTitle}`,
      icon: "business",
      roles: ["Admin", "SuperAdmin"],
    },
      ],
    },

    {
      name: "Facilitator Dashboard",
      url: `/protected/admin/facilitator/?title=${courseTitle}`,
      icon: "dashboard",
      roles: ["Admin", "SuperAdmin"],
    },
    {
      name: "Messaging",
      url: `/protected/admin/facilitator/?title=${courseTitle}`,
      icon: "message",
      roles: ["Admin", "SuperAdmin"],
      children: [
        {
          name: "Notifications",
          url: `/protected/admin/notifications?title=${courseTitle}`,
          icon: "notifications",
          roles: ["Admin", "SuperAdmin"],
        },
       
      ],
    },

    {
      name: "Host Company",
      url: `/protected/admin/host/completed?title=${courseTitle}`,
      icon: "business",
      roles: ["Admin", "SuperAdmin"],
    },
   
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <>
      <div className="mdk-header-layout js-mdk-header-layout">
        <HeadNav setIsOpen={setIsOpen} isOpen={isOpen} />
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
      </div>
  
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs} />
    </>
  );
}

export default withAuth(RootLayout);
