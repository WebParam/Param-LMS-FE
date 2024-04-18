import { Api } from "@/app/lib/restapi/endpoints";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const TableBody: NextPage<{ list: any[] }> = () => {
  const [list, setList] = useState<any>();
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  const getSectionData = async () => {
    const getAnalytics = await Api.GET_StudentSectionAnalytics( "65e5d75f6944453739f276c3","2024139517");
    const data = getAnalytics?.map((data:any) => data.data);
    setList(data);
    console.log("Data",data);
  }

  useEffect(() => {
    getSectionData()
  },[])

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any) => (
            <tr key={data.section_title} className="selected">
              <td className={`${align.section_title} js-lists-values-projects small`}>
                {data.section_title}
              </td>
              <td className={`${align.time_spent} js-lists-values-projects small`}>
                {data.time_spent}
              </td>
              <td className={`${align.completion_rate} js-lists-values-projects small`}>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${data.completion_rate}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    {data.completion_rate}%
                  </div>
                </div>
              </td>
              <td className={`${align.no_of_comments} js-lists-values-projects small`}>
                {data.no_of_comments}
              </td>
              <td className={`${align.points_collected} js-lists-values-projects small`}>
                {data.points_collected}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
