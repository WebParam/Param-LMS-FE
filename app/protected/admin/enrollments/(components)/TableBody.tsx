import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: CourseApplicants, index: number) => (
            <tr key={data.id} className="selected">
              <td className="text-center js-lists-values-projects small">
                {data.name}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.gender}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.age}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.homeLanguage}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.race}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.disability}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.employmentStatus ?? "N/A"}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.province}
              </td>
              <td className="text-center js-lists-values-projects small">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {data.status === 3 && (
                    <span
                      className="badge badge-warning w-100"
                      style={{
                        fontSize: "1.25em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Review Pending
                    </span>
                  )}
                  {data.status === 2 && (
                    <span
                      className="badge badge-success w-100"
                      style={{
                        fontSize: "1.25em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Completed
                    </span>
                  )}
                  {data.status === 1 && (
                    <span
                      className="badge badge-danger w-100"
                      style={{
                        fontSize: "1.25em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Deleted
                    </span>
                  )}
                  {data.status === 0 && (
                    <span
                      className="badge badge-info w-100"
                      style={{
                        fontSize: "1.25em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Enrolled
                    </span>
                  )}
                </div>
              </td>

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
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;