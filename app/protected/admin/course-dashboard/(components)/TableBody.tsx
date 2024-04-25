import Link from "next/link";
import { NextPage } from "next";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const PASSMARK = 50;

  function displayTime(seconds:number) {
    if (seconds >= 3600) {
        let hours = Math.floor(seconds / 3600);
        return hours + " hour(s)";
    } else if (seconds >= 60) {
        let minutes = Math.floor(seconds / 60);
        return minutes + " minute(s)";
    } else {
        return seconds + " second(s)";
    }
}

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={data.studentId} className="selected">
              
              <td className="text-center js-lists-values-projects small">
                <div className="d-flex align-items-center">
                  <a href="#">
                    <i className="material-icons mr-8pt">edit</i>
                  </a>
                  <a href="#">
                    <i className="material-icons mr-8pt">delete</i>
                  </a>
                  <Link
                    href={{
                      pathname: `/protected/admin/course-dashboard/${data.studentId}/sections`,
                      query: { id: data.studentId, name: data.studentName },
                    }}
                  >
                    <i className="material-icons mr-8pt">visibility</i>
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
                      style={{ width: `${data.completionRate}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {Number(data.completionRate).toFixed(0)}%
                  </div>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small">
                {displayTime(Number(data.timeSpentOnCourse))}
              </td>
              <td className="text-center js-lists-values-projects small">
                {data.pointsCollected}
              </td>
              <td className="text-center js-lists-values-projects small">
                <div className="align-items-center">
                  {data.completionRate >= PASSMARK ? (
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
