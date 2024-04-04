import Link from 'next/link';
import { NextPage } from "next";

const TableBody:NextPage<{list: any[]}> = ({list}) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list && list.map((data: any, key) => (
          <tr key={data.student_id} className="selected">
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
                      pathname: `/protected/admin/course-dashboard/${data.student_id}/sections`,
                      query: { id: data.student_id, name: data.student_name },
                    }} >
                  <i className="material-icons mr-8pt">visibility</i>
                </Link> 
                

              </div>
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.student_id}
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.student_name}
            </td>
            <td className="text-center js-lists-values-projects small">
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${data.completion_rate}%` }}
                  ></div>
                </div>
                <div className="progress-bar-text">{data.completion_rate}%</div>
              </div>
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.time_spent}
            </td>
            <td className="text-center js-lists-values-projects small">
              {data.points_collected}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
