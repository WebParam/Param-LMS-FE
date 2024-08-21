"use client";
import Link from "next/link";
import { NextPage } from "next";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import { usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const pathname = usePathname();

  return (
    <>
      <tbody className="list" id="staff">
      {list &&
  list.map((data: any) => {

    return (
      <tr key={data.studentId} className="selected">
        <td className="text-center js-lists-values-projects small">
          {data.fullName}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.assessmentDate ?? "N/A"}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.subject ?? "N/A"}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.grade ?? "N/A"}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.instructor ?? "N/A"}
        </td>
        <td className="text-center js-lists-values-projects small">
          <div className="d-flex align-items-center justify-content-center ">
            <Link
              href={`${pathname}/${data.studentId}/?subject=${data.subject}&studentName=${data.fullName}`}
            >
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </Link>
          </div>
        </td>
      </tr>
    );
  })}
      </tbody>
    </>
  );
};

export default TableBody;
