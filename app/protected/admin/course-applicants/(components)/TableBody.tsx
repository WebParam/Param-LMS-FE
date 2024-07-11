import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const PASSMARK = 50;

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any) => (
            <tr key={data.id} className="selected">
              
              <td className="text-center js-lists-values-projects small">
                <div className="d-flex align-items-center">
                  <a href="#">
                    <i className="material-icons mr-8pt">edit</i>
                  </a>
                  <a href="#">
                    <i className="material-icons mr-8pt">delete</i>
                  </a>
                  <Link
                    href={{
                      pathname: `/protected/admin/course-applicants/${data.id}/profiles`,
                      query: { id: data.id, name: data.name },
                    }}
                  >
                    <i className="material-icons mr-8pt">visibility</i>
                  </Link>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.id}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.name} {data.surname}
              </td>

              <td className="text-center js-lists-values-projects small">
                    {data.title}
                    
              </td>

              <td className="text-center js-lists-values-projects small">
                <div className="align-items-center">
                {data.status === 3 && <span className="badge badge-warning " style={{ fontSize: '1.25em' }}>Review Pending</span>}
                {data.status === 2 && <span className="badge badge-success " style={{ fontSize: '1.25em' }}>Completed</span>}
                {data.status === 1 && <span className="badge badge-danger " style={{ fontSize: '1.25em' }}>Deleted</span>}
                {data.status === 0 && <span className="badge badge-info " style={{ fontSize: '1.25em' }}>Enrolled</span>}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
