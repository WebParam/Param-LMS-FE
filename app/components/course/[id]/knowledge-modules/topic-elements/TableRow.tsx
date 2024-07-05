import { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "./Modal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { Badge, Modal } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import CopyButton from "./CopyIcon";

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [closeLoader, setCloseLoader] = useState(false);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [audioGenerateModal, setAudioGenerateModal] = useState(false);

  useEffect(() => {
    setAudioGenerateModal(false);
    setCloseLoader(false);
  }, [refreshId]);

  return (
    <>
      <Modal
        show={audioGenerateModal}
        onHide={() => setAudioGenerateModal(false)}
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
          <p style={{ color: "#252525" }}>Generating Audio...</p>
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

      <MyVerticallyCenteredModal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
        data={data}
        setCloseLoader={setCloseLoader}
      />

      <tr className="selected">
        <td
          style={{ width: "200px" }}
          className="text-center mx-auto text-justify js-lists-values-projects small"
        >
          <div className="d-flex align-items-center ml-5">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "350px",
              }}
              className="text-justify"
            >
              {data.description}
            </p>
          </div>
        </td>
        <td className="text-center js-lists-values-projects small">
          {data.status ? (
            <button className="btn btn-success rounded-pill px-4 py-2">
              Confirmed
            </button>
          ) : (
            <button className="btn btn-outline-success rounded-pill px-4 py-2">
              Pending
            </button>
          )}
        </td>
        <td className="text-center js-lists-values-projects small">
          <button
            onClick={() => console.log("")}
            className="btn btn-success rounded-pill px-4 py-2"
          >
            Generate Video Script
          </button>

          {data.audioBlobUrl && (
            <Badge pill bg="warning" className="success ml-2">
              Generated
            </Badge>
          )}
        </td>
        <td
          style={{ cursor: "pointer" }}
          className="text-center js-lists-values-projects small"
        >
          <div className="d-flex">
            <i
              className="material-icons mr-8pt"
              onClick={() => setOpenModal(true)}
            >
              edit
            </i>
            <CopyButton textToCopy={data.description} />
          </div>
        </td>
      </tr>
    </>
  );
};
export default TableRow;
