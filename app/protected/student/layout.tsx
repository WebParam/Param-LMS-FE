"use client"
import Drawer from '@/app/components/SideNav/Drawer'
import HeadNav from '@/app/components/HeadNav/HeadNav';
import { useState } from 'react';
import SideTab from '@/app/interfaces/sideTabs';
import withAuth from './StudentAuthWrapper'

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const sideTabs: SideTab[] = [
    { name: 'Dashboard', url: '#/protected/student/dashboard', icon: 'insert_chart_outlined' },
    { name: 'My Courses', url: '#', icon: 'people_outline' },
    { name: 'Courses', url: '/protected/student/course/all-courses', icon: 'assignment' },
    {
      name: 'Assessments', url: '#', icon: 'assignment', children: [
        { name: 'My Assessments', url: '/protected/student/assessments', icon: '' },
      ]
    },
    { name: 'Learning Path', url: '#', icon: 'assignment' }
  ];

  return ( 
    <>
      <div className="mdk-drawer-layout js-mdk-drawer-layout"
              data-push
              data-responsive-width="992px">
                  <div className="mdk-drawer-layout__content page-content">
                  <HeadNav setIsOpen={setIsOpen} isOpen={isOpen} /> 
          
                      {children}
          </div>
        <Drawer setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs}/> 
        </div>
    </>
  )
}

export default withAuth(RootLayout);
