"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Layout({ children, params }: { children: React.ReactNode; params: {id : string} }) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();
  const router = useRouter();
  
  const baseUrl = `/protected/admin/courses/${params.id}`;
  const links = [
    { name: "Edit Course", path: baseUrl, url: `${baseUrl}?title=${name}`},
    { name: "Unit Standards", path: `${baseUrl}/modules`, url: `${baseUrl}/modules?title=${name}` },
  ];

  return (
    <>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {links.map((l: any) => (
            <a
              className={pathname === l.path ? "active" : ""}
              onClick={() => router.replace(l.url)}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{l.name}</strong>
              </span>
            </a>
          ))}          
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
