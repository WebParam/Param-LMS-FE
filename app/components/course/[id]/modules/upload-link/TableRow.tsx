import Link from "next/link";
import { useState } from "react";
import VideoPopUpModal from "./VideoPopUpModal";

const TableRow = ({ data }: { data: any }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const modalData = {
      title: data,
      text: "HTML documents follow a basic structure consisting of an opening <html> tag, containing <head> and <body> sections. The head typically includes metadata like title and links to CSS or JavaScript files, while the body contains the visible content of the page",
    };
  
    return (
      <tr className="selected">
        <td
          style={{ width: "500px" }}
          className="text-center mx-auto text-justify js-lists-values-projects small"
        >
          <div
            style={{ marginLeft: "10em" }}
            className="d-flex align-items-center"
          >
            <p className="text-justify">{data.title}</p>
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
          <Link className="btn btn-success rounded-pill px-4 py-2" href="#">
            Upload Link
            <i className="material-icons ml-1">publish</i>
          </Link>
        </td>
        <td
          style={{ width: "300px" }}
          className="text-center js-lists-values-projects small"
        >
          <Link
            onClick={() => setOpenModal(true)}
            className="btn btn-success rounded-pill px-4 py-2"
            href="#"
          >
            Preview
            <i className="material-icons ml-1">open_in_new</i>
          </Link>
          {openModal && (
            <div className="card mb-0">
              <VideoPopUpModal
                show={openModal}
                onHide={() => setOpenModal(false)}
                data={modalData}
              />
            </div>
          )}
        </td>
      </tr>
    );
};
  
export default TableRow;
