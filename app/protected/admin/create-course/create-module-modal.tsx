"use client";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiDeleteBin6Line } from "react-icons/ri";

import Dropdown from "react-bootstrap/Dropdown";
import {
  FaBullseye,
  FaEdit,
  FaPencilAlt,
  FaPlus,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import {
  addModuleToSection,
  addVideoToModule,
  deleteVideoFromModule,
  editVideoDetails,
  getSelectedCourseForEdit,
  updateModuleDetail,
} from "@/app/redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ICourse,
  IModule,
  IUpdateModuleDetailState,
} from "@/app/interfaces/courses";
import {
  addChoices,
  createQuestion,
  createQuizDetail,
  setSelectedQuizForEdit,
  getSelectedQuizForEdit,
  updateQuestionDetails,
} from "@/app/redux/quizSlice";
import {
  IChoice,
  IQuestion,
  IQuiz,
  IQuizState,
  IUpdateQuestionDetailState,
  IUpdateQuizDetailState,
} from "@/app/interfaces/quiz";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { current } from "@reduxjs/toolkit";

interface CreateCourseModalProps {
  onClose: () => any;
  sectionId: string;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  onClose,
  sectionId,
}) => {
  const [showVideoInputs, setShowVideoInputs] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([]);
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const [moduleId, setModuleId] = useState("");
  const dispatch = useDispatch();
  const _courseFromState: ICourse = useSelector(
    getSelectedCourseForEdit
  ).course;
  const [modules, setModules] = useState<string[]>([]);
  const [isModuleSaved, setIsModuleSaved] = useState<boolean>(false);
  const [viewModuleList, setViewModuleList] = useState<boolean>(false);
  const [changeModulBtn, setChangeModulBtn] = useState<boolean>(false);
  const [disableSaveChanges, setDisableSaveChanges] = useState<boolean>(true);
  const [lastSection, setLastSection] = useState<number>(-1);
  const [selectedVideos, setSelectedVideo] = useState<any>([]);
  const [changeVidBtn, setChangeVidBtn] = useState<boolean>(true);
  const [videoId, setVideoId] = useState<string>("");
  const [toggler, setToggler] = useState<Number>(1);
  const [includeQuiz, setIncludeQuiz] = useState<boolean>(false);
  const [includeDocument, setIncludeDocument] = useState<boolean>(false);
  const [questionDescription, setQuestionDescription] = useState<string>("");
  const [choiceDescription, setChoiceDescription] = useState<string>("");
  const [choiceAnswer, setChoiceAnswer] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [choiceError, setChoiceError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [choiceAnswerError, setChoiceAnswerError] = useState(false);
  const [isQuestionCreated, setIsQuestionCreated] = useState<boolean>(false);
  const [countChoice, setCountChoices] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [questionId, setQuestionId] = useState<any>(0);
  const [enableEditQuestion, setEnableEditQuestion] = useState<boolean>(false);
  const [pointsError, setPointsError] = useState(false);
  const [choices, setChoices] = useState<any>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [questions, setQuestions] = useState<any>();
  const [openChoices, setOpenChoices] = useState(false);
  const [choiceInstruction, setChoiceInstruction] = useState(false);
  const [selectedQuestionForEdit, setSelectedQuestionForEdit] =
    useState<IQuestion>();
  const _quizFromState: IQuiz = useSelector(getSelectedQuizForEdit).quiz;
  const cookies = new Cookies();

  const handleDeleteOption = (value: any) => {
    // Logic to delete the selected option
    console.log(`Deleting option: ${value}`);
  };
  const moduleToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const tabSelect = (id: Number, e: any) => {
    setToggler(id);
    e.preventDefault();
  };

  const cursorStyle = (predicate: boolean) =>
    predicate ? "pointer" : "not-allowed";

  const userData = cookies.get("param-lms-user");
  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    setDate(`${year}-${month}-${day}`);
  }

  const handleCreateQuiz = () => {
    const payload = {
      reference: "module",
      createdByUserId: userData?.id,
      modifiedByUserId: userData?.id,
      createdDate: date,
    } as IUpdateQuizDetailState;

    dispatch(createQuizDetail(payload));
  };

  console.log("New Quiz: ", _quizFromState.questions);

  const handleCreateQuestion = () => {
    setPointsError(false);
    setQuestionError(false);
    if (questionDescription.length === 0) {
      setQuestionError(true);

      return;
    }
    const plainDescription =
      questionDescription && questionDescription.replace(/<\/?p>/gi, "");
    if (isNaN(points) || points === 0) {
      setPointsError(true);
      return;
    }
    setEnableEditQuestion(true);
    const payload = {
      text: plainDescription,
      points: points,
    } as IQuestion;
    dispatch(createQuestion(payload));
    setIsQuestionCreated(true);
  };

  const updateQuizQuestion = function () {
    setEnableEditQuestion(true);
    const plainDescription =
      questionDescription && questionDescription.replace(/<\/?p>/gi, "");
    const payload = {
      questionId: questionId,
      text: plainDescription,
      points: points,
    } as IUpdateQuestionDetailState;

    dispatch(updateQuestionDetails(payload));
  };

  const handleCreateChoice = () => {
    setChoiceError(false);
    setCountChoices(countChoice + 1);
    setChoiceAnswerError(false);
    if (choiceDescription.length === 0) {
      setChoiceError(true);
      return;
    }
    if (!choiceAnswer) {
      setChoiceAnswerError(true);
      return;
    }

    const payload = {
      questionId: questionId,
      text: choiceDescription,
      isCorrect: choiceAnswer,
    } as IChoice;
    dispatch(addChoices(payload));
    setChoices([
      ...choices,
      { text: payload.text, isCorrect: payload.isCorrect },
    ]);
    setChoiceAnswer("");
    setChoiceDescription("");
  };

  console.log("New Quiz: ", _quizFromState.questions);
  console.log("QuestionId:", questionId);

  const saveChangeBtn = () => {
    if (moduleDescription.length > 0 && moduleTitle.length > 0) {
      setDisableSaveChanges(false);
    }
  };

  const deleteVideoHandler = (moduleId: any, videoId: any) => {
    dispatch(deleteVideoFromModule({ moduleId, videoId }));
  };
  const createModule = () => {
    if (moduleDescription.length > 0 && moduleTitle.length > 0) {
      const plainDescription = moduleDescription
        ? moduleDescription.replace(/<\/?p>/gi, "")
        : _courseFromState.description;

      const payload = {
        sectionId: sectionId,
        moduleTitle: moduleTitle,

        moduleDescription: plainDescription,
      };

      console.log("payload: ", payload);

      dispatch(addModuleToSection(payload));

      console.log("COURSE", _courseFromState);
      console.log(sectionId);
      setIsModuleSaved(true);
      setModules([...modules, moduleTitle]);

      setDisableSaveChanges(true);
    }
  };
  useEffect(() => {
    const quizQuestions = _quizFromState.questions.map(
      (questions) => questions
    );

    if (quizQuestions.length > 0) {
      const lastQuestionId = quizQuestions.map((question) => question.id);
      setQuestionId(lastQuestionId[quizQuestions.length - 1]);
    }
  }, [_quizFromState.questions]);

  useEffect(() => {
    const sectionIds = _courseFromState.sections.map((section) => {
      if (section.id === sectionId) {
        const moduleIds = section.modules.map((module) => module.id);
        const lastModuleId = moduleIds[moduleIds.length - 1];

        setModuleId(lastModuleId);
      }
    });
  }, [sectionId, _courseFromState.sections]);

  const AddVideo = () => {
    if (videoTitle && videoUrl) {
      const payload = {
        moduleId: moduleId,
        videoTitle: videoTitle,
        videoLink: videoUrl,
      };

      dispatch(addVideoToModule(payload));

      setVideos([...videos, payload]);
      setShowVideoInputs(!showVideoInputs);
      setVideoTitle("");
      setVideoUrl("");
      console.log("COURSE", _courseFromState);
      console.log(moduleId);
      setChangeModulBtn(true);
    }
  };

  const clearInputs = () => {
    setModuleTitle("");
    setModuleDescription("");
    setVideoUrl("");
    setVideoTitle("");
    setViewModuleList(true);
    setIsModuleSaved(false);
    setChangeModulBtn(false);
    setVideos([]);
  };

  const selectedCourse = useSelector(getSelectedCourseForEdit).course;
  const [expandedModule, setExpandedModule] = useState(null);

  const handleModuleClick = (module: any) => {
    if (expandedModule === module.id) {
      setExpandedModule(null);
    } else {
      setExpandedModule(module.id);
    }
  };

  useEffect(() => {
    getTodaysDate();
    const sections = _courseFromState.sections;
    const lastSection = sections.length - 1;
    setLastSection(lastSection);
  }, []);

  useEffect(() => {
    const choices = _quizFromState.questions.map(
      (question) => question.choices
    );
    console.log("Choices", choices[0]);
  }, [countChoice]);

  useEffect(() => {
    const section = _courseFromState.sections.find(
      (section) => section.id === sectionId
    );

    if (section) {
      const module = section.modules.find((module) => module.id === moduleId);

      if (module) {
        setSelectedVideo(module.videos);
      }
    }
  }, [sectionId, moduleId, _courseFromState.sections]);

  const editVideo = (id: string) => {
    const payload = {
      moduleId: moduleId,
      videoId: id,
      videoTitle: videoTitle,
      videoUrl: videoUrl,
    };
    dispatch(editVideoDetails(payload));
    setShowVideoInputs(false);
    setVideoTitle("");
    setVideoUrl("");
    setChangeVidBtn(true);
  };
console.log("Questions Length:", questions.length)
  const newQuestion = () => {
    const quizQuestions = _quizFromState.questions.map(
      (questions) => questions
    );

    console.log("Quiz Question:", quizQuestions)

    quizQuestions.forEach((question) => {
      if (question.choices.length > 0) {
        setQuestions(_quizFromState.questions);
      }
    });
    setIsQuestionCreated(!isQuestionCreated);
    setEnableEditQuestion(!enableEditQuestion);
    setChoices([])
    setQuestionDescription("");
    setPoints(0);
    setChoiceDescription("");
    setChoiceAnswer("");
  };
  console.log("Questions", questions);
  const nextQuestion = () => {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const prevQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  return (
    <div
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
        <div className="card-header p-0 nav">
          <div className="row no-gutters" role="tablist">
            <div className="col-auto">
              <a
                href="#"
                data-toggle="tab"
                onClick={(e) => tabSelect(1, e)}
                role="tab"
                aria-selected="true"
                className={
                  toggler === 1
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
              >
                <span className="h2 mb-0 mr-3">1</span>
                <span className="flex d-flex flex-column">
                  <strong className="card-title">Add Module</strong>
                  {/* <small className="card-subtitle text-50">Ongoing Projects</small> */}
                </span>
              </a>
            </div>
            <div className="col-auto border-left border-right">
              <a
                href="#"
                data-toggle="tab"
                style={{ cursor: cursorStyle(includeQuiz) }}
                onClick={(e) => {
                  if (includeQuiz) {
                    tabSelect(2, e);
                  } else {
                    e.preventDefault();
                  }
                }}
                role="tab"
                aria-selected="true"
                className={
                  toggler === 2
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
              >
                <span className="h2 mb-0 mr-3">2</span>
                <span className="flex d-flex flex-column">
                  <strong className="card-title" onClick={handleCreateQuiz}>
                    Add Quiz
                  </strong>
                  {/* <small className="card-subtitle text-50">Past Projects</small> */}
                </span>
              </a>
            </div>
            <div className="col-auto border-left border-right">
              <a
                href="#"
                style={{ cursor: cursorStyle(includeDocument) }}
                data-toggle="tab"
                onClick={(e) => {
                  if (includeDocument) {
                    tabSelect(3, e);
                  } else {
                    e.preventDefault();
                  }
                }}
                role="tab"
                aria-selected="true"
                className={
                  toggler === 3
                    ? "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                    : "dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                }
              >
                <span className="h2 mb-0 mr-3">3</span>
                <span className="flex d-flex flex-column">
                  <strong className="card-title">Add Document</strong>
                  {/* <small className="card-subtitle text-50">Past Projects</small> */}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">
                  {toggler === 1
                    ? "Add Module"
                    : toggler === 2
                    ? "Add Quiz"
                    : "Add Document"}
                </h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Add Module</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }} className="page-section border-bottom-2">
          <div className="container page__container">
            <div className="row">
              <div
                className={toggler === 1 ? "col-md-8" : "col-md-8 d-md-none"}
              >
                <div className="page-separator">
                  <div className="page-separator__text">Basic information</div>
                </div>
                <div>
                  {viewModuleList && (
                    <>
                      <div
                        style={{
                          backgroundColor: "#f5f7fa",
                          marginBottom: "10px",
                        }}
                        className="accordion__item open"
                      >
                        <h1>{selectedCourse.title}</h1>
                        {selectedCourse.sections[lastSection].modules.map(
                          (module) => (
                            <div
                              className={`accordion__item ${
                                expandedModule === module.id ? "open" : ""
                              }`}
                              key={module.id}
                            >
                              <a
                                href="#"
                                className={`accordion__toggle ${
                                  expandedModule === module.id
                                    ? ""
                                    : "collapsed"
                                }`}
                                data-toggle="collapse"
                                data-target={`#course-toc-${module.id}`}
                                data-parent="#parent"
                                onClick={() => handleModuleClick(module)}
                              >
                                <span className="flex">{module.title}</span>
                                <span className="accordion__toggle-icon material-icons">
                                  {expandedModule === module.id
                                    ? "keyboard_arrow_up"
                                    : "keyboard_arrow_down"}
                                </span>
                              </a>
                              <div
                                className={`accordion__menu collapse ${
                                  expandedModule === module.id ? "show" : ""
                                }`}
                                id={`course-toc-${module.id}`}
                              >
                                {module.videos.map((video) => (
                                  <div
                                    className="accordion__menu-link"
                                    key={video.id}
                                  >
                                    <FaVideo className="video-icon" />{" "}
                                    {/* Video icon */}
                                    <a
                                      style={{ marginLeft: "10px" }}
                                      className="flex"
                                      href={video.videoLink}
                                    >
                                      {video.title}
                                    </a>
                                    <span className="text-muted">
                                      {video.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
                <label className="form-label">Module title</label>
                <div className="form-group mb-24pt">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Module Title"
                    value={moduleTitle}
                    onChange={(e) => {
                      saveChangeBtn();
                      setModuleTitle(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">module title guideline</a>
                  </small>
                </div>
                <label className="form-label">Module Description</label>
                <div style={{ height: "200px", overflow: "auto" }}>
                  <ReactQuill
                    style={{ height: "100px" }}
                    value={moduleDescription}
                    onChange={(value: string) => {
                      setModuleDescription(value); // Pass the new description
                      saveChangeBtn();
                    }}
                    placeholder="Module description..."
                    modules={moduleToolbar}
                  />
                </div>
                {isModuleSaved && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="page-separator"
                    >
                      <div className="page-separator__text">Videos</div>
                      <div>
                        {showVideoInputs ? null : (
                          <FaPlus
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowVideoInputs(!showVideoInputs)}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="accordion js-accordion accordion--boxed mb-24pt"
                      id="parent"
                      data-domfactory-upgraded="accordion"
                    >
                      {videos.length > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              width: "150%",
                            }}
                          >
                            {selectedVideos.map((video: any, index: number) => (
                              <>
                                <div
                                  style={{
                                    marginLeft: "10px",
                                    flexBasis: "30%",
                                    maxWidth: "100% !important",
                                  }}
                                  className="card"
                                >
                                  <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                      className="embed-responsive-item"
                                      src={video.videoLink}
                                      //   allowFullScreen=""
                                    />
                                  </div>
                                  <div className="card-body">
                                    <label className="form-label">Title</label>
                                    <input
                                      disabled={true}
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Video Title"
                                      value={video.title}
                                      onChange={(e) =>
                                        setVideoTitle(e.target.value)
                                      }
                                    />
                                    <small className="form-text text-muted">
                                      Enter a valid video title.
                                    </small>
                                  </div>
                                  <div className="card-body">
                                    <label className="form-label">URL</label>
                                    <input
                                      disabled={true}
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Video URL"
                                      value={video.videoLink}
                                    />
                                    <small className="form-text text-muted">
                                      Enter a valid video URL.
                                    </small>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                      }}
                                    >
                                      <FaTrash
                                        onClick={() =>
                                          deleteVideoHandler(moduleId, video.id)
                                        }
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <FaPencilAlt
                                        onClick={() => {
                                          setVideoId(video.id);
                                          setChangeVidBtn(false);
                                          setShowVideoInputs(!showVideoInputs);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      {showVideoInputs && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label className="form-label">Title</label>
                          </div>

                          <input
                            onChange={(e) => setVideoTitle(e.target.value)}
                            id="flatpickrSample04"
                            type="text"
                            className="form-control"
                            placeholder="video title"
                            data-toggle="flatpickr"
                            data-flatpickr-enable-time="true"
                            data-flatpickr-alt-format="F j, Y at H:i"
                            value={videoTitle}
                            data-flatpickr-date-format="Y-m-d H:i"
                          />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label className="form-label">URL</label>
                          </div>

                          <input
                            onChange={(e) => setVideoUrl(e.target.value)}
                            id="flatpickrSample04"
                            type="text"
                            className="form-control"
                            placeholder="video url"
                            data-toggle="flatpickr"
                            data-flatpickr-enable-time="true"
                            data-flatpickr-alt-format="F j, Y at H:i"
                            data-flatpickr-date-format="Y-m-d H:i"
                            value={videoUrl}
                          />
                        </>
                      )}
                    </div>

                    {showVideoInputs && (
                      <>
                        {changeVidBtn ? (
                          <a
                            style={{ marginTop: "10px" }}
                            onClick={AddVideo}
                            href="#"
                            className="btn btn-outline-secondary mb-24pt mb-sm-0"
                          >
                            save Video
                          </a>
                        ) : (
                          <a
                            style={{ marginTop: "10px" }}
                            onClick={() => editVideo(videoId)}
                            href="#"
                            className="btn btn-outline-secondary mb-24pt mb-sm-0"
                          >
                            update Video
                          </a>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {/*Quiz Content Starts Here*/}

              <div
                className={toggler === 2 ? "col-md-8" : "col-md-8 d-md-none"}
              >
                <div className="page-separator">
                  <div className="page-separator__text">Questions</div>
                </div>
                {questions?.length > 0 && (
                  <ul className="list-group stack mb-40pt">
                    <li className="list-group-item d-flex">
                      <i className="material-icons text-70 icon-16pt icon--left">
                        drag_handle
                      </i>
                      <div className="flex d-flex flex-column">
                        <div className="card-title mb-4pt">
                          Question {questionNumber} of {questions?.length}
                        </div>
                        <div className="card-subtitle text-70 paragraph-max mb-16pt">
                          {questions?.length > 0 &&
                            questions[questionNumber - 1]?.text}
                        </div>
                        <div>
                          <a
                            onClick={() => setOpenChoices((prev) => !prev)}
                            className="chip chip-light d-inline-flex align-items-center"
                          >
                            <i className="material-icons icon-16pt icon--left">
                              {openChoices
                                ? "keyboard_arrow_up"
                                : "keyboard_arrow_down"}
                            </i>{" "}
                            Answers
                          </a>

                          {openChoices && (
                            <div className="form-group">
                              <select
                                id="select01"
                                data-toggle="select"
                                data-multiple="true"
                                multiple
                                className="form-control mt-2"
                              >
                                {questions[questionNumber - 1].choices.map(
                                  (option: any, index: any) => (
                                    <option key={index} value={option}>
                                      {option.text}
                                      <RiDeleteBin6Line
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "60px",
                                          position: "absolute",
                                        }}
                                        onClick={() =>
                                          handleDeleteOption(option.text)
                                        }
                                      />
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-muted mx-12pt">
                        {questions[questionNumber - 1].points} pt
                      </span>

                      <Dropdown style={{ marginRight: "8em" }}>
                        <Dropdown.Toggle
                          id="accountDropdown"
                          variant="link"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu style={{ textAlign: "right" }}>
                          <Dropdown.Item
                            onClick={() =>
                              setSelectedQuestionForEdit(
                                questions[questionNumber - 1]
                              )
                            }
                          >
                            Edit Question
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Delete Question
                            <RiDeleteBin6Line
                              className="text-danger"
                              style={{
                                fontSize: "0.8em",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="dropdown"></div>
                    </li>
                    <li className="list-group-item d-flex">
                      <button
                        onClick={nextQuestion}
                        style={{
                          outline: "none",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <a href="#" className="btn btn-outline-secondary">
                          Next
                        </a>
                      </button>

                      <button
                        onClick={prevQuestion}
                        style={{
                          outline: "none",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <a href="#" className="btn btn-outline-secondary">
                          prev
                        </a>
                      </button>
                    </li>
                  </ul>
                )}

                <div>
                  <div className="page-separator">
                    <div className="page-separator__text">New Question</div>
                  </div>
                  <div className="card card-body">
                    <div className="form-group">
                      <label className="form-label">
                        Question{" "}
                        {questionError && (
                          <span
                            style={{
                              color: "tomato",
                              fontWeight: "600",
                              fontSize: "small",
                            }}
                          >
                            *required field
                          </span>
                        )}
                      </label>

                      <div
                        style={{ height: "150px" }}
                        className="mb-0"
                        data-toggle="quill"
                        data-quill-placeholder="Question"
                      >
                        <ReactQuill
                          readOnly={enableEditQuestion}
                          style={{ height: "100px" }}
                          value={questionDescription}
                          onChange={(value: string) => {
                            setQuestionDescription(value);
                            saveChangeBtn();
                          }}
                          placeholder="Enter your question description here..."
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Completion Points
                        {pointsError && (
                          <span
                            style={{
                              color: "tomato",
                              fontWeight: "600",
                              fontSize: "small",
                            }}
                          >
                            *invalid points
                          </span>
                        )}
                      </label>
                      <input
                        style={{
                          border: `${
                            pointsError ? "2px solid tomato" : "none"
                          }`,
                        }}
                        disabled={enableEditQuestion}
                        onChange={(e: any) => setPoints(e.target.value)}
                        type="text"
                        className="form-control"
                        value={points}
                      />
                    </div>
                    <div className="mb-3">
                      {!isQuestionCreated && (
                        <button
                          onClick={handleCreateQuestion}
                          style={{
                            outline: "none",
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <a href="#" className="btn btn-outline-secondary">
                            Add Question
                          </a>
                        </button>
                      )}
                      {isQuestionCreated && (
                        <>
                          {enableEditQuestion ? (
                            <button
                              onClick={() => setEnableEditQuestion(false)}
                              style={{
                                outline: "none",
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <a href="#" className="btn btn-outline-secondary">
                                Edit Question
                              </a>
                            </button>
                          ) : (
                            <button
                              onClick={updateQuizQuestion}
                              style={{
                                outline: "none",
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <a href="#" className="btn btn-outline-secondary">
                                save Question
                              </a>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {isQuestionCreated && (
                      <>
                        <div className="form-group">
                          <label className="form-label">
                            Add Choices{" "}
                            {choiceError && (
                              <span
                                style={{
                                  color: "tomato",
                                  fontWeight: "600",
                                  fontSize: "small",
                                }}
                              >
                                *required field
                              </span>
                            )}
                          </label>

                          <input
                            value={choiceDescription}
                            minLength={10}
                            onChange={(event) =>
                              setChoiceDescription(event.target.value)
                            }
                            className="form-control mb-3"
                            placeholder="Enter your choice here..."
                          />
                          <select
                            value={choiceAnswer}
                            style={{
                              border: `${
                                choiceAnswerError ? "2px solid tomato" : "none"
                              }`,
                            }}
                            onChange={(e: any) =>
                              setChoiceAnswer(e.target.value)
                            }
                            name="category"
                            className="form-control custom-select mb-3"
                          >
                            <option value="">Select an answer</option>
                            <option value="true">Correct</option>
                            <option value="false">Incorrect</option>
                          </select>
                          <div>
                            <button
                              onClick={handleCreateChoice}
                              style={{
                                outline: "none",
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <a href="#" className="btn btn-outline-secondary">
                                Add Choice
                              </a>
                            </button>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="select01">
                            Answers
                          </label>
                          <select
                            id="select01"
                            data-toggle="select"
                            data-multiple="true"
                            multiple
                            className="form-control"
                          >
                            {choices.map((option: any, index: any) => (
                              <option key={index} value={option}>
                                {option.text}
                                <RiDeleteBin6Line
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "60px",
                                    position: "absolute",
                                  }}
                                  onClick={() =>
                                    handleDeleteOption(option.text)
                                  }
                                />
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                    {isQuestionCreated && (
                      <div>
                        <button
                          onClick={newQuestion}
                          style={{
                            outline: "none",
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <a href="#" className="btn btn-outline-secondary">
                            new Question
                          </a>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "auto" }}>
                  <div className="card-header text-center">
                    {changeModulBtn ? (
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          width: "150px",
                        }}
                      >
                        <a
                          onClick={clearInputs}
                          href="#"
                          className="btn btn-accent"
                        >
                          save module
                        </a>
                      </button>
                    ) : (
                      <button
                        disabled={disableSaveChanges}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          width: "150px",
                        }}
                      >
                        <a
                          onClick={createModule}
                          href="#"
                          className="btn btn-accent"
                        >
                          save changes
                        </a>
                      </button>
                    )}
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" href="#">
                        <strong>Include Quiz?</strong>
                      </a>
                      <input
                        type="checkbox"
                        checked={includeQuiz}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setIncludeQuiz(e.target.checked);
                          } else {
                            setIncludeQuiz(e.target.checked);
                            setToggler(1);
                          }
                        }}
                      />
                    </div>
                    {/*Quiz Content Ends Here*/}

                    <div className="list-group-item d-flex">
                      <a href="#" className="flex">
                        <strong>Include Documents?</strong>
                      </a>
                      <input
                        type="checkbox"
                        checked={includeDocument}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setIncludeDocument(e.target.checked);
                          } else {
                            setIncludeDocument(e.target.checked);
                            setToggler(1);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // END Page Content */}
      </div>
    </div>
  );
};
