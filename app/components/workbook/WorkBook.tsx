import Link from "next/link";

type Props = {
  id: string;
  name: string;
  moduleCode: string;
  description: string;
  url: string;
};
import { removeTags } from "@/app/lib/utils";
//import EditPracticalModuleModal from "./EditPracticalModuleModal";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "react-bootstrap";
import PreviewQuestionsModal from "./PreviewQuestionsModal";

export default function Workbook({
  id,
  name,
  moduleCode,
  description,
  url,
}: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewQuizModal, setViewQuestionModal] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  useEffect(() => {
    setIsEditModal(false);
    setDeleteModal(false);
  }, [refreshId]);

  const mockQuestions = [
    {
      id: 1,
      description: "<p>What is the capital of France?</p>",
      questionType: "Quiz",
      options: [
        {
          id: 1,
          label: "A",
          description: "Paris",
          isCorrect: true,
        },
        {
          id: 2,
          label: "B",
          description: "Berlin",
          isCorrect: false,
        },
        {
          id: 3,
          label: "C",
          description: "Madrid",
          isCorrect: false,
        },
        {
          id: 4,
          label: "D",
          description: "Rome",
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      description: "<p>Explain the concept of polymorphism in object-oriented programming.</p>",
      questionType: "Long Text",
      options: [
        {
          id: 1,
          description: "Polymorphism allows methods to do different things based on the object it is acting upon.",
          label: "5",
        },
      ],
    },
    {
      id: 3,
      description: "<p>Which planet is known as the Red Planet?</p>",
      questionType: "Quiz",
      options: [
        {
          id: 1,
          label: "A",
          description: "Earth",
          isCorrect: false,
        },
        {
          id: 2,
          label: "B",
          description: "Mars",
          isCorrect: true,
        },
        {
          id: 3,
          label: "C",
          description: "Jupiter",
          isCorrect: false,
        },
        {
          id: 4,
          label: "D",
          description: "Saturn",
          isCorrect: false,
        },
      ],
    },
  ];
  
 
  return (
    <div className="card table-responsive my-2">
      <Modal
        size="sm"
        centered
        show={viewQuizModal}
        onHide={() => setViewQuestionModal(false)}
        backdrop={false}
        keyboard={false}
      >
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#252525",
              gap: "15px",
            }}
          >
            <div className="spinner-grow text-primary" role="status" />
            <p>loading preview...</p>
          </div>
        </Modal.Body>
      </Modal>
      {openModal && (
        <div className="card mb-0">
          <PreviewQuestionsModal
            show={openModal}
            onHide={() => {setOpenModal(false);setViewQuestionModal(false)}}
            questions={mockQuestions}
          />
        </div>
      )}
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              <div className="w-75 d-flex">
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "350px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </div>
                - (
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                  }}
                >
                  {moduleCode || "N/A"}
                </div>
                )
              </div>
            </th>
            <th>
              <div className="text-right w-100">
                <div className="row">
                  <div className="col-10">
                    <div className="progress-bar ml-5 my-3 w-100">
                      <div
                        className="progress-bar-fill"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{}} className="py-2">
              <div>
                {removeTags(description || "").slice(0, 200)}
                {/* {description.length > 200 && "..."} */}
              </div>
            </td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton url={url} setOpenModal={setOpenModal} setDeleteModal={setDeleteModal} setViewQuestionModal={setViewQuestionModal} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({
  url,
  setOpenModal,
  setDeleteModal,
  setViewQuestionModal
}: {
  url: string;
  setOpenModal: (isOpen: boolean) => void;
  setDeleteModal: (isOpen: boolean) => void;
  setViewQuestionModal: (isOpen: boolean) => void;

}) {

  const handleOpenModal = () => {setOpenModal(true);setViewQuestionModal(true)};
  return (
    <div className="d-flex justify-content-end">
      <div>
        <Link href='/protected/admin/courses/0/workbook/0' type="button">
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            edit
          </i>
        </Link>
      </div>
      <div>
        <Link href='#' type="button" className="ml-2" onClick={() =>{setOpenModal(true);setViewQuestionModal(true)}} >
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            visibility
          </i>
        </Link>
      </div>
      <div>
        <Link
          href="#"
          type="button"
          className="ml-2"
          onClick={() => setDeleteModal(true)}
        >
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            delete
          </i>
        </Link>
      </div>
    </div>
  );
}
