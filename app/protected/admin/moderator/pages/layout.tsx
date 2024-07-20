"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Layout({ children, params }: { children: React.ReactNode; params: {id : string} }) {
  const searchParams = useSearchParams();
  const [tabName, setTabName] = useState<string>("Pending");
  const [pageTitle, setPageTitle] = useState<string>("");
  const page = searchParams.get("page");
  const title = searchParams.get("title");

  const pathname = usePathname();

  const assessmentBaseUrl = `/protected/admin/moderator/pages`;
  const links = [
    {
      name: "Pending",
      path: `Pending`,
      url: `${assessmentBaseUrl}/${pageTitle}?${pageTitle === "assessment" ? "title=Mark%20Assessments" : "title=Mark%20Assignments"}&page=grouped&homeTitle=HOME`
    },
    {
      name: "Completed",
      path: `Completed`,
      url: `${assessmentBaseUrl}/${pageTitle}?${pageTitle === "assessment" ? "title=Mark%20Assessments" : "title=Mark%20Assignments"}&page=grouped&homeTitle=HOME`
    }
  ];

  useEffect(() => {
    if (title == "Mark Assessments") {
      setPageTitle("assessment");
      return;
    }
    setPageTitle("assignments");
  }, [title]);



  return (
    <>
     { 
  page &&
     <div className="card p-relative o-hidden mb-2">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          
          {links.map((l: any) => (
            <Link
            onClick={() => setTabName(l.path)}
              className={tabName === l.path ? "active" : tabName === l.path ? "active" : ""}
              href={l.url}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{l.name}</strong>
              </span>
            </Link>
          ))}          
        </div>
      </div>}
      {children}
    </>
  );
}

export default Layout;
