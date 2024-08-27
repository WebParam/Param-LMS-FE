"use client";
import Link from 'next/link';
import './layout.scss'
import { usePathname} from 'next/navigation';

import Cookies from 'universal-cookie';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const tabs = [
    { name: "Logbook", title: "Logbook", url: `#` },
    { name: "Workbook", title: "Workbook",url: `#`},
    
  ];
  
  return (
    <>
      {/* <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Link
            href={`${tab.url}`}
              key={tab.name}
              className={pathname.includes(tab.name) ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{cursor:'pointer'}}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
          ))}          
        </div>
      </div> */}

      <div className="card mt-3">
        {children}
      </div>
    
    </>
  );
};

export default Layout;
