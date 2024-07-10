import { useEffect, useState } from "react";
import EditTopicElement from "./EditTopicElement";
import { Badge, Modal } from "react-bootstrap";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import CopyButton from "./CopyIcon";
import { generateVideoScript } from "@/app/lib/actions/knowledge-elements";

const TableRow = ({ data }: { data: any }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [closeLoader, setCloseLoader] = useState(false);
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");
  const [generateVideoScriptModal, setGenerateVideoScriptModal] =
    useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    id: courseId,
    moduleId,
    topicId,
  } = useParams<{
    id: string;
    moduleId: string;
    topicId: string;
  }>();

  const generateVideoScriptWithParams = generateVideoScript.bind(
    null,
    data.id,
    data.title,
    courseId,
    moduleId,
    topicId,
    title
  );

  useEffect(() => {
    setGenerateVideoScriptModal(false);
    setCloseLoader(false);
  }, [refreshId]);

  return (
    <>
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

      <Modal
        show={closeLoader}
        onHide={() => setCloseLoader(false)}
        centered
        backdrop={false}
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
          <p style={{ color: "#252525" }}>Saving Your changes...</p>
        </Modal.Body>
      </Modal>

      <EditTopicElement
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
        data={data}
        setCloseLoader={setCloseLoader}
      />

      <tr className="selected">
        <td style={{ width: "350px" }} className="py-0">
          <div className="d-flex justify-content-center align-items-center">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "350px",
              }}
              className="text-center my-2"
            >
              {data.elementCode}
            </p>
          </div>
        </td>
        <td style={{ width: "350px" }} className="py-0">
          <div className="d-flex justify-content-center align-items-center">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "350px",
              }}
              className="text-center my-2"
            >
              {data.title}
            </p>
          </div>
        </td>
        <td style={{ cursor: "pointer" }} className="py-0">
          <div className="text-center">
            <i
              className="material-icons mr-8pt"
              onClick={() => setOpenModal(true)}
            >
              edit
            </i>
          </div>
        </td>
        <td className="py-0">
          <div className="text-center">
            <CopyButton textToCopy={data.videoScript} />
          </div>
        </td>
      </tr>
    </>
  );
};
export default TableRow;
