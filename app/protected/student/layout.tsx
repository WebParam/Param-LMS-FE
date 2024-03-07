import Sidebar from "@/app/components/Sidebar";
import { ReduxProvider } from "@/app/provider";
import Image from "next/image";
import Link from 'next/link'

import Cookies from "universal-cookie";
var cookies =new Cookies();
export const metadata = {
  title: "Student - Portal",
  description: "Supercharge your learning",
};



export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {

 
  return (
    <ReduxProvider>
<div
  className="mdk-drawer-layout js-mdk-drawer-layout"
  data-push=""
  data-responsive-width="992px"
  data-domfactory-upgraded="mdk-drawer-layout"
>
  <div
    className="mdk-drawer-layout__content page-content"
    style={{ transform: "translate3d(0px, 0px, 0px)" }}
  >
    {/* Header */}
    <div
      className="navbar navbar-expand navbar-light border-bottom-2"
      id="default-navbar"
      data-primary=""
    >
      {/* Navbar toggler */}
      <button
        className="navbar-toggler w-auto mr-16pt d-block d-lg-none rounded-0"
        type="button"
        data-toggle="sidebar"
      >
        <span className="material-icons">short_text</span>
      </button>
      {/* Navbar Brand */}
      <a href="index.html" className="navbar-brand mr-16pt d-lg-none">
        {/* <img class="navbar-brand-icon" src="../../public/images/logo/white-100@2x.png" width="30" alt="Luma"> */}
        <span className="avatar avatar-sm navbar-brand-icon mr-0 mr-lg-8pt">
          <span className="avatar-title rounded bg-primary">
            <img
              src="../../public/images/illustration/student/128/white.svg"
              alt="logo"
              className="img-fluid"
            />
          </span>
        </span>
        <span className="d-none d-lg-block">Luma</span>
      </a>
    
    </div>
    {/* // END Header */}
    {/* BEFORE Page Content */}
    {/* // END BEFORE Page Content */}
    {/* Page Content */}
   <>
   {children}
   </>
    {/* // END Page Content */}
    {/* Footer */}
   
    {/* // END Footer */}
  </div>
  {/* // END drawer-layout__content */}
  {/* Drawer */}
  <Sidebar/>
  {/* // END Drawer */}
</div>
</ReduxProvider>
  );
}
