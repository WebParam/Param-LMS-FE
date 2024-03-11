"use client"
import Drawer from '@/app/components/SideNav/Drawer'
import HeadNav from '@/app/components/HeadNav/HeadNav';
import { useState } from 'react';
import SideTab from '@/app/interfaces/sideTabs';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const sideTabs: SideTab[] = [
    { name: 'Dashboard', url: '#', icon: 'insert_chart_outlined' },
    { name: 'My Courses', url: '#', icon: 'people_outline' },
    { name: 'Courses', url: '/protected/admin/courses', icon: 'assignment' },
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
