import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";

export default function PageHeader() {
  const pathname = usePathname();
  const cookies = new Cookies();
  const courseTitle = cookies.get("courseTitle");
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0 justify-content-between">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">Enrollment Table</h2>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{courseTitle}</li>
              </ol>
            </div>
           <div className="d-flex justify-content-center align-items-center">
              {pathname == '/protected/admin/enrollments' && <button className="btn btn-primary">
                <Link href="/protected/admin/course-applicants">Course Applicants</Link>
              </button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



