"use client"
import { useEffect, useState } from "react";
import data from './quizQuestions.json'
import Image from 'next/image'
import styles from './page.module.css'

export default function QuizData() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [start,setStart] = useState("Next Question");
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
      const fetchData = async () => {
          try {
            console.log("quiz", data);
            setIndex(0);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, [data]);

  const handleClick = () => {
      console.log("quiz", data);
      if (index === data.length - 1) {
          setStart("Finish")
          setIndex(0)
      } else {
          setIndex(index + 1)
          setStart('Next Question');

      }
  };

  if (!quiz) {
    return <p>Loading...</p>;
  }

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
            <i className="material-icons icon--left">keyboard_backspace</i> Back
            to Course
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
      {
          data?.map((q:any) => (
            <a data-toggle="tooltip" data-placement="bottom" data-title={q?.name}  data-original-title title={q?.name}><span className="material-icons">check_circle</span></a>
          ))
        }
      </nav>
      <div className="d-flex flex-wrap align-items-end justify-content-end mb-16pt">
        <h1 className="text-white flex m-0">Question {index + 1} of {data?.length}</h1>
        <p className="h1 text-white-50 font-weight-light m-0">00:14</p>
      </div>
      <p className="hero__lead measure-hero-lead text-white-50">
        {data[index]?.question}
      </p>
    </div>
  </div>
  <div
    className="navbar navbar-expand-md navbar-list navbar-light bg-white border-bottom-2 "
    style={{ whiteSpace: "nowrap" }}
  >
    <div className="container page__container">
      <ul className="nav navbar-nav flex navbar-list__item">
        <li className="nav-item">
          <i className="material-icons text-50 mr-8pt">tune</i>
          Choose the correct answer below:
        </li>
      </ul>
      <div className="nav navbar-nav ml-sm-auto navbar-list__item">
        <div className="nav-item d-flex flex-column flex-sm-row ml-sm-16pt">
          <a
            href="student-quiz-result-details.html"
            className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0"
          >
            Skip Quiz
          </a>
          <a
            href="student-take-lesson.html"
            className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
          >
            Review Video
          </a>
          <a
            onClick={() => handleClick()}
            className="btn justify-content-center btn-accent w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
          >
            {start}
            <i className="material-icons icon--right">keyboard_arrow_right</i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="container page__container">
    <div className="page-section">
      <div className="page-separator">
        <div className="page-separator__text">Your Answer</div>
      </div>
      {
        data[index]?.options?.map((option, i) => (
        <div className="form-group" key={i}>
          <div className="custom-control custom-checkbox">
            <input
              id="customCheck01"
              type="checkbox"
              className="custom-control-input"
            />
            <label htmlFor="customCheck01" className="custom-control-label">
              {option.name}
            </label>
          </div>
        </div>
        ))
      }
      
      {/* <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            id="customCheck02"
            type="checkbox"
            className="custom-control-input"
            // defaultChecked=""
          />
          <label htmlFor="customCheck02" className="custom-control-label">
            Compatibility
          </label>
        </div>
      </div>
      <div className="form-group mb-32pt mb-lg-48pt">
        <div className="custom-control custom-checkbox">
          <input
            id="customCheck03"
            type="checkbox"
            className="custom-control-input"
          />
          <label htmlFor="customCheck03" className="custom-control-label">
            Usage of missing features
          </label>
        </div>
      </div> */}
      <p className="text-50 mb-0">
        Note: There can be multiple correct answers to this question.
      </p>
    </div>
  </div>
  {/* // END Page Content */}
  {/* Footer */}


</>
  )
}
