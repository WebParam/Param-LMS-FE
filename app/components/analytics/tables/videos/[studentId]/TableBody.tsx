"use client";
import Link from "next/link";
import { NextPage } from "next";
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
          {data.topicTitle}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.videoTitle}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.timeSpent}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.totalVideoTime}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.isCompleted ? "Completed" : "Incomplete"}
        </td>
      </tr>
    );
  })}
      </tbody>
    </>
  );
};

export default TableBody;
