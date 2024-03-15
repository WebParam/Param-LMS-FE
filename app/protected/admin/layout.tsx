"use client"
import Drawer from '@/app/components/SideNav/Drawer'
import HeadNav from '@/app/components/HeadNav/HeadNav';
import { useState } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const sideTabs = [
    { name: 'Dashboard', url: '/protected/admin/manage-courses', icon: 'insert_chart_outlined' },
    { name: 'Students', url: '#', icon: 'people_outline' },
    { name: 'Manage Courses', url: '/protected/admin/courses', icon: 'assignment' },
    {
      name: 'Assessments', url: '#', icon: 'assignment', children: [
        { name: 'List of Assessments', url: '/protected/admin/assessments', icon: '' },
        { name: 'Grade Assessments', url: '/protected/admin/assessments/grade-assements', icon: '' }
      ]
    }
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
