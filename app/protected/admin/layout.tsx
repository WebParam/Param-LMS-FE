"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNavDrawer";
import { useEffect, useState } from "react";
import withAuth from "./AdminAuthWrapper";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import AOS from "aos";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";
import "aos/dist/aos.css";
import KillSwitchPage from "@/components/maintenance/KillSwitchPage";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [killSwitch, setKillSwitch] = useState<any>();
  const [killSwitchMessage, setKillSwitchMessage] = useState<any>(101);
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const courseId = params.id;
  const courseTitle = searchParams.get("title") || "";
  const pathName = usePathname();
  const isHost = pathName == "/protected/host/host/completed"
  const [projectLength, setProjectLength] = useState<string | null>(null);

  useEffect(() => {
    setProjectLength(localStorage.getItem("len"));
  }, []);

  const userRole = process.env.NEXT_PUBLIC_USER;

  const sideTabs = [
    {
      name:userRole === "freemium" ? "Back To Projects" : "Back To Courses",
      url: userRole ? `/protected/home/projects` : `/protected/home/courses` ,
      icon: "home",
      roles: ["Admin", "SuperAdmin", "Freemium"],
    },
    {
      name: userRole === "freemium" ? "Project" : "Course",
      url: `/protected/admin/courses/${courseId}?title=${courseTitle}`,
      icon: "school",
      roles: ["Admin", "SuperAdmin", "Freemium"],
      children: [
        {
          name: userRole === "freemium" ? "Project Applicants" : "Course Applicants",
          url: `/protected/admin/courses/${courseId}/course-applicants?title=${courseTitle}`,
          icon: "group",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        },

        {
          name: userRole === "freemium" ? "Enrolled Students " : "Enrolled Students",
          url: `/protected/admin/courses/${courseId}/enrollments?title=${courseTitle}`,
          icon: "group",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        },
        {
          name: userRole === "freemium" ? "Edit Project" : "Edit Course",
          url: userRole !== "freemium" ? `/protected/admin/courses/${courseId}?title=${courseTitle}` : `/protected/home/projects/${courseId}?title=${courseTitle}`,
          icon: "edit",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        },
        ...(userRole !== "freemium" || Number(projectLength) < 2 ? [{
          name: userRole === "freemium"  ? "Create Project" : "Create Course",
          url: `/protected/home/courses/create`,
          icon: "add_box",
          roles: ["Admin", "SuperAdmin", "Freemium"],
        }] : []),
      ],
    },

    {
      name: "Analytics",
      url: `/protected/admin/analytics/graphs/course?title=${courseTitle}`,
      icon: "show_chart",
      roles: ["Admin", "SuperAdmin"],
      children: [
        {
          name: userRole === "freemium" ? "Project Analytics" : "Course Analytics",
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
      url: `/protected/admin/analytics/graphs/host-companies/companies?title=${courseTitle}`,
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
   
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  useEffect(() => {
    flagsmith.init({
      environmentID: "GTGFWiyEFuVDfna2gjdqQC",
      onChange: () => {
        console.log("Flags updated", flagsmith.getAllFlags());
        const flags = flagsmith.getAllFlags();
        setKillSwitch(flags.next_public_killswitch.value);
        setKillSwitchMessage(flags.next_public_deploymentmessage.value);
      },
      onError: (error: any) => {
        console.error("Error loading flags", error);
      },
    });
  }, []);
  return (
    <>
          <FlagsmithProvider
        options={{
          environmentID: "GTGFWiyEFuVDfna2gjdqQC",
        }}
        flagsmith={flagsmith}
      >
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

          {killSwitch == 101 ? (
              <KillSwitchPage message={killSwitchMessage} />
            ) : (
              children
            )}
        </div>
      </div>
  
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs} />
      </FlagsmithProvider>
    </>
  );
}

export default withAuth(RootLayout);
