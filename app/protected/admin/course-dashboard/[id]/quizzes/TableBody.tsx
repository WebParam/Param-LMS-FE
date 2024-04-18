import { Api } from "@/app/lib/restapi/endpoints";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const TableBody: NextPage<{ list: any[] }> = () => {
  const [list, setList] = useState<any>();

  const PASSMARK = 50;
  const align = {
    quiz_name: "pl-64pt text-left",
    attempts: "text-center",
    result: "text-center",
    time_spent: "text-center",
  };

  const getQuizData = async () => {
    const getAnalytics = await Api.GET_StudentQuizAnalytics( "65e5d75f6944453739f276c3","2024139517");
    const data = getAnalytics?.map((data:any) => data.data);
    setList(data);
    console.log("Data",data);
  }


  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any) => (
            <tr key={data.quiz_name} className="selected">
              <td className={`${align.quiz_name} js-lists-values-projects small`} >
                {data.quiz_name}
              </td>
              <td className={`${align.attempts} js-lists-values-projects small`} >
                {data.attempts}
              </td>
              <td className={`${align.result} js-lists-values-projects small`}>
                <div className="align-items-center">
                  {data.result >= PASSMARK ? (
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
                      {data.result}%
                    </span>
                  </a>
                </div>
              </td>
              <td className={`${align.time_spent} js-lists-values-projects small`}>
                {data.time_spent}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
