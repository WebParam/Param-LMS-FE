import Link from 'next/link';
import { NextPage } from "next";
import { IStudentAnalyticDetails } from '@/app/interfaces/analytics';

const TableBody:NextPage<{list: any[]}> = ({list}) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list && list.map((data: IStudentAnalyticDetails, key) => (
          <tr key={data.studentId} className="selected">
            <td className="pr-0">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input js-check-selected-row"
                  id="customCheck1_1"
                />
                <label className="custom-control-label">
                  <span className="text-hide">Check</span>
                </label>
              </div>
            </td>

            <td className="text-center js-lists-values-projects small">
              <div className="d-flex align-items-center">
                <a href="#" >
                  <i className="material-icons mr-8pt">edit</i>
                </a>
                <a href="#" >
                  <i className="material-icons mr-8pt">delete</i>
                </a>
                <Link href={{
                      pathname: `/protected/admin/course-dashboard/${data.studentId}/sections`,
                      query: { id: data.studentId, name: data.studentName },
                    }} >
                  <i className="material-icons mr-8pt">visibility</i>
                </Link> 
                

              </div>
            </td>
            <td className="text-center js-lists-values-projects small">
              221077876
              {/*{data.studentId}*/}
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
                <div className="progress-bar-text">{data.completionRate}%</div>
              </div>
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.timeSpentOnCourse}
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.pointsCollected}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
