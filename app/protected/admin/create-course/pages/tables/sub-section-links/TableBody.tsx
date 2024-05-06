"use client";
import { NextPage } from "next";
const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={key} className="selected">
              <td
                style={{ width: "500px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              >
                <div
                  style={{ marginLeft: "10em" }}
                  className="d-flex align-items-center"
                >
                  <p>
                    <i className="fas fa-file-alt mr-2"></i>{" "}
                  </p>
                  <p className="text-justify">{data}</p>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small ">
                <input
                  type="text"
                  placeholder="Input link"
                  className="rounded text-center"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
