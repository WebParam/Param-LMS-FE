"use client";
import { IChoice, IMarks, IQuiz } from "@/app/interfaces/quiz";
import { Api } from "@/app/lib/restapi/endpoints";
import React, { useEffect, useState } from "react";
import {  useRouter} from "next/navigation";
import Link from 'next/link';
export default function QuizData() {
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [quiz, setQuiz] = useState<IQuiz>();
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const [start, setStart] = useState("Next Question");
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [date, setDate] = useState<string>("")
  const [totalPoints, setTotalPoints] = useState<number>(0)
  const [viewSaveMarksBtn, setViewSaveMarksBtn] = useState<boolean>(false)
  const [isMarksSaved, setIsMarksSaved] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState(Array(quiz?.questions.length).fill(null));
  

  const router = useRouter();

  const handleOptionChange = (questionIndex:number, optionIndex:number) => {
    setSelectedOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[questionIndex] = optionIndex;
      return newOptions;
    });
  };
  const calculateTotalPoints = () => {
    let totalPoints = 0;
    quiz?.questions.forEach((question) => {
      totalPoints += question.points;
    });
    setTotalPoints(totalPoints);
  };
  const calculateScore = () => {
    let score = 0;
    quiz?.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      if (selectedOptionIndex !== null && question.choices[selectedOptionIndex]?.isCorrect) {
        score += question.points;
      }
    });
    calculateTotalPoints()
    setScore(score);
  };



  useEffect(() => {
    const quizFromStorage = localStorage.getItem("quiz");

    if (quizFromStorage) {
      try {
        setQuiz(JSON.parse(quizFromStorage));
        setQuestionsLength(quiz?.questions.length!);
      } catch (error) {
        console.error("Error parsing quizzes from localStorage:", error);

      }
    }
  }, [questionsLength]);

  const nextQuestion = () => {
    if (questionNumber < questionsLength - 1) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const FinishQuiz = () => {
    calculateScore()
    setIsFinished(true)
    setViewSaveMarksBtn(true)
 
  
  }

  const RestartQuiz = () => {
    setQuestionNumber(0);
    setIsFinished(false);
    setStart("Next Question")
    setScore(0)
  }

  useEffect(() => {
    if (questionNumber === questionsLength - 1) {
      setStart("Finish");
    }
  }, [questionNumber]);

  const handleClick = () => {
    nextQuestion();
  };
  
  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    setDate(`${year}-${month}-${day}`);
  }
  const saveMarks = async () => {
    getTodaysDate();
    const payload:IMarks = {
      StudentId: "",
      Points: score,
      CourseId: "",
      QuizId: quiz?.id!,
      CreatedAt:date,
      Reference: quiz?.reference!,
      Status: 0
    }
      try {
      const _postMarks = await Api.POST_Marks(payload)
        console.log(_postMarks)
        debugger;
        router.push("/protected/student/course/course-detail")

      } catch (error) {
        console.error(error);
      }    
  }

