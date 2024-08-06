"use client";
import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: CourseApplicants[] }> = ({ list }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const isEnrollment = pathName.includes("enrollment") ? true : false;
  const { id } = useParams<{
    id: string;
  }>();

  return (
    <>
      <tbody className="list" id="staff">
        {list.length > 0 ?
          list.map((data: CourseApplicants, index: number) => (
            <tr key={data.id} className="selected">
              <td className="text-center js-lists-values-projects small">
                {data.name ?? "N/A"}  {data?.surname ?? "N/A"}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.gender ?? "N/A"}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.race ?? "N/A"}
              </td>

              <td className="text-center js-lists-values-projects small">
                {data.disability ?? "N/A"}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.employmentStatus ?? "N/A"}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.province ?? "N/A"}
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
                      Declined
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
            </tr>
          )) :  (
            <tr className="selected">
              <td
                style={{ width: "300px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              ></td>
              <td
              colSpan={10}
                style={{ width: "600px" }}
                className="text-center js-lists-values-projects small"
              >
                No Students Applications...
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              ></td>
            </tr>
          )}
      </tbody>
    </>
  );
};

export default TableBody;