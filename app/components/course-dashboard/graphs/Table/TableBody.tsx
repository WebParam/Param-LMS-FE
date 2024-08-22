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
                  {data.fullName}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placedAt ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.companyName ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.companyLocation ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.placedAtDate ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.industry ?? "N/A"}
                </td>
                {/* <td className="text-center js-lists-values-projects small">
                  {data.dateRange ?? "N/A"}
                </td> */}
                <td className="text-center js-lists-values-projects small">
                  {data.placementStatus ?? "N/A"}
                </td>
                <td className="text-center js-lists-values-projects small">
                  {data.jobRole ?? "N/A"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};

export default TableBody;
