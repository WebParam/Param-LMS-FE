"use client";
import { NextPage } from "next";
import TableRow from "./TableRow";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list.length > 0 ? 
          list.map((data: any) => <TableRow key={data.id} list={data} />): (
            <tr className="selected">
              <td
                style={{ width: "300px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              ></td>
              <td
                style={{ width: "600px" }}
                className="text-center js-lists-values-projects small"
              >
                No Document Files...
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              ></td>
            </tr>
          )}
      </tbody>
    </>
  );
};

export default TableBody;
