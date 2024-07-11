import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditKnowledgeTopicModal from "./EditKnowledgeTopicModal";
import { Modal } from "react-bootstrap";

const TableRow = ({ document }: { document: any }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");
  const [isEditModal, setIsEditModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProgress, setIsProgress] = useState(false);
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

  useEffect(() => {
    setIsEditModal(false);
  }, [refreshId]);

  const generateVideoScriptWithProgress = async (e: any) => {
    e.preventDefault();
    const data = JSON.stringify({
      documentId: document.id,
      documentTitle: document.title,
      courseId,
      moduleId,
      title,
    });

    try {
      setProgress(25);
      const response = await fetch("/api/generate-video-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is null");
      }
      const blob = await response.blob();

      // Get the size of the blob
      const totalLength = blob.size;

      console.log(`Content-Length: ${totalLength} bytes`);

      // Optionally, convert the blob to text or other formats if needed
      const text = await blob.text();
      let loaded = 0,
        estimatedTotal = 0;

      const push = async () => {
        if (!reader) {
          throw new Error("Reader is undefined");
        }
        const { done, value } = await reader.read();
        if (done) {
          console.log("Done");
          return;
        }

        loaded += value.length;
        estimatedTotal += value.length; // Estimate total size incrementally

        const progress = Math.min(
          Math.round((loaded / estimatedTotal) * 100),
          100
        );
        setProgress(progress);

        push();
      };

      push().catch((err) => {
        console.error("Stream reading error:", err);
      });
    } catch (e: any) {
      console.log("Error Generating Video Script");
      setProgress(100);
      setTimeout(() => {
        setIsProgress(false);
      }, 7000);
    }
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
          <div className="text-center my-2">
            {isProgress ? (
              <button
                type="button"
                className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 w-100"
              >
                <div className="progress-container w-100 my-1">
                  <div className="progress-bar w-100">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  try {
                    e.preventDefault();
                    setIsProgress(true);
                    generateVideoScriptWithProgress(e);
                  } catch (e: any) {
                    console.log("Error Generating Video Script");
                  }
                }}
                className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 w-100"
              >
                Generate Video Script
              </button>
            )}
          </div>
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
