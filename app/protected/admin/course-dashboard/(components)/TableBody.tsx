import Link from "next/link";
import { NextPage } from "next";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={data.studentId} className="selected">
              
              <td className="text-center js-lists-values-projects small">
                <div className="d-flex justify-content-center align-items-center">
                
                  <Link
                    href={`/protected/admin/course-dashboard/graphs/${data.studentId}/course?studentname=${data.studentName}`}
                  >
                    <i className="material-icons mr-8pt text-center">visibility</i>
                  </Link>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.studentId}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.studentName}
              </td>
              <td className="text-center js-lists-values-projects small">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${data.completion}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.completion}%
                  </div>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.timespent}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.pointsCollected}
              </td>
              <td className="text-center js-lists-values-projects small">
                <div className="align-items-center">
                  {data.isOnTrack ? (
                    <>
                      <a href="#" className="text-success">
                        <i className="material-icons mr-8pt">thumb_up</i>
                      </a>
                      <a href="" className="text-70">
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
                      <a href="" className="text-70">
                        <span className="js-lists-values-employer-name text-danger">
                          Behind
                        </span>
                      </a>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
