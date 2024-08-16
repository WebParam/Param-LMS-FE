"use client";
import './layout.scss'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import Cookies from 'universal-cookie';

function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    { name: "Signed Off", title: "Signed Off", url: `/protected/admin/course-applicants/${id}/profiles` },
    { name: "Pending", title: "Pending", url: `/protected/admin/course-applicants/${id}/demographics` },
    
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
              onClick={()=> router.replace(`${tab.url}?id=${id}&name=${name}`)}
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
