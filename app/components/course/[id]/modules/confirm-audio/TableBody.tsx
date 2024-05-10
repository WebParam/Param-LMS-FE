"use client";
import { NextPage } from "next";
import { useState } from "react";
const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const [playPause, setPlayPause] = useState<boolean>(false);
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={key} className="selected">
              <td
                style={{ width: "200px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              >
                <div className="d-flex align-items-center ml-5">
                  <p className="text-justify">{data}</p>
                </div>
              </td>
              <td className="text-center js-lists-values-projects small">
                <i
                  onClick={(prev) => setPlayPause(!prev)}
                  id="playPauseIcon"
                  className="material-icons mr-8pt"
                >
                  {playPause ? "play_arrow" : "pause"}
                </i>
              </td>
              <td className="text-center js-lists-values-projects small cursor-pointer">
                <i
                  onClick={(prev) => setPlayPause(!prev)}
                  id="playPauseIcon"
                  className="material-icons mr-8pt"
                >
                  <i className="material-icons mr-8pt">file_download</i>
                </i>
              </td>
              <td className="text-center js-lists-values-projects small ">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