useEffect(() => {
  setIsMarksSaved(true)
},[isMarksSaved])
  return (
    <>
      <div
        className="navbar navbar-list navbar-light bg-white border-bottom-2 border-bottom navbar-expand-sm"
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="container page__container">
          <nav className="nav navbar-nav">
            <div className="nav-item navbar-list__item">
              <a href="student-take-course.html" className="nav-link h-auto">
                <i className="material-icons icon--left">keyboard_backspace</i>{" "}
                Back to Course
              </a>
            </div>
            <div className="nav-item navbar-list__item">
              <div className="d-flex align-items-center flex-nowrap">
                <div className="mr-16pt">
                  <a href="student-take-course.html">
                    <img
                      src="../../public/images/paths/angular_64x64.png"
                      width={40}
                      alt="Angular"
                      className="rounded"
                    />
                  </a>
                </div>
                <div className="flex">
                  <a
                    href="student-take-course.html"
                    className="card-title text-body mb-0"
                  >
                    Angular Fundamentals
                  </a>
                  <p className="lh-1 d-flex align-items-center mb-0">
                    <span className="text-50 small font-weight-bold mr-8pt">
                      Elijah Murray
                    </span>
                    <span className="text-50 small">
                      Software Engineer and Developer
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bg-primary pb-lg-64pt py-32pt">
        <div className="container page__container">
          <nav className="course-nav">
          {quiz?.questions?.map((q: any) => (
              <a
                data-toggle="tooltip"
                data-placement="bottom"
                data-title={q?.name}
                data-original-title
                title={q?.name}
              >
                <span className="material-icons">check_circle</span>
              </a>
            ))}
          </nav>

{
  isFinished ?      <div className="container d-flex flex-column justify-content-center align-items-center">
  <p className="lead text-white-50 measure-lead-max mb-0">Submited on 02 Jan 2019</p>
  <h1 className="text-white mb-24pt">Your Score: {score}</h1>
  <a onClick={RestartQuiz} className="btn btn-outline-white">Restart quiz</a>
</div> :   
<>
<div className="d-flex flex-wrap align-items-end justify-content-end mb-16pt">
            <h1 className="text-white flex m-0">
              Question {questionNumber + 1} of {questionsLength}
            </h1>
            <p className="h1 text-white-50 font-weight-light m-0">00:14</p>
          </div>
          <p className="hero__lead measure-hero-lead text-white-50">
            {quiz?.questions[questionNumber]?.questionDescription}
          </p>
</>
}
     

     
          
        </div>
      </div>


      
      <div
        className="navbar navbar-expand-md navbar-list navbar-light bg-white border-bottom-2 "
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="container page__container">
          {
          
          !isFinished ? 
           <ul className="nav navbar-nav flex navbar-list__item">
            <li className="nav-item">
              <i className="material-icons text-50 mr-8pt">tune</i>
              Choose the correct answer below:
            </li>
          </ul> 
          
          
          :
          <div className="container page__container">
          <ul className="nav navbar-nav flex align-items-sm-center">
              <li className="nav-item navbar-list__item">{score}/{totalPoints} Score</li>
              <li className="nav-item navbar-list__item">
                  <i className="material-icons text-muted icon--left">schedule</i>
                  12 minutes
              </li>
              <li className="nav-item navbar-list__item">
                  <i className="material-icons text-muted icon--left">assessment</i>
                  Intermediate
              </li>
          </ul>
      </div>


          }

<div className="nav navbar-nav ml-sm-auto navbar-list__item">


            <div className="nav-item d-flex flex-column flex-sm-row ml-sm-16pt">

              <Link
                              className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0"

              href = "/protected/student/course/course-detail">
                Skip Quiz
              </Link>
              

              <Link
                href="/protected/student/course/video"
                className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
              >
                Review Video
              </Link>

             {
              start !== "Finish" ?  <a
              onClick={() => handleClick()}
              className="btn justify-content-center btn-accent w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
            >
              Next Question
              <i className="material-icons icon--right">
                keyboard_arrow_right
              </i>
              </a>
:
           <>
            {
              !viewSaveMarksBtn ? 
               <a
               onClick={FinishQuiz}
               className="btn justify-content-center btn-accent w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
             >
               Finish
               <i className="material-icons icon--right">
                 keyboard_arrow_right
               </i>
             </a>

             :

             <a
             href="#"
             onClick={saveMarks}
             className="btn justify-content-center btn-accent w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
           >
             Next Video
             <i className="material-icons icon--right">
               keyboard_arrow_right
             </i>
           </a>
 
           }
           
           </>


              }
             
            </div>
          </div>
        </div>
      </div>
      <div className="container page__container">
        <div className="page-section">
          <div className="page-separator">
            <div className="page-separator__text">Your Answer</div>
          </div>
         
 {quiz?.questions[questionNumber]?.choices.map((option, optionIndex) => (
            <div className="form-group" key={optionIndex}>
              <div className="custom-control custom-checkbox">
                <input
                  id={`customCheck_${questionNumber}_${optionIndex}`}
                  type="checkbox"
                  className="custom-control-input"
                  onChange={() => handleOptionChange(questionNumber, optionIndex)}
                  checked={selectedOptions[questionNumber] === optionIndex}
                />
                <label
                  htmlFor={`customCheck_${questionNumber}_${optionIndex}`}
                  className="custom-control-label"
                >
                  {option.choiceDescription}
                </label>
              </div>
            </div>
          ))}
          <p className="text-50 mb-0">
            Note: There can be multiple correct answers to this question.
          </p>
        </div>
      </div>
      {/* // END Page Content */}
      {/* Footer */}
    </>
  );
}
