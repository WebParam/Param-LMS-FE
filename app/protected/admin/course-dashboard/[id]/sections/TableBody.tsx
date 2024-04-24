import { Api } from "@/app/lib/restapi/endpoints";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const TableBody: NextPage<{ list: any[] }> = ({list}) => {

  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };
  
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
          list.map((data: any) => (
            <tr key={data.section_title} className="selected">
              <td className={`${align.section_title} js-lists-values-projects small`}>
                {data.section}
              </td>
              <td className={`${align.time_spent} js-lists-values-projects small`}>
                {displayTime(Number(data.timeSpent))}
              </td>
              <td className={`${align.completion_rate} js-lists-values-projects small`}>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${Number(data.completionRate)}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.completionRate}
                  </div>
                </div>
              </td>
              <td className={`${align.no_of_comments} js-lists-values-projects small`}>
                {data.numberOfComments}
              </td>
              <td className={`${align.points_collected} js-lists-values-projects small`}>
                {data.pointsCollected}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
