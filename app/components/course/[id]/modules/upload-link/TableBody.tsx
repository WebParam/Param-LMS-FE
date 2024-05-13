"use client";
import { NextPage } from "next";
import Link from "next/link";

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
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              >
                <Link
                  className="btn btn-success rounded-pill px-4 py-2"
                  href="#"
                >
                  Upload Link
                  <i className="material-icons ml-1">publish</i>
                </Link>
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              >
                <Link
                  className="btn btn-success rounded-pill px-4 py-2"
                  href="#"
                >
                  Preview
                  <i className="material-icons ml-1">open_in_new</i>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
