import Link from "next/link";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  return (
    <>
      <tbody className="list" id="staff">
        {list && (
          <>
            {list.length > 0 ? (
              list.map((item: any, key) => (
                <tr key={item.student_id} className="selected">
                  <td className="text-center js-lists-values-projects small">
                    {item.student_id}
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    {item.student_name}
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${item.completion_rate}%` }}
                        ></div>
                      </div>
                      <div className="progress-bar-text">
                        {item.completion_rate}%
                      </div>
                    </div>
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    {item.time_spent}
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    {item.points_collected}
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    <div className="align-items-center">
                      {item.isOnTrack ? (
                        <>
                          <a href="#" className="text-success">
                            <i className="material-icons mr-8pt">thumb_up</i>
                          </a>
                          <a href="#" className="text-70">
                            <span className="js-lists-values-employer-name text-success">
                              On Track
                            </span>
                          </a>
                        </>
                      ) : (
                        <>
                          <a href="#" className="text-danger">
                            <i className="material-icons mr-8pt">thumb_down</i>
                          </a>
                          <a href="#" className="text-70">
                            <span className="js-lists-values-employer-name text-danger">
                              Behind
                            </span>
                          </a>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="text-center js-lists-values-projects small">
                    <div className="d-flex justify-content-center align-items-center">
                      <Link
                        href={`/protected/admin/analytics/graphs/${item.student_id}/course?title=${title}&studentName=${item.student_name}`}
                      >
                        <i className="material-icons mr-8pt text-center">
                          visibility
                        </i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="selected">
                <td className="text-center js-lists-values-projects small" colSpan={10}>
                  No Course Students Activity
                </td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </>
  );
};

export default TableBody;
