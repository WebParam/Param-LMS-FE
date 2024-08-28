"use client";
import LongQuestion from "./question-types/LongText";
import MultipleChoiceQuestion from "./question-types/MultipleChoice";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/Pagination";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./Modal";
import { getStudentAssessmentAnswers } from "@/app/lib/actions/assessments";
import { IAssessmentStudentAnswers } from "@/app/interfaces/assessments";
import { useRouter } from "next/navigation";
import {data} from "./data"
import LongQuestionSkeleton from "@/components/skeleton/LongQuestionSkeleton";

function Page({ params }: { params: { assessmentId: string; id: string } }) {
  const [studentAssessment, setStudentAssessment] =
    useState<IAssessmentStudentAnswers | null>(data);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 2;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    studentAssessment?.answers.slice(indexOfFirstItem, indexOfLastItem) || [];
  const [modalShow, setModalShow] = useState(false);
  const assessmentId = params.assessmentId;
  const userId = params.id;
  const router = useRouter();

  const getAssessments = async () => {
    try {
      const assessments: IAssessmentStudentAnswers =
        await getStudentAssessmentAnswers(userId, assessmentId);
      console.log("API Response:", assessments);
      if (assessments && assessments.answers) {
        setLoading(false);
        setStudentAssessment(assessments);
        console.log("State Updated:", assessments);
      } else {
        setLoading(false);
        console.error("Unexpected response structure:", assessments);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching assessments:", error);
    }
  };

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">Questions</div>
      </div>
      {loading ? (
        <>
          <LongQuestionSkeleton />
          <LongQuestionSkeleton />
        </>
      ) : (
        currentItems.map((data) =>
          data.questionType === "Quiz" ? (
            <MultipleChoiceQuestion
              key={data.questionId}
              questionName={data.description}
              questionDescription={data.description}
              answers={data.options!}
              questionScore={data.score}
              studentMultipleChoiceAnswer={data.studentMultipleChoiceAnswer!}
            />
          ) : (
            <LongQuestion
              key={data.questionId}
              questionName={data.description}
              questionDescription={data.description}
              questionAnswer={data.studentLongTextAnswer!}
              questionScore={data.score}
              rubric={data.rubrics}
            />
          )
        )
      )}


      <div className="card mb-24pt">
        <Pagination
          listLength={studentAssessment?.answers.length || 0}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
      <div className="card mb-0">
        <Button variant="success" onClick={() => setModalShow(true)}>
          Submit
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      </div>
    </>
  );
}

export default Page;
