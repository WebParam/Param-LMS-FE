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
          {`${data.firstName} ${data.surname}`}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.numberOfVideosWatched}
        </td>
        <td className="text-center js-lists-values-projects small">
          {`${data.topicCompletedRate}%`}
        </td>
        <td className="text-center js-lists-values-projects small">
          <div className="d-flex align-items-center justify-content-center ">
            <Link
              href={`${pathname}/${data.studentId}/?title=${courseTitle}&studentName=${data.firstName} ${data.surname}`}
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
