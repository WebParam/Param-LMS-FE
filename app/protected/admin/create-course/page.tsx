"use client";
import { CreateCourseModal } from "./create-module-modal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { FaPlus, FaVideo } from "react-icons/fa";
import {
  addSection,
  deleteSection,
  getSelectedCourseForEdit,
  createCourseDetail,
  updateSectionDetail,
  deleteAllSections,
  addModuleToSection,
  deleteVideoFromModule,
} from "@/app/redux/courseSlice";
import dynamic from "next/dynamic";
import {
  ICourse,
  IModule,
  ISection,
  IUpdateCourseDetailState,
  IUpdateSectionDetailState,
  IVideo,
} from "@/app/interfaces/courses";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { useEffect } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { FaTrash } from "react-icons/fa";
import { EditCourseModal } from "./edit-module-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie"; // Import the library
import Dropdown from "react-bootstrap/Dropdown";
import "react-quill/dist/quill.snow.css";
import { IQuiz } from "@/app/interfaces/quiz";
import { getSelectedQuizForEdit } from "@/app/redux/quizSlice";
import { IDocument } from "@/app/interfaces/document";
import { getSelectedDocumentForEdit } from "@/app/redux/documentSice";
import { CreateCourseAssessmentModal } from "./create-assessment";
import { IAssessment } from "@/app/interfaces/assessment";
import { createAssessmentDetail, getSelectedAssessmentForEdit } from "@/app/redux/assessmentSlice";


// Define interface for ReactQuill props
interface ReactQuillProps {
  style?: React.CSSProperties;
  value?: string;
  onChange?: any;
  placeholder?: string;
  modules?: any;
}

const ReactQuillWrapper = ({
  style,
  value,
  onChange,
  placeholder,
  modules,
}: ReactQuillProps) => {
  const [ReactQuillComponent, setReactQuillComponent] = useState<any>(
    () => () => null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill")
        .then((module) => {
          setReactQuillComponent(() => module.default);
        })
        .catch((error) => {
          console.error("Error loading ReactQuill module:", error);
        });
    }
  }, []);

  if (!ReactQuillComponent) return null;

  return (
    <ReactQuillComponent
      style={style}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
    />
  );
};

