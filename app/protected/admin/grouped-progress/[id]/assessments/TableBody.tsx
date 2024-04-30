import { IStudentAssessmentAverage } from "@/app/interfaces/analytics";
import { NextPage } from "next";

const TableBody: NextPage<{ list: IStudentAssessmentAverage[] }> = ({ list }) => {
  const PASSMARK = 50;
  const align = {
    assessment_name: "pl-64pt text-left",
    attempts: "text-center",
    result: "text-center",
    time_spent: "text-center",
  };

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: IStudentAssessmentAverage) => (
            <tr key={data.assessmentName} className="selected">
              <td className={`${align.assessment_name} js-lists-values-projects small`}>
                {data.assessmentName}
              </td>
              <td className={`${align.attempts} js-lists-values-projects small`}>
                {data.averageAttempts}
              </td>
              <td className={`${align.result} js-lists-values-projects small`}>
                <div className="align-items-center">
                  {data.averageResults >= PASSMARK ? (
                    <a href="#" className="text-success">
                      <i className="material-icons mr-8pt">check_circle</i>
                    </a>
                  ) : (
                    <a href="#" className="text-danger">
                      <i className="material-icons mr-8pt">cancel</i>
                    </a>
                  )}

                  <a href="" className="text-70">
                    <span className="js-lists-values-employer-name">
                      {data.averageResults}%
                    </span>
                  </a>
                </div>
              </td>
              <td className={`${align.time_spent} js-lists-values-projects small`}>
                {data.averageTimeSpent}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
