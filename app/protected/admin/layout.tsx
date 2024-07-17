"use client";
import Drawer from "@/app/topbar-components/Drawer";
import HeadNav from "@/app/topbar-components/HeadNav";
import { useState } from "react";
import withAuth from './AdminAuthWrapper'

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const sideTabs = [
    { name: 'Course Analytics', url: '/protected/admin/course-dashboard/graphs/course', icon: 'show_chart' },
    { name: 'Student Analytics', url: '/protected/admin/course-dashboard/student-table', icon: 'show_chart' },
    {name : 'Grouped Analytics', url: `/protected/admin/grouped-progress/1/assessments`, icon : 'show_chart',},
    {name : 'Manage Courses', url: `/protected/admin/courses`, icon : 'create_new_folder',},
    {name : 'Edit Course', url: `/protected/admin/courses`, icon : 'create_new_folder',},
    {name : 'Create Course', url: `/protected/admin/courses`, icon : 'create_new_folder',},
    {name : 'Facilitator', url: `/protected/admin/facilitator?title=Facilitator Dashboard&homeTitle=HOME`, icon : 'dashboard',},
    {name : 'Moderator', url: `/protected/admin/moderator?title=Mark Assessments&homeTitle=HOME`, icon : 'dashboard',},
    
    {name : 'Live Classes', url: `/protected/admin/live-classes?title=Live Classes Analytics`, icon : 'dashboard',},
    
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
                <li className="nav-item">
                  
                </li>
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