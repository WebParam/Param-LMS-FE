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
              <tr key={data.id} className="selected">
                <td className="text-center js-lists-values-projects small">
                  {data.fullName}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placedAt ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.companyName ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.companyLocation ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placedAtDate ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.industry ?? "N/A"}
                </td>
              
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
