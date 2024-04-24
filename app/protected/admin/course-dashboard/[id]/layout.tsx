"use client";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const tabs = [
    { name: "sections", title: "Sections", url: `/protected/admin/course-dashboard/${id}/sections` },
    {
      name: "assessments", title: "Assessments",
      url: `/protected/admin/course-dashboard/${id}/assessments`,
    },
    { name: "quizzes", title: "Quizzes", url: `/protected/admin/course-dashboard/${id}/quizzes` },
  ];

  
  return (
    <>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={{
                pathname: tab.url,
                query: { id: id, name: name },
              }}
              className={pathname.includes(tab.name) ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
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
