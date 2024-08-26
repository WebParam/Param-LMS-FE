import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewLogbook from "./ViewLogbook";

const TableRow = ({ document }: { document: any }) => {
  const [viewLogbook, setViewLogbook] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (document) {
      setUrl(document.url);
      setName(document.name);
    }
  }, [document]);

  return (
    <>

<ViewLogbook
  showDocumentModal = {viewLogbook}
  setShowDocumentModal={setViewLogbook}
  pdfWorkerUrl={url}
  documentToView={name}
/>
      <tr className="selected">
        <td style={{ width: "250px" }} className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "250px",
              }}
            >
              {document.name || "N/A"}
            </p>
          </div>
        </td>
        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "300px",
            }}
          >
            {document.randomCode || "N/A"}
          </p>
        </td>

        <td style={{ width: "700px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setViewLogbook(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
            <div onClick={() => {}}>
              <i className="material-icons icon-holder--outline-success rounded-lg">
                file_download
              </i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
