"use client";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const baseStudentPerfomanceUrl = `/protected/admin/courses/${courseId}/enrollments/${studentId}/student-performance`;

  const StudentPerfomanceTabs = [
    // { name: "analytics", title: "Analytics", url: `/protected/admin/enrollments/${id}/analytics` },
    // { name: "profile", title: "profile", url: `/protected/admin/enrollments/${id}/profile` },
    {
      title: "SOR",
      url: `${baseStudentPerfomanceUrl}/sor?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentPerfomanceUrl}/sor`,
    },
    {
      title: "Assessment",
      url: `${baseStudentPerfomanceUrl}/assessment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentPerfomanceUrl}/assessment`,
    },
    {
      title: "Assignment",
      url: `${baseStudentPerfomanceUrl}/assignment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentPerfomanceUrl}/assignment`,
    },
  ];

  const baseStudentdetailsUrl = `/protected/admin/courses/${courseId}/enrollments/${studentId}/student-details`;

  const StudentDetailsTabs = [
    {
      title: "Profile",
      url: `${baseStudentdetailsUrl}/profiles?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/profiles`,
    },
    {
      title: "Demographics",
      url: `${baseStudentdetailsUrl}/demographics?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/demographics`,
    },
    {
      title: "Contacts",
      url: `${baseStudentdetailsUrl}/contacts?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/contacts`,
    },
    {
      title: "Regional",
      url: `${baseStudentdetailsUrl}/regional?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/regional`,
    },
    {
      title: "Employment",
      url: `${baseStudentdetailsUrl}/employment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/employment`,
    },
    {
      title: "Documents",
      url: `${baseStudentdetailsUrl}/document?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseStudentdetailsUrl}/document`,
    },
  ];

  return (
    <>
      <div className="card p-relative mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {pathname.includes("student-performance")
            ? StudentPerfomanceTabs.map((tab) => (
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
              ))
            : StudentDetailsTabs.map((tab) => (
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
        <div
          className="card-header card-header-tabs-basic nav px-0 position-absolute right-0 mt-2 mr-2 top-10"
          role="tablist"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Details
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() =>{
                  router.push(
                    `${baseStudentPerfomanceUrl}/sor?title=${courseTitle}&studentName=${studentName}`
                  );
                
              }} >
                Student Performance
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                 router.push(
                  `${baseStudentdetailsUrl}/profiles?title=${courseTitle}&studentName=${studentName}`
                );
              }} >
                Student Details
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="card mt-3">{children}</div>
    </>
  );
}

export default Layout;
