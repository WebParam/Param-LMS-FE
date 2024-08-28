"use client";
import { NextPage } from "next";
const TableBody: NextPage<{ list: any }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any) => {
            return (
              <tr key={data.id} className="selected">
                <td className="text-center js-lists-values-projects small">
                  {data.studentName}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.jobRole ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placementStatus ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.startDate ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.endDate ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placementLocation ?? "N/A"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
