"use client"
import { Api } from "@/app/lib/restapi/endpoints";
import "../assessments.css"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";
import { IStudentAnswer } from "@/app/interfaces/studentAnswer";
import MarkAssessment from "../mark-assessment/MarkAssessment";
export default function ViewAssessments() {

const router = useRouter();
const [studentAnswers, setStudentAnswers] = useState<IStudentAnswer[]>([]) ;
const [viewAnswers, setViewAnswers] = useState<boolean>(false);
const [selectedAnswer, setSelectedAnswer] = useState<IStudentAnswer>()

const goToAssessments = (answer:IStudentAnswer) => {
  setViewAnswers(true)
  setSelectedAnswer(answer)
}


const getAssessmentAnswers = async () => {
  const answers = await Api.GET_StudentAssessmentsAnswers()!;
  const data = answers.map((answer:any) => answer?.data);
  setStudentAnswers(data)
}

useEffect(() => {
  getAssessmentAnswers();
},[])

  return (
<>
{
  !viewAnswers ?     <div
  style={{ width: "100%" }}
  className="mdk-drawer-layout js-mdk-drawer-layout"
  data-push=""
  data-responsive-width="992px"
  data-domfactory-upgraded="mdk-drawer-layout"
>
  <div
    className="mdk-drawer-layout__content page-content"
    style={{ transform: "translate3d(0px, 0px, 0px)" }}
  >
   
    <div className="pt-32pt">
      <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
        <div className="flex d-flex flex-column flex-sm-row align-items-center">
          <div className="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 className="mb-0">
            Assessements
            </h2>
            <ol className="breadcrumb p-0 m-0">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Assessments</li>
            </ol>
          </div>
       
        </div>
        
      </div>
      <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left header-titles">
              <h5>
                  Name
              </h5>
              <h5>
                  Surname
              </h5>
              <h5>
                  Course
              </h5>

          </div>

        {
          studentAnswers.length > 0 && studentAnswers.map((studentAnswer:IStudentAnswer) => (

            <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left assessment-details">


            <p>
                    {studentAnswer.studentName}
                </p>
                <p>
                {studentAnswer.studentSurname}
                </p>
                <p style={{alignSelf:"flex-end"}}>
                {studentAnswer?.assessmentId}

                    <a
                       onClick={() => goToAssessments(studentAnswer)}
                          className="btn btn-outline-secondary btn-grade"
                        >
                          Grade Assessment
                        </a>
                </p>

                {/* <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
                          Grade Assessment
                        </a> */}

            </div>

          ))
        }
       
        
       
    </div>

  </div>  
</div>
:  <MarkAssessment
        answer = {selectedAnswer!}
        setViewAnswers={setViewAnswers}

/>
}

</>
  )
}
