"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "react-bootstrap";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; workbookId: string };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();
  const isWorkbook = pathname === `/protected/admin/courses/0/workbook/0`;
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
    { name: "Workbook", path: `${baseUrl}/workbook`, url: `${baseUrl}/workbook?title=${name}` },
  ];

  return (
    <>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0 d-flex justify-content-between"
          role="tablist"
        >
          <div>
            {!isWorkbook &&
              links.map((l) => (
                <Link
                  key={l.path}
                  className={pathname === l.path ? "active" : ""}
                  href={l.url}
                >
                  <span className="flex d-flex flex-column">
                    <strong className="card-title">{l.name}</strong>
                  </span>
                </Link>
              ))}
          </div>
          {isWorkbook && (
            <div className="ms-auto">
              
              <button className="btn btn-success">
                Download
              </button>
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
