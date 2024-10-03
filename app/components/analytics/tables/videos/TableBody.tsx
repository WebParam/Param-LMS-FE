"use client";
import Link from "next/link";
import { NextPage } from "next";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const pathname = usePathname();
  const courseId = searchParams.get("id") || "";

  return (
    <>
      <tbody className="list" id="staff">
      {list.length > 0 ?
  list.map((data: any) => {

    return (
      <tr key={data.id} className="selected">
        <td className="text-center js-lists-values-projects small">
          {`${data.firstName} ${data.surname}`}
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.numberOfVideosWatched}
        </td>
        <td className="text-center js-lists-values-projects small">
          {`${data.topicCompletedRate.toFixed(2)}%`}
        </td>
        <td className="text-center js-lists-values-projects small">
          <div className="d-flex align-items-center justify-content-center ">
            <Link
              href={`/protected/admin/analytics/grouped-analytics/videos/student/${data.id}/?title=${courseTitle}&studentName=${data.firstName} ${data.surname}&id=${courseId}`}
            >
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </Link>
          </div>
        </td>
      </tr>
    );
  }) : <>
  <tr className="selected">
 <td className="text-center js-lists-values-projects small" colSpan={10}>
  No Students Vidoes Watched
 </td>
 
</tr>

 

 </>}
      </tbody>
    </>
  );
};

export default TableBody;
