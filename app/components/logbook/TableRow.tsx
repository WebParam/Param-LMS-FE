"use client"
import { useEffect, useState } from "react";
import ViewLogbook from "./ViewLogbook";
import { downloadFile } from "@/app/lib/utils";

const TableRow = ({ document }: { document: any }) => {
  const [viewLogbook, setViewLogbook] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const documentToView = 'https://khumla-dev-assessment-read.azurewebsites.net/api/v1/StudentAnswers/DownloadStudentAsssessment/54670932456yu';
  const pdfVersion = "3.10.111";
  const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;
  useEffect(() => {
    if (document) {
      setUrl(document.url);
      setName(document.name);
    }
  }, [document]);

  const downloadDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filename = "document";
    const fileExtension = "pdf";
    const status = 3;
    const url = `${documentToView}`;
    downloadFile(url, filename, fileExtension, setLoading,true);
  };
  return (

    
    <>

<ViewLogbook
  showDocumentModal = {viewLogbook}
  setShowDocumentModal={setViewLogbook}
  pdfWorkerUrl={pdfWorkerUrl}
  documentToView={documentToView}
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
            }}
          >
            {document.courseName || "N/A"}
          </p>
        </td>
        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {document.placedAt || "N/A"}
          </p>
        </td>
        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {document.jobRole || "N/A"}
          </p>
        </td>


        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {document.placedDate || "N/A"}
          </p>
        </td>



        <td style={{ width: "700px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setViewLogbook(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
            <div onClick={(e:any) => downloadDocument(e)}>
              {loading ? (
              <div className="spinner-border text-success" role="status" />
            ) : (
              <i className="material-icons icon-holder--outline-success rounded-lg">
              file_download
            </i>
            )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
