import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ViewLogbook from "./ViewLogbook";

const TableRow = ({ list }: { list: any }) => {
  const [viewLogbook, setViewLogbook] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (list) {
      setUrl(list.Document);
      setName(list.Name);
    }
  }, [list]);

 



  const fileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (content) {
            const blobUrl = URL.createObjectURL(new Blob([content], {type: "text/plain"}));
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };
  return (
    <>
      <ViewLogbook
        showDocumentModal={viewLogbook}
        setShowDocumentModal={setViewLogbook}
        pdfWorkerUrl={url}
        documentToView={name}
      />
      <tr className="selected">
        <td className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {list.Name || "N/A"}
            </p>
          </div>
        </td>
        <td className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {list.StudentID || "N/A"}
            </p>
          </div>
        </td>
        <td className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {list.CourseID || "N/A"}
            </p>
          </div>
        </td>
        <td className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {list.ProgramName || "N/A"}
            </p>
          </div>
        </td>
        <td className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {list.AssignedAt || "N/A"}
            </p>
          </div>
        </td>
        <td className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {list.Document || "N/A"}
          </p>
        </td>

        <td className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setViewLogbook(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
            <div onClick={fileUpload}>
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
