import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditKnowledgeTopicModal from "./EditKnowledgeTopicModal";
import { generateVideoScript } from "@/app/lib/actions/knowledge-elements";
import { Modal } from "react-bootstrap";

const TableRow = ({ document }: { document: any }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");
  const [isEditModal, setIsEditModal] = useState(false);
  const [generateVideoScriptModal, setGenerateVideoScriptModal] =
    useState(false);

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
    topicId: string;
  }>();

  const generateVideoScriptWithParams = generateVideoScript.bind(
    null,
    document.id,
    document.title,
    courseId,
    moduleId,
    document.id,
    title
  );

  useEffect(() => {
    setIsEditModal(false);
  }, [refreshId]);

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
      <EditKnowledgeTopicModal
        documentName={document.name}
        documentId={document.id}
        data={document}
        show={isEditModal}
        onHide={() => setIsEditModal(false)}
      />

      <Modal
        show={generateVideoScriptModal}
        onHide={() => setGenerateVideoScriptModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            height: "300px",
          }}
        >
          <div className="spinner-border text-primary" role="status" />
          <p style={{ color: "#252525" }}>Generating Video Script...</p>
        </Modal.Body>
      </Modal>
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
              {document.topicCode}
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
            {document.name}
          </p>
        </td>
        <td style={{ width: "400px" }} className="py-0">
          <form
            className="text-center my-2"
            action={generateVideoScriptWithParams}
          >
            <button
              onClick={() => setGenerateVideoScriptModal(true)}
              className="btn btn-outline-success btn-sm rounded-pill py-1 px-3"
            >
              Generate Video Script
            </button>
          </form>
        </td>
        <td style={{ cursor: "pointer", width: "700px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <Link href="#" onClick={() => setIsEditModal(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                edit
              </i>
            </Link>
            <Link
              className=""
              href={`${url}/knowledge-topic/${document.id}/topic-elements?title=${title}`}
            >
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
