import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const PASSMARK = 50;

  const people = [
    { name: "Alice", surname: "Smith" },
    { name: "Bob", surname: "Johnson" },
    { name: "Charlie", surname: "Williams" },
    { name: "Diana", surname: "Jones" },
    { name: "Edward", surname: "Brown" },
    { name: "Fiona", surname: "Davis" },
    { name: "George", surname: "Miller" },
    {name:"Maxwell", surname:"mhlanga"}
  ];

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, index:number) => (
            <tr key={data.id} className="selected">
              
              <td className="text-center js-lists-values-projects small">
                <div className="d-flex align-items-center justify-content-center ">
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
                {data.id.substring(0, 5)}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.name||people[index % people.length]?.name} {data.surname||people[index % people.length]?.surname}
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
