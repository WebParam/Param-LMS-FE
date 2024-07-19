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
                      pathname: `/protected/admin/enrollments/${data.id}/sor`,
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
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;

