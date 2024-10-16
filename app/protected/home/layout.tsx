"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNavDrawer";
import { useEffect, useState } from "react";
import withAuth from "./AdminAuthWrapper";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "universal-cookie";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const courseId = params.id;
  const courseTitle = searchParams.get("title") || "";
  const pathName = usePathname();
  const isHost = pathName == "/protected/host/host/completed";
  const [projectLength, setProjectLength] = useState<string | null>(null);
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const adminRoles = ["Admin", "SuperAdmin", "Freemium"];

  useEffect(() => {
    setProjectLength(localStorage.getItem("len"));
  }, []);

  const userRole =
    process.env.NEXT_PUBLIC_FREEMIUM === "true"
      ? "freemium"
      : localStorage.getItem("role");

  const sideTabs = [
    {
      name: "Courses",
      url: `/protected/home/courses`,
      icon: "school",
      roles: ["Admin", "SuperAdmin", "Freemium"],
    },
    {
      name: "Users",
      url: "/protected/home/users",
      icon: "group",
      roles: ["Admin", "SuperAdmin", "Freemium"],
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
        <HeadNav
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          adminRoles={adminRoles}
        />

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
      {loggedInUser.role.includes(adminRoles) && (
        <Drawer setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs} />
      )}
    </>
  );
}

export default withAuth(RootLayout);
