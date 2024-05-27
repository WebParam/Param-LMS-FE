import { NextPage } from "next";
import Button from "./Button";
import { useState } from "react";
import MyVerticallyCenteredModal from "./Modal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => <TableRow data={data} key={key} />)}
      </tbody>
    </>
  );
};

export default TableBody;

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <MyVerticallyCenteredModal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
        data={data}
      />

      <tr className="selected">
        <td
          style={{ width: "200px" }}
          className="text-center mx-auto text-justify js-lists-values-projects small"
        >
          <div className="d-flex align-items-center ml-5">
            <p className="text-justify">{data.title}</p>
          </div>
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.status ? (
            <button className="btn btn-success rounded-pill px-4 py-2">
              Confirmed
            </button>
          ) : (
            <button className="btn btn-outline-success rounded-pill px-4 py-2">
              Pending
            </button>
          )}
        </td>
        <td
          onClick={() => setOpenModal(true)}
          className="text-center js-lists-values-projects small"
        >
          <i className="material-icons mr-8pt">edit</i>
        </td>
      </tr>
    </>
  );
};
