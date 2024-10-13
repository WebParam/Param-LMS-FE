"use client";
import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "N/A";
  const pathname = usePathname();

  return (
    <>
      <tbody className="list" id="staff">
        {list.length > 0 ?
          list.map((data: CourseApplicants) => {
            let studentName = data.name && data.surname ? `${data.name} ${data.surname}` : "N/A";

            return (
              <tr key={data.id} className="selected">
                <td 
                         style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          width: "150px",
                        }}
                className="text-center js-lists-values-projects small">
                  {studentName}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.gender || "N/A"}
                </td>

                <td className="text-center js-lists-values-projects small">
                  {data.race || "N/A"}
                </td>

                <td className="text-center js-lists-values-projects small">
                  { data.disability.length > 15 ? `${data.disability.substring(0, 15)}` : data.disability }
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.employmentStatus || "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.province || "N/A"}
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
                        Rejected
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
                      href={`${pathname}/${data.userId}/profiles?title=${courseTitle}&studentName=${studentName}`}
                    >
                      <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                        visibility
                      </i>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          }): <>
          <tr className="selected">
         <td className="text-center js-lists-values-projects small" colSpan={10}>
          No Enrolled Students
         </td>
         
       </tr>
  
         
       
         </>}
      </tbody>
    </>
  );
};

export default TableBody;
