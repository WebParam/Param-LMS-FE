import { IStudentSectionAverage } from "@/app/interfaces/analytics";
import { NextPage } from "next";

const TableBody: NextPage<{ list: IStudentSectionAverage[] }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: IStudentSectionAverage) => (
            <tr key={data.sectionName} className="selected">
              <td className={`${align.section_title} js-lists-values-projects small`}>
                {data.sectionName}
              </td>
              <td className={`${align.completion_rate} js-lists-values-projects small`}>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${data.averageCompletionRate}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.averageCompletionRate}%
                  </div>
                </div>
              </td>
              <td className={`text-center js-lists-values-projects small`}>
                {data.averageTimeSpent}
              </td>
              <td className={`text-center js-lists-values-projects small`}>
                {data.averagePoints}
              </td>
              <td className={`${align.completion_rate} js-lists-values-projects small`}>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${data.activeStudents}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.activeStudents}%
                  </div>
                </div>
              </td>
              <td className={`${align.no_of_comments} js-lists-values-projects small`}>
                {data.questionsLauched}
              </td>
              <td className={`${align.points_collected} js-lists-values-projects small`}>
                {data.notes}
              </td>
              <td className={`${align.completion_rate} js-lists-values-projects small`}>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${data.downloadedResources}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.downloadedResources}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
