"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Layout({ children, params }: { children: React.ReactNode; params: {id : string} }) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();
  const router = useRouter();
  
  const baseUrl = `/protected/admin/assessments-assignments/pages`;
  const links = [
    { name: "Assessments", path: `${baseUrl}/assessments`, url: `${baseUrl}/assessments?title=Mark%20Assessments`},
    { name: "Assignments", path: `${baseUrl}/assignments`, url: `${baseUrl}/assignments?title=Mark%20Assignments` },
  ];

  const path = "assessments" ?? "assignments"

  return (
    <>
     { 
     pathname.includes(`/protected/admin/assessments-assignments/pages/${path}/`) &&
     pathname.includes("/grade-assessments") &&
     <div className="card p-relative o-hidden mb-2">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          
          {links.map((l: any) => (
            <Link
              className={pathname === l.path ? "active" : ""}
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