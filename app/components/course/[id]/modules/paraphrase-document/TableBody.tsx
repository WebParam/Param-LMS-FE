"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "./Modal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { Modal } from "react-bootstrap";
import { useParams } from "next/navigation";
import { generateAudio } from "@/app/lib/actions/paraphrase";
import { useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => <TableRow data={data} key={key} />)}
      </tbody>
    </>
  );
};

export default TableBody;

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [closeLoader, setCloseLoader] = useState(false);
  const searchParams = useSearchParams();
  const title = searchParams.get("title")
  const {
    id: courseId,
    moduleId,
    documentId,
  } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();

  useEffect(() => {
    if (data.status) {
      setCloseLoader(false);
    }
  }, [data]);

  const Audiogenerator = async (id: string, text: string) => {
    const payload = {
      paraphraseId: id,
      text: text,
      courseId,
      documentId,
      moduleId,
      documentTitle: title,
    };

    await generateAudio(payload);
  };

  return (
    <>
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
            <p className="text-justify">{data.title}</p>
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
        <td
          onClick={() => Audiogenerator(data.id, data.description)}
          className="text-center js-lists-values-projects small"
        >
          <button className="btn btn-success rounded-pill px-4 py-2">
            Generate Audio
          </button>
        </td>
        <td
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
          className="text-center js-lists-values-projects small"
        >
          <i className="material-icons mr-8pt">edit</i>
        </td>
      </tr>
    </>
  );
};
