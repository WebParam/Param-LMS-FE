import { useState } from "react";
import VideoPopUpModal from "./VideoPopUpModal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { useParams, useSearchParams } from "next/navigation";
import { updateVideoLink } from "@/app/lib/actions/paraphrase";
import EditTranscriptModal from "./EditTranscriptModal";

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [url, setUrl] = useState(data.videoUrl || "");

  const {
    id: courseId,
    moduleId,
    documentId,
  } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  const submitVideoLink = async () => {
    await updateVideoLink(data.id, url, courseId, moduleId, documentId, title);
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
          defaultValue={url}
          onChange={(evt: any) => setUrl(evt.target.value)}
        />
      </td>
      <td
        style={{ width: "300px" }}
        className="text-center js-lists-values-projects small"
      >
        {!data.isSystemGenerated ? (
          <button
            className="btn btn-success rounded-pill px-4 py-2"
            onClick={() => submitVideoLink()}
          >
            Upload Link
            <i className="material-icons ml-1">publish</i>
          </button>
        ) : (
          <button
            className="btn btn-success rounded-pill px-4 py-2 ml-2"
            onClick={() => setOpenEditModal(true)}
          >
            Edit
            <i className="material-icons ml-1">edit</i>
          </button>
        )}
      </td>
      <td
        style={{ width: "300px" }}
        className="text-center js-lists-values-projects small"
      >
        <button
          onClick={() => setOpenPreviewModal(true)}
          className={`btn ${
            url.length === 0 ? "btn-secondary" : "btn-success"
          }  rounded-pill px-4 py-2`}
          disabled={url.length === 0}
        >
          Preview
          <i className="material-icons ml-1">open_in_new</i>
        </button>

        {openEditModal && (
          <div className="card mb-0">
            <EditTranscriptModal
              show={openEditModal}
              onHide={() => setOpenEditModal(false)}
              data={data}
            />
          </div>
        )}

        {openPreviewModal && (
          <div className="card mb-0">
            <VideoPopUpModal
              url={data.videoUrl}
              show={openPreviewModal}
              onHide={() => setOpenPreviewModal(false)}
              data={data}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
