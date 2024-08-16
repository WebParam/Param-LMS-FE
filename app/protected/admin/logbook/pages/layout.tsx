"use client";
import './layout.scss'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import Cookies from 'universal-cookie';

function Layout({ children }: { children: React.ReactNode }) {
  const cookies = new Cookies();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    { name: "Complete", title: "Complete", url: `/protected/admin/logbook/pages/completed?title=Logbook` },
    { name: "Outstanding", title: "Outstanding", url: `/protected/admin/logbook/pages/outstanding?title=Logbook` },
    
  ];
  
  return (
    <>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <a 
              key={tab.name}
              onClick={()=> router.replace(`${tab.url}`)}
              className={pathname.includes(tab.name) ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{cursor:'pointer'}}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </a>
          ))}          
        </div>
      </div>

      <div className="card mt-3">
        {children}
      </div>
    
    </>
  );
};

export default Layout;
