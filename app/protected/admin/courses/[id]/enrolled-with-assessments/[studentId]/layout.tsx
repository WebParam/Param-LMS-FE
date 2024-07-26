"use client";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const baseLayoutUrl = `/protected/admin/courses/${courseId}/enrollments/${studentId}`;

  const tabs = [
    // { name: "analytics", title: "Analytics", url: `/protected/admin/enrollments/${id}/analytics` },
    // { name: "profile", title: "profile", url: `/protected/admin/enrollments/${id}/profile` },
    {
      title: "SOR",
      url: `${baseLayoutUrl}/sor?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/sor`,
    },
    {
      title: "Assessment",
      url: `${baseLayoutUrl}/assessment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/assessment`,
    },
    {
      title: "Assignment",
      url: `${baseLayoutUrl}/assignment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/assignment`,
    },
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
              key={tab.title}
              href={tab.url}
              className={pathname == tab.path ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{ cursor: "pointer" }}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card mt-3">{children}</div>
    </>
  );
}

export default Layout;
