"use client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const tabs = [
    { name: "analytics", title: "Analytics", url: `/protected/admin/enrollments/${id}/analytics` },
    { name: "profile", title: "profile", url: `/protected/admin/enrollments/${id}/profile` },
    { name: "sor", title: "SOR", url: `/protected/admin/enrollments/${id}/sor` },
    { name: "assessment", title: "Assessment", url: `/protected/admin/enrollments/${id}/assessment` },
    { name: "assignment", title: "Assignment", url: `/protected/admin/enrollments/${id}/assignment` },
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
              onClick={()=> router.replace(`${tab.url}?id=${id}`)}
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
      {/* <div className="card-footer p-8pt">
      </div> */}
    </>
  );
};

export default Layout;
