import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDocument } from "@/app/interfaces/course-document";
import { paraphraseDocument } from "@/app/lib/actions/document";
import { useState } from "react";
import DocumentModal from "./DocumentModal";

const TableRow = ({ document }: { document: IDocument }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [modalShow, setModalShow] = useState(false);

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");

  const paraphrase = async (documentId: string, documentUrl: string) => {
    try {
      await paraphraseDocument(documentId, documentUrl);
    } catch (err) {
      console.log(err);
    }
    router.push(
      `${url}/document/${documentId}/paraphrase-document?title=${title}`
    );
  };

  const toPercent = ({
    noOfConfirmedParapharases,
    noOfParapharases,
  }: {
    noOfConfirmedParapharases: number;
    noOfParapharases: number;
  }) => {
    if (noOfConfirmedParapharases == 0 && noOfParapharases == 0) return 0;
    return (noOfConfirmedParapharases / noOfParapharases) * 100;
  };
  
  return (
    <>
      <DocumentModal
        documentId={document.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <tr className="selected">
        <td
          style={{ width: "300px" }}
          className="text-center mx-auto text-justify js-lists-values-projects small"
        >
          <div className="d-flex align-items-center ml-5">
            <p>
              <i className="material-icons ">file_present</i>
            </p>
            <p
              className="text-justify"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "350px",
              }}
            >
              {document.name}
            </p>
          </div>
        </td>
        <td
          style={{ width: "200px" }}
          className="text-center js-lists-values-projects small"
        >
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${toPercent(document)}%`,
                }}
              ></div>
            </div>
            <div className="progress-bar-text">
              {document.noOfConfirmedParapharases} / {document.noOfParapharases}
            </div>
          </div>
        </td>
        <td
          style={{ width: "300px" }}
          className="text-center js-lists-values-projects small"
        >
          <button
            className={`btn ${
              !document.isSystemGenerated ? "btn-success" : "btn-secondary"
            } rounded-pill px-4 py-2`}
            onClick={() => setModalShow(true)}
            disabled={document.isSystemGenerated}
          >
            Preview File
          </button>
        </td>
        <td
          style={{ width: "300px" }}
          className="text-center js-lists-values-projects small"
        >
          <button
            className="btn btn-success rounded-pill px-4 py-2 mr-2"
            onClick={() => console.log("Edit Document Name")}
          >
            Edit
          </button>

          {document.status === "GeneratedParaphrase" ? (
            <Link
              className="btn btn-success rounded-pill px-4 py-2"
              href={`${url}/document/${document.id}/paraphrase-document?title=${title}`}
            >
              View
            </Link>
          ) : (
            <button
              className="btn btn-success rounded-pill px-4 py-2"
              onClick={() => paraphrase(document.id, document.fileBlobUrl)}
            >
              Paraphase
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
