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
                <div className="d-flex align-items-center justify-content-center ">
                  <Link
                    href={{
                      pathname: `/protected/admin/enrollments/${data.id}/analytics`,
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
                {data.name??"name"} {data.surname??"surname"}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;