function EditCourse() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editModuleModalOpen, setEditModuleModalOpen] =
    useState<boolean>(false);
    const [createAssessmentModalOpen, setCreateAssessmentModuleModalOpen] =
    useState<boolean>(false);
  const [competency, setCompetency] = useState<string>("");
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [disableSectionInput, setDisableSectionInput] =
    useState<boolean>(false);
  const [changeBtn, setChangeBtn] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState("");
  const _courseFromState: ICourse = useSelector(
    getSelectedCourseForEdit
  ).course;
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [disableCreateCourseBtn, setDisableCreateCourseBtn] =
    useState<boolean>(true);
  const [updateSection, setUpdateSection] = useState<boolean>(true);
  const [newSection, setNewSection] = useState<boolean>(true);
  const [sectionBtn, setSectionBtn] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<any>();
  const _quizzesFromState: any[] = useSelector(getSelectedQuizForEdit).quizzes;
  const [imgError, setImgError] = useState(false);
  const [moduleId, setModuleId] = useState<string>("");
  const [formData, setFormData] = useState(new FormData());
  const [arrayOfDocuments, setArrayOfDocuments] = useState<any[]>([]);
  const [instructorName, setInstructorName] = useState<string>("");

  const [videoId, setVideoId] = useState<string>("");
  const _documentsFromState: IDocument[] = useSelector(getSelectedDocumentForEdit);
  const _assessmentFromState : IAssessment = useSelector(getSelectedAssessmentForEdit).assessment
  console.log("Course", _courseFromState);
    console.log("Assessment", _assessmentFromState);

  console.log("Quizzes from state", _quizzesFromState);

  let cookies = new Cookies();
  useEffect(() => {
    console.log("Array of documents", arrayOfDocuments);
  }, [arrayOfDocuments]);
  
  const userData = cookies.get("param-lms-user");
  console.log("userDataID:", userData?.id);
  const dispatch = useDispatch();

  console.log("UserData", userData?.id);

  const descriptionToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  useEffect(() => {
    console.log("Array of documents:", arrayOfDocuments);
  }, [arrayOfDocuments]);



  const payload = {
    creatingUser: userData?.id,
    title: courseTitle ?? _courseFromState.title,
    description: courseDescription 
  };

  const logOut = () => {
    cookies.remove("param-lms-user");
    // Optionally, you can redirect the userto another page
    window.location.href = "/auth/login";
  };
  function saveAndCloseEditModal() {
    setEditModalOpen(false);
    clearSectionContent();
  }

  function saveAndCloseEditModuleModal() {
    setEditModuleModalOpen(false);
  }
  function saveAndCloseCreateAssessmentModuleModal() {
    setEditModuleModalOpen(false);
  }

  const updateCourseSection = function () {
    const payload = {
      sectionId: sectionId,
      title: sectionTitle,
      competency: competency,
    } as IUpdateSectionDetailState;

    dispatch(updateSectionDetail(payload));
    setDisableSectionInput(false);
    setUpdateSection(true);
  };

  const selectSection = (id: string) => {
    const selectedSection = selectedCourse.sections.find(
      (section: any) => section.id === id
    );
    if (selectedSection) {
      setSectionTitle(selectedSection.title);
      setSectionId(selectedSection.id);
      setCompetency(selectedSection.competency);
      if (selectedSection.modules.length > 0) {
        setNewSection(false);
      }
    }
    setDisableSectionInput(true);
    setChangeBtn(true);
  };

  const selectedCourse = useSelector(getSelectedCourseForEdit).course;
  const [expandedSection, setExpandedSection] = useState(null);

  const handleSectionClick = (section: any) => {
    if (expandedSection === section.id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section.id);
    }
  };

  useEffect(() => {
    setCourseDescription(_courseFromState.description);
    setCourseTitle(_courseFromState.title);
  }, []);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(file);
      console.log("Image selected: " + file);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(e.target.value);
    dispatch(createCourseDetail(payload));
  };



  async function createCourse() {
   const plainDescription = courseDescription ? courseDescription.replace(/<(?:\/)?[sp]+[^>]*>/g, '') : _courseFromState.description.replace(/<(?:\/)?[sp]+[^>]*>/g, '');

    dispatch(createCourseDetail({...payload,description: plainDescription}))
    debugger;
    setImgError(false);
    setDisableCreateCourseBtn(true);
    if (!imageUrl) {
      setImgError(true);
      return;
    }

    let _id = toast.loading("Saving course...", {
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

  const _formData = new FormData();
  const formDataArray = _documentsFromState.forEach((document,i) => {
    console.log(`Appended key: ${JSON.stringify(document)} with value: ${document.file}`)
    const req = {...document, file:""};
    _formData.append(JSON.stringify(req), document.file)});     
       const createCourseResponse = await Api.POST_CreateCourse(
        _courseFromState
      )!;

      if (createCourseResponse?.data?.id) {
        const assessment = {
          courseId : createCourseResponse?.data?.id, 
         questions  :_assessmentFromState.questions,
          createdByUserId  : _assessmentFromState.createdByUserId,
         createdDate  : _assessmentFromState.createdDate,
         modifiedByUserId  : _assessmentFromState.modifiedByUserId, 
         modifiedAt  : _assessmentFromState.modifiedAt, 
          dueDate  : _assessmentFromState.dueDate,
          courseTitle: courseTitle,
          instructorName:"John Doe",
          instructorId:"656f1335650c740ce0ae4d65",
          status : _assessmentFromState.status


        }

        const postAssessment = await Api.POST_AddAssessments(assessment);
        debugger;
        const uploadDocuments = await Api.POST_Document(_formData);
        const courseId: string = createCourseResponse.data?.id!;
        const uploadImageResponse = await Api.POST_Image(courseId, formData);
        const extractedVideo = createCourseResponse?.data?.sections.reduce(
          (accumulator: IVideo[], section: any) => {
            const videosInModules = section.modules.reduce(
              (moduleAccumulator: IVideo[], module: any) => {
              return moduleAccumulator.concat(module.videos);
              },
              []
            );
            return accumulator.concat(videosInModules);
          },
          []
        );

        const updatedQuizzes = await Promise.all(
          _quizzesFromState
          .filter((quiz: IQuiz) => quiz.questions.length > 0) 
          .map(async (quiz: IQuiz) => {
            try {
              const matchingVideo = extractedVideo?.find(
                (video: IVideo) => video.reference === quiz.reference
              );
              if (matchingVideo) {
                const newQuiz = { ...quiz, videoId: matchingVideo.id };
                return newQuiz;
              }
              return quiz;
            } catch (error) {
              console.error("Error updating quiz:", error);
              return quiz;
            }
          })
        );

        const uploadQuizzes = await Api.POST_Quiz(updatedQuizzes);

        toast.update(_id, {
          render: "Successfully saved course",
          type: "success",
          isLoading: false,
        });

        setTimeout(() => {
          localStorage.removeItem("persist:course")
          dispatch(deleteAllSections());
          setCourseTitle("");
          setCourseDescription("");
          setCompetency("");
          toast.dismiss(_id);
          setDisableCreateCourseBtn(false);
        }, 2000);
      } else {
        toast.update(_id, {
          render: "Failed to save course",
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(_id);
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.update(_id, {
        render: "Error saving course",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisableCreateCourseBtn(false);
        toast.dismiss(_id);
      }, 2000);
    }
  }

  const createSection = function () {
    if (sectionTitle.length > 0) {
      setSectionBtn(false);
      const payload = {
        sectionTitle: sectionTitle,
        sectionCompetency: competency,
      };
      console.log("payload: ", payload);

      dispatch(addSection(payload));
      setDisableSectionInput(true);
      setChangeBtn(!changeBtn);
    }
  };

  const createModule = () => {
    const payload = {
      sectionId: sectionId,
    };

    if (sectionId) {
      dispatch(addModuleToSection(payload));
    }
  };



  const clearSectionContent = () => {
    setSectionTitle("");
    setCompetency("");
    setChangeBtn(false);
    setDisableSectionInput(false);
    setNewSection(true);
  };
  1;
  const handleDeleteVideo = (videoId: any) => {
    dispatch(deleteVideoFromModule({ moduleId, videoId }));
  };

  const handleDeleteSection = (sectionId: any) => {
    clearSectionContent();
    dispatch(deleteSection(sectionId));
    setDisableSectionInput(false);
    setNewSection(true);
  };

  const createAssessment = () => {
    const payload = {
      dueDate : "",
    }
    if(_assessmentFromState.courseId === ""){
      dispatch(createAssessmentDetail(payload));
    }
  }

  useEffect(() => {
    const sectionIds = _courseFromState?.sections?.map((section) => section.id);
    const lastSectionId = sectionIds[sectionIds?.length - 1];
   setSectionId(lastSectionId);
    if (sectionId?.length > 0) {
      setDisableCreateCourseBtn(false);
    }
  },[_courseFromState?.sections]);

  useEffect(() => {
    formData.append("file", imageUrl);
  }, [imageUrl]);



  const customModalStyles = {
    modal: {
      maxWidth: "60%",
      width: "100%",
      marginTop:"20px",
      marginLeft:"50px"
    },
  };

  return (
    <div
      id="test"
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push=""
      data-responsive-width="992px"
      data-domfactory-upgraded="mdk-cdrawer-layout"
    >
      <ToastContainer />

      <div>
        <Modal
          styles={customModalStyles}
          open={editModuleModalOpen}
          onClose={() => {
            setEditModuleModalOpen(false);
            setNewSection(true);
            setUpdateSection(false);
            clearSectionContent();
          }}
          center
        >
          <EditCourseModal
            videoId={videoId}
            moduleId={moduleId}
            sectionId={sectionId}
            onClose={saveAndCloseEditModuleModal}
          />
          {/* <EditCourseModal /> */}
        </Modal>

        <Modal
          styles={customModalStyles}
          open={createAssessmentModalOpen}
          onClose={() => {
            setCreateAssessmentModuleModalOpen(false);
          
          }}
          center
        >
          <CreateCourseAssessmentModal
            onClose={saveAndCloseCreateAssessmentModuleModal}
          />
          {/* <EditCourseModal /> */}
        </Modal>

        
        <Modal
          styles={customModalStyles}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          center
        >
          <CreateCourseModal
            sectionId={sectionId}
            onClose={saveAndCloseEditModal}
          />
          {/* <EditCourseModal /> */}
        </Modal>
      </div>
      <div
        className="mdk-drawer-layout__content page-content"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
    
        <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">Create Course</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a >Home</a>
                  </li>
                  <li className="breadcrumb-item active">Create Course</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section border-bottom-2">
          <div className="container page__container">
            <div className="row">
              <div className="col-md-8">
                <div className="page-separator">
                  <div className="page-separator__text">Basic information</div>
                </div>
                <label className="form-label">Course title</label>
                <div className="form-group mb-24pt">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Course title"
                    value={courseTitle}
                    onChange={handleTitleChange}
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">course title guideline</a>
                  </small>
                </div>

                <label className="form-label">Course Description</label>

                <div style={{ height: "140px" ,    backgroundColor: "white", marginBottom:"2em"}}>
                  <div style={{ height: "200px", overflow: "auto",  }}>
                    <ReactQuillWrapper
                      style={{ height: "100px" }}
                      value={courseDescription}
                      onChange={(value:string) => {
                        setCourseDescription(value)
                      }}
                      placeholder="Module description..."
                      modules={descriptionToolbar}

                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "5px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="page-separator"
                >
                  <div className="page-separator__text">Sections</div>
                  <div>
                    {newSection ? null : (
                      <FaPlus
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          clearSectionContent();
                          setNewSection(!newSection);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div
                  className="accordion js-accordion accordion--boxed mb-24pt"
                  id="parent"
                >
                  {selectedCourse.sections.map((section: ISection) => (
                    <div
                      className={`accordion__item ${
                        expandedSection === section.id ? "open" : ""
                      }`}
                      key={section.id}
                    >
                      <a
                        style={{ cursor: "pointer" }}
                        className="accordion__toggle"
                        data-toggle="collapse"
                        data-target={`#course-toc-${section.id}`}
                        data-parent="#parent"
                        onClick={() => handleSectionClick(section)}
                      >
                        <span
                          onClick={() => {
                            selectSection(section.id);
                          }}
                          style={{ cursor: "pointer" }}
                          className="flex"
                        >
                          {section.title}
                        </span>
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <FaTrash />
                        </button>

                        <span className="accordion__toggle-icon material-icons">
                          keyboard_arrow_down
                        </span>
                      </a>
                      <div
                        className={`accordion__menu collapse ${
                          expandedSection === section.id ? "show" : ""
                        }`}
                        id={`course-toc-${section.id}`}
                      >
                        {section.modules?.map((Module) =>
                          Module.videos.map((video: IVideo) => (
                            <div
                              style={{ cursor: "pointer" }}
                              className="accordion__menu-link"
                              key={video.id}
                            >
                              <FaVideo
                                onClick={() => {
                                  setModuleId(Module.id);
                                  setEditModuleModalOpen(true);
                                  setSectionId(section.id);
                                  setVideoId(video.id);
                                }}
                                className="video-icon"
                              />
                              <a
                                style={{ marginLeft: "8px" }}
                                className="flex"
                                onClick={() => {
                                  setModuleId(Module.id);
                                  setEditModuleModalOpen(true);
                                  setSectionId(section.id);
                                  setVideoId(video.id);
                                }}
                              >
                                {video.title}
                              </a>
                              <span className="text-muted">
                                <button
                                  onClick={() => handleDeleteVideo(video.id)}
                                  style={{
                                    backgroundColor: "white",
                                    border: "none",
                                    outline: "none",
                                  }}
                                >
                                  <FaTrash />
                                </button>
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="accordion js-accordion accordion--boxed mb-24pt"
                  id="parent"
                  data-domfactory-upgraded="accordion"
                >
                  <div className="accordion__item open">
                    <a
                      className="accordion__toggle"
                      data-toggle="collapse"
                      data-target="#course-toc-2"
                      data-parent="#parent"
                    >
                      <span className="flex">
                        {disableSectionInput
                          ? sectionTitle
                          : "Create new section"}
                      </span>
                      {/* <span className="accordion__toggle-icon material-icons">
                    keyboard_arrow_down
                  </span> */}
                    </a>
                    <div
                      className="accordion__menu collapse show"
                      id="course-toc-2"
                    >
                      <div className="accordion__menu-link"></div>

                      <div className="accordion__menu-link active">
                        <div
                          className="form-group"
                          style={{ width: "70%", marginRight: "2%" }}
                        >
                          <label className="form-label">Section Title</label>
                          <input
                            disabled={disableSectionInput}
                            onChange={(e) => setSectionTitle(e.target.value)}
                            value={sectionTitle}
                            type="text"
                            className="form-control"
                            placeholder="Section title"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Competency</label>
                          <select
                            disabled={disableSectionInput}
                            onChange={(e) => setCompetency(e.target.value)}
                            value={competency}
                            id="custom-select"
                            className="form-control custom-select"
                          >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Angular">Angular</option>
                            <option value="Python">Python</option>
                          </select>
                        </div>
                      </div>
                      {/* ... */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: "5px 15px",
                        }}
                      >
                        {changeBtn ? (
                          <>
                            {updateSection ? (
                              <a
                                onClick={() => {
                                  setDisableSectionInput(false);
                                  setUpdateSection(false);
                                }}
                                className="btn btn-outline-secondary mb-24pt mb-sm-0"
                              >
                                edit section
                              </a>
                            ) : (
                              <a
                                onClick={() => {
                                  updateCourseSection();
                                  setDisableSectionInput(true);
                                  setUpdateSection(true);
                                }}
                                className="btn btn-outline-secondary mb-24pt mb-sm-0"
                              >
                                update section
                              </a>
                            )}
                          </>
                        ) : (
                          <button
                            style={{
                              border: "none",
                              outline: "none",
                              backgroundColor: "white",
                            }}
                          >
                            <a
                              onClick={createSection}
                              className="btn btn-outline-secondary mb-24pt mb-sm-0"
                            >
                              save section
                            </a>
                          </button>
                        )}
                      </div>
                      {changeBtn && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5%",
                          }}
                        >
                          <label className="form-label">Videos</label>
                          <FaPlus
                            onClick={() => {
                              setEditModalOpen(true);
                              updateCourseSection();
                              setDisableCreateCourseBtn(false);
                              clearSectionContent();
                              createModule();
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
           
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="page-separator"
                >
                  <div className="page-separator__text">Assessments</div>
                          <FaPlus
                            onClick={() => {
                              setCreateAssessmentModuleModalOpen(true);
                              createAssessment();
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>     
                    </div>
              
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header text-center">
                    <button
                      disabled={disableCreateCourseBtn}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <a onClick={createCourse} className="btn btn-accent">
                        Create Course
                      </a>
                    </button>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" href="#">
                        <strong>Save Draft</strong>
                      </a>
                      <i className="material-icons text-muted">check</i>
                    </div>
                  </div>
                </div>
                <div className="page-separator">
                  <div className="page-separator__text">Course Logo</div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">
                        Image url
                        {imgError && (
                          <span
                            style={{ color: "tomato", fontWeight: "500px" }}
                          >
                            * required
                          </span>
                        )}
                      </label>
                      {/* <div className="form-group m-0"> */}
                      <div className="custom-file">
                        <input
                          type="file"
                          id="file"
                          style={{
                            border: "2px solid tomato",
                          }}
                          onChange={handleImageChange}
                          className="custom-file-input"
                        />
                        <label className="custom-file-label">{!imageUrl ? "Choose File" : imageUrl?.name}</label>
                        {/* </div> */}
                      </div>

                    </div>
                  </div>
                </div>

                <div className="page-separator">
                  <div className="page-separator__text">Instructor</div>
                </div>

                <div className="card">
                  <div className="card-body">
                  <label className="form-label">
                        Intructor name
                     
                  </label>
                    <div className="form-group">
                    
               
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Instructor Name "
                    value={instructorName}
                    onChange={(e:any) => setInstructorName(e.target.value)}
                  />

                    </div>
                  </div>
                </div>


                <div className="page-separator">
                  <div className="page-separator__text">Options</div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        className="form-control custom-select"
                      >
                        <option value="vuejs">Information Technology</option>
                        <option value="vuejs">Project Management</option>
                        <option value="vuejs">Skill Development</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // END Page Content */}
        {/* Footer */}
       
      </div>

      {}
      {/* <Sidebar /> */}
    </div>
  );
}

export default dynamic(() => Promise.resolve(EditCourse), { ssr: false });
