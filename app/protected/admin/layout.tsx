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
  const isHost = pathName == "/protected/host/host/completed";
  const [projectLength, setProjectLength] = useState<string | null>(null);

  useEffect(() => {
    setProjectLength(localStorage.getItem("len"));
  }, []);

  const userRole = process.env.NEXT_PUBLIC_FREEMIUM === "true"? "freemium" : localStorage.getItem("role");

  const sideTabs = [
    {
      name: userRole === "freemium" ? "Back To Projects" : "Back To Courses",
      url: userRole === "freemium" ? `/protected/home/projects` : `/protected/home/courses`,
      icon: "home",
      roles: ["Admin", "SuperAdmin", "Freemium"],
    },
    {
      name: userRole === "freemium" ? "Project" : "Course",
      url: `/protected/admin/courses/${courseId}?title=${courseTitle}&id=${courseId}`,
      icon: "school",
      roles: ["Admin", "SuperAdmin", "Freemium"],
      children: [
        {
          name:
            userRole === "freemium"
              ? "Project Applicants"
              : "Course Applicants",
          url: `/protected/admin/courses/${courseId}/course-applicants?title=${courseTitle}&id=${courseId}`,
          icon: "group",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        },
        {
          name: userRole === "freemium" ? "Enrolled Students" : "Enrolled Students",
          url: `/protected/admin/courses/${courseId}/enrollments?title=${courseTitle}&id=${courseId}`,
          icon: "group",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        },
        // {
        //   name: userRole === "freemium" ? "Edit Project" : "Edit Course",
        //   url: userRole !== "freemium" ? `/protected/admin/courses/${courseId}?title=${courseTitle}&id=${courseId}` : `/protected/home/projects/${courseId}?title=${courseTitle}&id=${courseId}`,
        //   icon: "edit",
        //   roles: ["Admin", "SuperAdmin", "Freemium"],
        // },
        // ...(userRole !== "freemium" || Number(projectLength) < 2 ? [{
        //   name: userRole === "freemium" ? "Create Project" : "Create Course",
        //   url: `/protected/home/courses/create?title=${courseTitle}&id=${courseId}`,
        //   icon: "add_box",
        //   roles: ["Admin", "SuperAdmin", "Freemium"],
        // }] : []),
      ],
    },
    {
      name: "Analytics",
      url: `/protected/admin/analytics/graphs/course?title=${courseTitle}&id=${courseId}`,
      icon: "show_chart",
      roles: ["Admin", "SuperAdmin"],
      children: [
        // {
        //   name: userRole === "freemium" ? "Project Analytics" : "Course Analytics",
        //   url: `/protected/admin/analytics/graphs/course?title=${courseTitle}&id=${courseId}`,
        //   icon: "bar_chart",
        //   roles: ["Admin", "SuperAdmin"],
        // },
        // {
        //   name: "Assessment Analytics",
        //   url: `/protected/admin/analytics/graphs/assessments?title=${courseTitle}&id=${courseId}`,
        //   icon: "bar_chart",
        //   roles: ["Admin", "SuperAdmin"],
        // },
        // {
        //   name: "Assignments Analytics",
        //   url: `/protected/admin/analytics/graphs/assignments?title=${courseTitle}&id=${courseId}`,
        //   icon: "bar_chart",
        //   roles: ["Admin", "SuperAdmin"],
        // },
        // {
        //   name: "Students Analytics",
        //   url: `/protected/admin/analytics/grouped-analytics/students?title=${courseTitle}&id=${courseId}`,
        //   icon: "bar_chart",
        //   roles: ["Admin", "SuperAdmin"],
        // },
        {
          name: "Video Analytics",
          url: `/protected/admin/analytics/grouped-analytics/videos/course/${courseId}?title=${courseTitle}&id=${courseId}`,
          icon: "bar_chart",
          roles: ["Admin", "SuperAdmin"],
        },
      ],
    },
    // {
    //   name: "Host Analytics",
    //   url: `/protected/admin/analytics/graphs/host-companies/companies?title=${courseTitle}&id=${courseId}`,
    //   icon: "business",
    //   roles: ["Admin", "SuperAdmin"],
    // // },
    // {
    //   name: "Facilitator Dashboard",
    //   url: `/protected/admin/facilitator/?title=${courseTitle}&id=${courseId}`,
    //   icon: "dashboard",
    //   roles: ["Admin", "SuperAdmin"],
    // },
    {
      name: "Schedule Classes",
      url: `/protected/admin/scheduleclass?title=${courseTitle}&id=${courseId}`,
      icon: "class",
      roles: ["Admin", "SuperAdmin"],
    },
    // {
    //   name: "Messaging",
    //   url: `/protected/admin/facilitator/?title=${courseTitle}&id=${courseId}`,
    //   icon: "message",
    //   roles: ["Admin", "SuperAdmin"],
    //   children: [
    //     {
    //       name: "Notifications",
    //       url: `/protected/admin/notifications?title=${courseTitle}&id=${courseId}`,
    //       icon: "notifications",
    //       roles: ["Admin", "SuperAdmin"],
    //     },
    //   ],
    // },
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
