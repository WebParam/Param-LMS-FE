import { useEffect, useState } from "react";
import QuizzesModal from "./QuizzesModal";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { generateQuizzes, getQuizzes } from "@/app/lib/actions/quiz";
import { useParams, useSearchParams } from "next/navigation";
import { Modal } from "react-bootstrap";

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [generateQuizModal, setGenerateQuizModal] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const { id: courseId, moduleId, documentId } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");

  useEffect(() => {
    setGenerateQuizModal(false);
  }, [refreshId]);

  const previewQuizzes = async (paraphraseId: string) => {
    const data = await getQuizzes(paraphraseId);

    setQuizzes(data);
    setOpenModal(true);
  }

  const generateQuizzesFn = ({ id, description }: { id: string;  description: string}) => {
    setGenerateQuizModal(true);
    generateQuizzes(id, description, courseId, moduleId, documentId, title);
  }


  return (
    <>
    <Modal 
      size="sm"
      centered
      show={generateQuizModal}
      onHide={() => setGenerateQuizModal(false)}
      backdrop={false}
      keyboard={false}
    >
      <Modal.Body>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#252525', gap: '15px'}}>
        <div className="spinner-grow text-primary" role="status"/>
        <p>
          Generating Quiz...
        </p>
      </div>
      </Modal.Body>
    </Modal>
      {openModal && (
        <div className="card mb-0">
          <QuizzesModal
            url={data.videoUrl}
            show={openModal}
            onHide={() => setOpenModal(false)}
            data={data}
            quizzes={quizzes}
          />
        </div>
      )}

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
        <td className="text-center js-lists-values-projects small">
          {data.isQuizGenerated ? (
            <button
              onClick={() => previewQuizzes(data.id)}
              className="btn btn-success rounded-pill px-4 py-2"
            >
              Preview
              <i className="material-icons ml-1">open_in_new</i>
            </button>
          ) : (
            <button
              onClick={() => generateQuizzesFn(data)}
              className="btn btn-success rounded-pill px-4 py-2"
            >
              Generate Quiz
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;