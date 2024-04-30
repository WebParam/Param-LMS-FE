import { NextPage } from "next";
const TableBody: NextPage<{ list: any[] }> = ({ list }) => {

  const PASSMARK = 50;
  const align = {
    quiz_name: "pl-64pt text-left",
    attempts: "text-center",
    result: "text-center",
    time_spent: "text-center",
  };

  function displayTime(seconds: number) {
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
          list.map((data: any) => (
            <tr key={data?.quizName} className="selected">
              <td className={`${align.quiz_name} js-lists-values-projects small`} >
                {data?.quizName}
              </td>
              <td className={`${align.attempts} js-lists-values-projects small`} >
                {data?.attempts}
              </td>
              <td className={`${align.result} js-lists-values-projects small`}>
                <div className="align-items-center">
                  {data?.results >= PASSMARK ? (
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
                      {data?.results}%
                    </span>
                  </a>
                </div>
              </td>
              <td className={`${align.time_spent} js-lists-values-projects small`}>
                {displayTime(Number(data?.timeSpent))}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
