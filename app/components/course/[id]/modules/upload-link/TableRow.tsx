import Link from "next/link";
import { useState } from "react";
import VideoPopUpModal from "./VideoPopUpModal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { useParams, useSearchParams } from "next/navigation";
import { updateVideoLink } from "@/app/lib/actions/paraphrase";

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [url, setUrl] = useState(data.videoUrl);
  
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
        <button
          className="btn btn-success rounded-pill px-4 py-2"
          onClick={() => submitVideoLink()}
        >
          Upload Link
          <i className="material-icons ml-1">publish</i>
        </button>
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
              url={data.videoUrl}
              show={openModal}
              onHide={() => setOpenModal(false)}
              data={data}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
