"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();

  const baseUrl = `/protected/admin/courses/${params.id}`;
  const links = [
    { name: "Edit Course", path: baseUrl, url: `${baseUrl}?title=${name}` },
    {
      name: "Knowledge Modules",
      path: `${baseUrl}/knowledge-modules`,
      url: `${baseUrl}/knowledge-modules?title=${name}`,
    },
    {
      name: "Practical Skills Modules",
      path: `${baseUrl}/practical-modules`,
      url: `${baseUrl}/practical-modules?title=${name}`,
    },
    {
      name: "Assessments",
      path: `${baseUrl}/assessments`,
      url: `${baseUrl}/assessments?title=${name}`,
    },
    {
      name: "Assignments",
      path: `${baseUrl}/assignments`,
      url: `${baseUrl}/assignments?title=${name}`,
    },
    {
      name: "Workbook",
      path: `${baseUrl}/workbook`,
      url: `${baseUrl}/workbook?title=${name}`,
    },
    {
      name: "Logbook",
      path: `${baseUrl}/logbook`,
      url: `${baseUrl}/logbook?title=${name}`,
    },
  ];

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card p-relative o-hidden mb-0">
          <div
            className="card-header card-header-tabs-basic nav px-0"
            role="tablist"
            style={{ display: 'flex', overflowX: 'scroll', whiteSpace: 'nowrap', width: '1400px', alignItems: 'center', scrollbarWidth: 'auto' }}
          >
            {links.map((l: any) => (
              <Link
                key={l.name}
                className={pathname === l.path ? "active" : ""}
                href={l.url}
                style={{ display: 'inline-flex', marginRight: '10px', flexShrink: 0 }}
              >
                <span className="flex d-flex flex-column">
                  <strong className="card-title">{l.name}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
