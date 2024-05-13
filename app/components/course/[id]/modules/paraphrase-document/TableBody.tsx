import { NextPage } from "next";
import Button from "./Button";
import { Dispatch } from "react";
const TableBody: NextPage<{ list: any[]; viewModal: Dispatch<any> }> = ({
  list,
  viewModal,
}) => {
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
                <Button
                  classes="btn btn-outline-success rounded-pill px-4 py-2"
                  text="Pending"
                />
              </td>
              <td
                onClick={() => viewModal(true)}
                className="text-center js-lists-values-projects small"
              >
                <i className="material-icons mr-8pt">edit</i>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
