"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Layout({ children, params }: { children: React.ReactNode; params: {id : string} }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const pathname = usePathname();
  
  const baseUrl = `/protected/admin/moderator-feedback/pages`;
  const links = [
    { name: "Assessments", path: `${baseUrl}/assessments`, url: `${baseUrl}/assessments?title=Assessments Feedback&page=grouped&homeTitle=Facilitator Dashboard&button-title=Dashboard`},
    { name: "Assignments", path: `${baseUrl}/assignments`, url: `${baseUrl}/assignments?title=Assignments Feedback&page=grouped&homeTitle=Facilitator Dashboard&button-title=Dashboard` },
  ];


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
