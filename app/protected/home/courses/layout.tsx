"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
