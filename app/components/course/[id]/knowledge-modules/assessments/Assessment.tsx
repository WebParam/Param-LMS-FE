"use client";
import dynamic from "next/dynamic";
import Modal from "react-bootstrap/Modal";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import EditAssessmentModal from "./EditAssessmentModal";
import QuestionsModal from "./QuestionsModal";
import { getQuestions } from "@/app/lib/actions/questions";
import { getOptions } from "@/app/lib/actions/options";
import { getRubrics } from "@/app/lib/actions/rubrics";
import DeleteAssessmentModal from "./DeleteAssessmentModal";

function Assessment({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [viewQuizModal, setViewQuestionModal] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const pathname = usePathname();

  const previewQuestions = async (assessmentId: string) => {
    setViewQuestionModal(true);
    const list = await getQuestions(assessmentId);
    console.log("data: ", list);

    let questions = [];

    for (let data of list) {
      let options = [],
        question = { ...data };

      if (data.questionType == "Quiz") options = await getOptions(data.id);
      else options = await getRubrics(data.id);

      question.options = options;
      questions.push(question);
    }
    setViewQuestionModal(false);
    setQuestions(questions);
    setOpenModal(true);
  };

  useEffect(() => {
    setOpenEditModal(false);
    setDeleteModal(false);
  }, [refreshId]);

  return (
    <div key={data.id}>
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

      <EditAssessmentModal
        show={openEditModal}
        onHide={() => setOpenEditModal(false)}
        data={data}
        assessmentId={data.id}
      />

      <QuestionsModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        data={data}
        questions={questions}
      />

      <DeleteAssessmentModal
        id={data.id}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />

      <div className="card p-3 mt-3 mb-3 overflow-auto">
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: "15px" }}>
            <b>{data.title}</b>
          </div>
          <div className="d-flex" style={{ gap: "10px" }}>
            <i
              onClick={() => setOpenEditModal(true)}
              className="material-icons icon-holder--outline-dark rounded-lg"
            >
              edit
            </i>
            <Link
              href={`${pathname}/${data.id}/questions?title=${title}&topicTitle=${data.title}`}
              type="button"
            >
              <i className="material-icons icon-holder--outline-dark rounded-lg">
                visibility
              </i>
            </Link>
            <i
              onClick={() => previewQuestions(data.id!)}
              className="material-icons icon-holder--outline-dark rounded-lg"
            >
              open_in_new
            </i>
            <i
              onClick={() => setDeleteModal(true)}
              className="material-icons icon-holder--outline-dark rounded-lg"
            >
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Assessment;
