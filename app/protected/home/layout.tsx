"use client";
import HeadNav from "@/app/topbar-components/HeadNav";
import { useEffect, useState } from "react";
import withAuth from "./AdminAuthWrapper";
import AOS from "aos";
import "aos/dist/aos.css";
function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

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
    </>
  );
}

export default withAuth(RootLayout);
