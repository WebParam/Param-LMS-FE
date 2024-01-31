"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { FaBullseye, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
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
  IDeleteVideo,
  IModule,
  IUpdateModuleDetailState,
} from "@/app/interfaces/courses";
import { Api } from "@/app/lib/restapi/endpoints";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { addChoices, createQuestion, createQuizDetail, deleteQuestion, getSelectedQuizForEdit, updateChoiceDetail, updateQuestionDetails } from "@/app/redux/quizSlice";
import { IChoice, IQuestion, IQuiz, IUpdateQuestionDetailState, IUpdateQuizDetailState } from "@/app/interfaces/quiz";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";

interface EditCourseModalProps {
  onClose: () => any;
  sectionId: string;
  ModuleId: any;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  onClose,
  sectionId,
  ModuleId,
}) => {
  const [showVideoInputs, setShowVideoInputs] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([]);
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const dispatch = useDispatch();
  const _courseFromState: ICourse = useSelector(
    getSelectedCourseForEdit
  ).course;
  const [changeModulBtn, setChangeModulBtn] = useState<boolean>(false);
  const [disableSaveChanges, setDisableSaveChanges] = useState<boolean>(true);
  const [selectedModule, setSelectedModule] = useState<any>([]);
  const [selectedVideos, setSelectedVideo] = useState<any>([]);
  const [changeVidBtn, setChangeVidBtn] = useState<boolean>(true);
  const [videoId, setVideoId] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");
  const [choiceAnswerError, setChoiceAnswerError] = useState(false);
  const [choiceAnswer, setChoiceAnswer] = useState<string>(""); // Can be boolean or string
  const [choiceError, setChoiceError] = useState(false);
  const [toggler, setToggler] = useState<Number>(2);
  const [includeQuiz, setIncludeQuiz] = useState<boolean>(false);
  const [includeDocument, setIncludeDocument] = useState<boolean>(false);
  const [questionError, setQuestionError] = useState(false);
  const [choiceDescription, setChoiceDescription] = useState<string>("");
  const [questionDescription, setQuestionDescription] = useState<string>("");

  const [moduleId, setModuleId] = useState("");
  const [lastSection, setLastSection] = useState<number>(-1);
  const [points, setPoints] = useState<number>(0);
  const [documentName, setDocumentName] = useState<string>();
  const [countChoice, setCountChoices] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [moduleReference, setModuleReference] = useState<any>("");
  const [openChoices, setOpenChoices] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<IQuestion>();
  const [expandedModule, setExpandedModule] = useState(null);
  const [choiceId, setChoiceId] = useState<string>("");
  const [selectedQuestionForEdit, setSelectedQuestionForEdit] = useState<IQuestion>();
  const _quizFromState: IQuiz = useSelector(getSelectedQuizForEdit).quiz;
  const selectedCourse = useSelector(getSelectedCourseForEdit).course;

  const [modules, setModules] = useState<IModule[]>([]);
  const [choices, setChoices] = useState<any>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [choicesToEdit, setChoicesToEdit] = useState<any>([]);
  const [isModuleSaved, setIsModuleSaved] = useState<boolean>(false);
  const [hideCreateModuleSection, setHideCreateModuleSection] = useState(false);
  const [isQuestionCreated, setIsQuestionCreated] = useState<boolean>(false);
  const [enableEditQuestion, setEnableEditQuestion] = useState<boolean>(false);
  const [pointsError, setPointsError] = useState(false);
  const [editQuizQuestion, setEditQuizQuestion] = useState<boolean>(false);
  const [changeEditQuizQuestionContent, setChangeEditQuizQuestionContent] = useState(false)
  const [enableUpdateChoice, setEnableUpdateChoice] = useState(false);
  const [viewCreatedQuestion, setViewCreatedQuestion] = useState(true);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([])

  const cookies = new Cookies();
  const userData = cookies.get("param-lms-user");
  const courseId = cookies.get("courseId");

  const moduleToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const clearInputs = () => {
    setModuleTitle("");
    setModuleDescription("");
    setVideoUrl("");
    setVideoTitle("");

    setIsModuleSaved(false);
    setHideCreateModuleSection(true);
    setChangeModulBtn(false);
    setVideos([]);
  };
  const handleModuleClick = (module: any) => {
    if (expandedModule === module.id) {
      setExpandedModule(null);
    } else {
      setExpandedModule(module.id);
    }
  };

  const generateUniqueId = () => {
    return "xxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
      return ((Math.random() * 16) | 0).toString(16);
    });
  };
  const tabSelect = (id: Number, e: any) => {
    setToggler(id);
    e.preventDefault();
  };

  const deleteVideoHandler = async (moduleId: any, videoId: any) => {
    const payload = {
      courseId: courseId,
      sectionId: sectionId,
      moduleId: moduleId,
      videoId: videoId,
    } as IDeleteVideo;

    const deleteVideo = await Api.DELETE_DeleteVideo(payload);
    let _id = toast.loading("Deleting video..", {
      //loader
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    try {
      if (deleteVideo) {
        toast.update(_id, {
          render: "successfully deleted video",
          type: "success",
          isLoading: false,
        });
        dispatch(deleteVideoFromModule({ moduleId, videoId }));
        setTimeout(() => {
          toast.dismiss(_id);
        }, 2000);
        return;
      }
    } catch (error) {
      toast.update(_id, {
        render: "Error deleting  video",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    }
  };

  const editModule = () => {
    const plainDescription = moduleDescription
      ? moduleDescription.replace(/<\/?p>/gi, "")
      : _courseFromState.description;

    const payload = {
      moduleId: ModuleId,
      sectionId: sectionId,
      title: moduleTitle,

      description: plainDescription,
    };

    console.log("payload: ", payload);

    dispatch(updateModuleDetail(payload));

    console.log("COURSE", _courseFromState);
    console.log(sectionId);
    onClose();
  };

  useEffect(() => {
    const section = _courseFromState.sections.find(
      (section) => section.id === sectionId
    );
    if (section) {
      const module = section.modules.find((module) => module.id === ModuleId);
      if (module) {
        setSelectedModule(module);
        setModuleTitle(module.title);
        setModuleDescription(module.description);
        setSelectedVideo(module.videos);
       setModules([...modules,module])
      }
    }
  }, [sectionId, ModuleId, _courseFromState.sections]);

  useEffect(() => {
    // This effect will run whenever selectedModule.title changes
    // and update the moduleTitle state with the latest selectedModule.title
    setModuleTitle(selectedModule.title);
    setModuleDescription(selectedModule.description);
  }, [selectedModule.title, selectedModule.description]);

  const AddVideo = () => {
    const payload = {
      moduleId: ModuleId,
      videoTitle: videoTitle,
      videoLink: videoUrl,
    };

    dispatch(addVideoToModule(payload));

    setVideos([...videos, payload]);
    setShowVideoInputs(!showVideoInputs);
    setVideoTitle("");
    setVideoUrl("");
    console.log("COURSE", _courseFromState);
    setChangeModulBtn(true);
  };
  const editVideo = (id: string) => {
    const payload = {
      moduleId: ModuleId,
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
  const cursorStyle = (predicate: boolean) =>
    predicate ? "pointer" : "not-allowed";


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: string = event.target.value;
    setChoiceAnswer(selectedValue); // Set the state
  };
  const saveChangeBtn = () => {
    if (moduleDescription && moduleTitle) {
      setDisableSaveChanges(false);
    }
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

  //Quiz Functions starts here
  const addQuiz = (e: any) => {
    setIncludeQuiz(false);
    if (modules.length === 0) {
      let _id = toast.loading("Please add module first..", {
        //loader
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIncludeQuiz(false);

      toast.update(_id, {
        render: "Please add module first",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    } else {
      setIncludeQuiz(e.target.checked);
      setIncludeQuiz(true);
      handleCreateQuiz();
      setToggler(2);
    }
  };

  const selectQuestionForEdit = (id: string) => {
    setViewCreatedQuestion(true);
    setEnableEditQuestion(!enableEditQuestion);
    setDisableSaveChanges(false);
    setChangeEditQuizQuestionContent(true)

    const hasQuestion = questions.filter(
      (question: IQuestion) => question.id === id
    );
    setQuestionDescription(hasQuestion[0].questionDescription);
    setPoints(hasQuestion[0].points);
    setQuestionId(hasQuestion[0].id);
  };

  const selectChoiceForEdit = (id: string) => {
    setEnableUpdateChoice(true);
    const hasChoice = choicesToEdit.filter(
      (choice: IChoice) => choice.id === id
    );
    setChoiceDescription(hasChoice[0].choiceDescription);
    setChoiceId(hasChoice[0].id);
    setQuestionId(hasChoice[0].questionId);
    setChoiceAnswer(hasChoice[0].choiceAnswer);
    console.log(hasChoice[0].id);
  };

  const handleCreateQuiz = () => {
    const payload = {
      reference: moduleReference,
      createdByUserId: userData?.id,
      modifiedByUserId: userData?.id,
      createdDate: date,
      moduleId: moduleId,
    } as IUpdateQuizDetailState;

    dispatch(createQuizDetail(payload));
  };

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
      questionDescription: plainDescription,
      points: points,
    } as IQuestion;
    dispatch(createQuestion(payload));
    setIsQuestionCreated(true);
  };

  const deleteQuestionFromState = (id:string) => {
    if(id){
      dispatch(deleteQuestion(id));
      console.log("New Quiz after updating the question", _quizFromState);

    }
  }

  const updateQuizQuestion = function () {
    setEnableEditQuestion(true);
    const plainDescription =
      questionDescription && questionDescription.replace(/<\/?p>/gi, "");
    const payload = {
      questionId: questionId,
      questionDescription: plainDescription,
      points: points,
    } as IUpdateQuestionDetailState;

    dispatch(updateQuestionDetails(payload));
    console.log("New Quiz after updating the question", _quizFromState);
  };

  const editChoice = () => {
    setChoiceError(false);
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
      choiceId: choiceId,
      choiceDescription: choiceDescription,
      isCorrect: choiceAnswer,
    };
    dispatch(updateChoiceDetail(payload));
    setEnableUpdateChoice(false);
    setChoiceAnswer("");
    setChoiceDescription("");
    setCountChoices(countChoice);

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
      choiceDescription: choiceDescription,
      isCorrect: choiceAnswer,
    } as IChoice;
    dispatch(addChoices(payload));

    setChoiceAnswer("");
    setChoiceDescription("");
  };

  const newQuestion = () => {
    const quizQuestions = _quizFromState.questions.map(
      (questions) => questions
    );

    quizQuestions.forEach((question) => {
      if (question.choices.length > 0) {
        setQuestions(_quizFromState.questions);
        setQuizzes((prevQuizzes) =>
          Array.isArray(prevQuizzes)
            ? [...prevQuizzes, _quizFromState]
            : [_quizFromState]
        );
      }
    });
if(changeEditQuizQuestionContent){
  setEditQuizQuestion(false)
  setChangeEditQuizQuestionContent(false);
}
setChangeEditQuizQuestionContent(false);
    setIsQuestionCreated(false);
    setEnableEditQuestion(!enableEditQuestion);
    setViewCreatedQuestion(false);
    setChoices([]);
    setQuestionDescription("");
    setPoints(0);
    setChoiceDescription("");
    setChoiceAnswer("");

    console.log("New Quiz before updating the question", _quizFromState);
  };
  const nextQuestion = () => {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  }

  const prevQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };
  //Quiz Functions ends here

  //Dcoument functions start here
  const formData = new FormData();
  const handleDocument = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      formData.append("document", file);
      setDocumentName(file.name);
    }
  };
  const addDocument = (e: any) => {
    setIncludeDocument(false);
    if (modules.length === 0) {
      let _id = toast.loading("Please add module first..", {
        //loader
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIncludeDocument(false);

      toast.update(_id, {
        render: "Please add module first",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    } else {
      setIncludeDocument(true);
      setToggler(3);
      setIncludeDocument(e.target.checked);
    }
  };
  //Document functions ends here

  return (
    <div
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
                  <strong className="card-title">Edit Module</strong>
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
                  <strong className="card-title">Edit Quiz</strong>
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
                  <strong className="card-title">Edit Document</strong>
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
                    ? "Edit Module"
                    : toggler === 2
                    ? "Edit Quiz"
                    : "Edit Document"}
                </h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Module</li>
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

                <label className="form-label">Module title</label>
                <div className="form-group mb-24pt">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Module Title"
                    value={moduleTitle}
                    onChange={(e) => {
                      setModuleTitle(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">module title guideline</a>
                  </small>
                </div>
                <label className="form-label">Module Description</label>
                {/*<div style={{ height: '200px', overflow: 'auto' }}>
  <ReactQuill
    style={{ height: '100px' }}
    value={moduleDescription}
    onChange={(value) => {

      setModuleDescription(value); // Pass the new description
    

    }}
    placeholder="Module description..."
    modules={moduleToolbar}
  />
  </div>*/}

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
                              src="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                              //   allowFullScreen=""
                            />
                          </div>
                          <div className="card-body">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Video Title"
                              value={video.title}
                              onChange={(e) => setVideoTitle(e.target.value)}
                            />
                            <small className="form-text text-muted">
                              Enter a valid video title.
                            </small>
                          </div>
                          <div className="card-body">
                            <label className="form-label">URL</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                              placeholder="Enter Video URL"
                              value={video.url}
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
                                  deleteVideoHandler(ModuleId, video.id)
                                }
                                style={{ cursor: "pointer" }}
                              />
                              <FaPencilAlt
                                onClick={() => {
                                  setVideoId(video.id);
                                  setChangeVidBtn(false);
                                  setShowVideoInputs(!showVideoInputs);
                                }}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "5px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
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
              </div>

              {
            !viewCreatedQuestion &&    <div
            className={
              toggler === 2 ? "col-md-8" : "col-md-8 d-md-none"
            }
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
                          Question {questionNumber} of{" "}
                          {questions?.length}
                        </div>
                        <div className="card-subtitle text-70 paragraph-max mb-16pt">
                          {questions?.length > 0 &&
                            questions[questionNumber - 1]
                              ?.questionDescription}
                        </div>
                        <div>
                          <a
                            onClick={() =>
                              setOpenChoices((prev) => !prev)
                            }
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
                                {questions[
                                  questionNumber - 1
                                ].choices.map(
                                  (option: any, index: any) => (
                                    <option key={index} value={option}>
                                      {option.choiceDescription}
                                      <RiDeleteBin6Line
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "60px",
                                          position: "absolute",
                                        }}
                                   
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
                            onClick={() => {
                              selectQuestionForEdit(
                                questions[questionNumber - 1].id
                              );
                              setEditQuizQuestion(true);
                              setQuestionToEdit(
                                questions[questionNumber - 1]
                              );
                              setSelectedQuestionForEdit(
                                questions[questionNumber - 1]
                              );
                            }}
                          >
                            Edit Question
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              deleteQuestionFromState( questions[questionNumber - 1].id)
                              setQuestionToEdit(
                                questions[questionNumber - 1]
                              );
                            }}
                          >
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
                        <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
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
                        <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
                          prev
                        </a>
                      </button>
                    </li>
                  </ul>
                )}

          </div>
           }
           {!editQuizQuestion && (
                <>
                  <div
                    className={
                      toggler === 2 ? "col-md-8" : "col-md-8 d-md-none"
                    }
                  >
                 
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
                                  <a
                                    href="#"
                                    className="btn btn-outline-secondary"
                                  >
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
                                  <a
                                    href="#"
                                    className="btn btn-outline-secondary"
                                  >
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
                                    choiceAnswerError
                                      ? "2px solid tomato"
                                      : "none"
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
                                {!enableUpdateChoice ? (
                                  <button
                                    onClick={handleCreateChoice}
                                    style={{
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="btn btn-outline-secondary"
                                    >
                                      Add Choice
                                    </a>
                                  </button>
                                ) : (
                                  <button
                                    onClick={editChoice}
                                    style={{
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="btn btn-outline-secondary"
                                    >
                                      Update choice
                                    </a>
                                  </button>
                                )}
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
                                {choices?.map((option: IChoice, index: any) => (
                                  <option
                                    onClick={() =>
                                      selectChoiceForEdit(option?.id)
                                    }
                                    key={index}
                                    value={option?.isCorrect}
                                  >
                                    {option?.choiceDescription}
                                    <RiDeleteBin6Line
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "60px",
                                        position: "absolute",
                                      }}
                                   
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
                </>
              )}

              {editQuizQuestion && (
                <>
                  <div
                    className={
                      toggler === 2 ? "col-md-8" : "col-md-8 d-md-none"
                    }
                  >
                    <div>
                      <div className="page-separator">
                        <div className="page-separator__text">Edit Question</div>
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
                          {isQuestionCreated && (
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
                          {!isQuestionCreated && (
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
                                  <a
                                    href="#"
                                    className="btn btn-outline-secondary"
                                  >
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
                                  <a
                                    href="#"
                                    className="btn btn-outline-secondary"
                                  >
                                    save Question
                                  </a>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {!isQuestionCreated && (
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
                                    choiceAnswerError
                                      ? "2px solid tomato"
                                      : "none"
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
                                {!enableUpdateChoice ? (
                                  <button
                                    onClick={handleCreateChoice}
                                    style={{
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="btn btn-outline-secondary"
                                    >
                                      Add Choice
                                    </a>
                                  </button>
                                ) : (
                                  <button
                                    onClick={editChoice}
                                    style={{
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="btn btn-outline-secondary"
                                    >
                                      Update choice
                                    </a>
                                  </button>
                                )}
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
                                {choicesToEdit?.map(
                                  (option: IChoice, index: any) => (
                                    <option
                                      onClick={() =>
                                        selectChoiceForEdit(option.id)
                                      }
                                      key={index}
                                      value={option?.isCorrect}
                                    >
                                      {option?.choiceDescription}
                                      <RiDeleteBin6Line
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "60px",
                                          position: "absolute",
                                        }}
                                      
                                      />
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </>
                        )}
                        {!isQuestionCreated && (
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
                </>
              )}

              <div
                className={toggler === 3 ? "col-md-8" : "col-md-8 d-md-none"}
              >
                <div className="form-group m-0">
                  <div className="custom-file">
                    <input
                      type="file"
                      id="file"
                      onChange={handleDocument}
                      className="custom-file-input"
                    />
                    <label className="custom-file-label">Choose file</label>
                  </div>
                </div>

                <p style={{ color: "rgba(39,44,51,.35)", paddingTop: "10px" }}>
                  {documentName}
                </p>
              </div>

              <div className="col-md-4">
                <div className="card" style={{ width: "auto" }}>
                  <div className="card-header text-center">
                     <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          width: "150px",
                        }}
                      >
                        <a
                          onClick={editModule}
                          href="#"
                          className="btn btn-accent"
                        >
                          save module
                        </a>
                      </button>
                  </div>

                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" href="#">
                        <strong>Include Quiz?</strong>
                      </a>
                      <input
                        type="checkbox"
                        checked={includeQuiz}
                        onChange={addQuiz}
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
                        onChange={addDocument}
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
