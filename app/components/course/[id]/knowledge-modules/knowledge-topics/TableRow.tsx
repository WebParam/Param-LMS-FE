import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditKnowledgeTopicModal from "./EditKnowledgeTopicModal";

const TableRow = ({ document }: { document: any }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const refreshId = searchParams.get("refreshId");
  const [isEditModal, setIsEditModal] = useState(false);

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");

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
            className="btn btn-success rounded-pill px-4 py-2 mr-2"
            onClick={() => setIsEditModal(true)}
          >
            Edit
          </button>
          <Link
            className="btn btn-success rounded-pill px-4 py-2"
            href={`${url}/knowledge-topic/${document.id}/topic-elements?title=${title}`}
          >
            View
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
