"use client"
import { useEffect, useState } from "react";
import ViewLogbook from "./ViewLogbook";
import { downloadFile } from "@/app/lib/utils";

const TableRow = ({ document }: { document: any }) => {
  const [viewLogbook, setViewLogbook] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [logbookData, setLogbookData] = useState<any[]>([]);
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
    downloadFile(documentToView, filename, fileExtension, setLoading, true);
  };

  const handleAddLogbook = () => {
    const fileInput = window.document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = ".pdf,.doc,.docx,.txt"; // Specify accepted file types
    fileInput.onchange = (e: any) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (content) {
            const blobUrl = URL.createObjectURL(new Blob([content], { type: file.type }));
            setLogbookData([...logbookData, { id: logbookData.length + 1, title: file.name, url: blobUrl }]);
          }
        };
        reader.readAsArrayBuffer(file); 
      }
    };
    fileInput.click();
  };

  return (
    <>
      <ViewLogbook
        showDocumentModal={viewLogbook}
        setShowDocumentModal={setViewLogbook}
        workerUrl={pdfWorkerUrl}
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
            <div onClick={(e: any) => downloadDocument(e)}>
              {loading ? (
                <div className="spinner-border text-success" role="status" />
              ) : (
                <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                  file_download
                </i>
              )}
            </div>
            <div onClick={handleAddLogbook}>
              <i className="material-icons icon-holder--outline-success rounded-lg">
                file_upload
              </i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
