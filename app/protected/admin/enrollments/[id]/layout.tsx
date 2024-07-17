"use client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    { name: "profiles", title: "Profile", url: `/protected/admin/course-applicants/${id}/profiles` },
    { name: "demographics", title: "Demographics", url: `/protected/admin/course-applicants/${id}/demographics` },
    { name: "contacts", title: "Contacts", url: `/protected/admin/course-applicants/${id}/contacts` },
    { name: "regional", title: "Regional", url: `/protected/admin/course-applicants/${id}/regional` },
    { name: "employment", title: "Employment", url: `/protected/admin/course-applicants/${id}/employment` },
    { name: "documents", title: "Documents", url: `/protected/admin/course-applicants/${id}/documents` },
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
      <div className="card-footer p-8pt">
        <button className="btn btn-primary">
        <div className="tom-select-custom" style={{background:'transparent', border:'none'}}>
          <select className="js-select form-select" style={{background:'transparent', border:'none'}}>
            <option value="">Pending review</option>
            <option value="1">Accepted</option>
          <option value="2">Rejected</option>
          </select>
        </div>
        </button>
      </div>
    </>
  );
};

export default Layout;
