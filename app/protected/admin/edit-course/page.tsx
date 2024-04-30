"use client";
import { CreateCourseModal } from "./create-module-modal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState} from "react";
import { FaPlus, FaVideo } from "react-icons/fa";
import { persistor } from '../../../redux/store';
import { resetAssessmentState } from '../../../redux/assessmentSlice';

import {
  addSection,
  deleteSection,
  getSelectedCourseForEdit,
  updateCourseFromDataBase,
  updateSectionDetail,
  addModuleToSection,
  deleteVideoFromModule,
  resetCourseState
} from "@/app/redux/courseSlice";
import {
  ICourse,
  IModule,
  ISection,
  IUpdateCourseDetailState,
  IUpdateSectionDetailState,
  IVideo,
} from "@/app/interfaces/courses";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { EditCourseModal } from "./edit-module-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IQuiz } from "@/app/interfaces/quiz";
import { getSelectedQuizForEdit ,resetQuizState} from "@/app/redux/quizSlice";
import { resetDocumentState } from "@/app/redux/documentSice";
import dynamic from "next/dynamic";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation"
import { createAssessmentDetail, getSelectedAssessmentForEdit, updateAssessment } from "@/app/redux/assessmentSlice";
import { CreateCourseAssessmentModal } from "./create-assessment";
import { IAssessment } from "@/app/interfaces/assessment";
import { Pagination } from "../create-course/pagination/Pagination";
import { CourseApi } from "@/app/lib/restapi/endpoints/courses.api";
import { AssessmentApi } from "@/app/lib/restapi/endpoints/assessments.api";
import { QuizApi } from "@/app/lib/restapi/endpoints/quizzes.api";

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
  modules
}: ReactQuillProps) => {
  const [ReactQuillComponent, setReactQuillComponent] = useState<any>(() => () => null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-quill').then(module => {
        console.log("ReactQuill module loaded:", module);
        setReactQuillComponent(() => module.default);
      }).catch(error => {
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


  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editModuleModalOpen, setEditModuleModalOpen] =
    useState<boolean>(false);
  const [competency, setCompetency] = useState<string>("");
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [disableSectionInput, setDisableSectionInput] =
    useState<boolean>(true);
  const [changeBtn, setChangeBtn] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState("");
  const [courseTitle, setCourseTitle] = useState<any>(_courseFromState.title);
  const [videoId, setVideoId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [courseDescription, setCourseDescription] = useState<any>(_courseFromState.description);
  const [disableCreateCourseBtn, setDisableCreateCourseBtn] =
    useState<boolean>(false);
  const [updateSection, setUpdateSection] = useState<boolean>(true);
  const [createAssessmentModalOpen, setCreateAssessmentModuleModalOpen] =
  useState<boolean>(false);
  const [newSection, setNewSection] = useState<boolean>(false);
  const [moduleId, setModuleId] = useState<string>();
  const [courseId, setCourseId] = useState<string>("");
  const _quizzesFromState: IQuiz[] = useSelector(getSelectedQuizForEdit).quizzes;
  const _assessmentFromState : IAssessment = useSelector(getSelectedAssessmentForEdit).assessment
  const [formData, setFormData] = useState(new FormData());
  const [video, setVideo] = useState<IVideo | null>(null)
  const [instructorName, setInstructorName] = useState<string>("")

  const [imgError, setImgError] = useState<boolean>(false)

  const dispatch = useDispatch();

  function saveAndCloseCreateAssessmentModuleModal() {
    setEditModuleModalOpen(false);
  }

 
  console.log("Quizzes from localStorage", _quizzesFromState);

  console.log('Course Assessment From State', _assessmentFromState);

  const descriptionToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  function saveAndCloseEditModal() {
    setEditModalOpen(false);
    clearSectionContent();
  }

  function saveAndCloseEditModuleModal() {
    setEditModuleModalOpen(false);
  }

  const payload = {
    title: courseTitle ?? _courseFromState.title,
    description: courseDescription,
    creatingUser:_courseFromState.creatingUser,
  } as IUpdateCourseDetailState;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(e.target.value);
    dispatch(updateCourseFromDataBase({..._courseFromState,title: payload.title,description:payload.description}));
  };


  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(file);
      console.log("Image selected: " + file);
    }
  };


  const updateCourseSection = function () {
    const payload = {
      sectionId: sectionId,
      title: sectionTitle,
      competency: competency,
    } as IUpdateSectionDetailState;

    dispatch(updateSectionDetail(payload));
    setDisableSectionInput(true);
  };

  const selectSection = (id: string) => {
    const selectedSection = _courseFromState.sections.find(
      (section) => section.id === id
    );
    if (selectedSection) {
      setSectionTitle(selectedSection.title);
      setSectionId(selectedSection.id);
      setCompetency(selectedSection.competency);
    }
    setDisableSectionInput(true);
    setChangeBtn(true);
    setNewSection(false);
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const handleSectionClick = (section: any) => {
    if (expandedSection === section.id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section.id);
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

  const clearReduxState = () => {
    localStorage.removeItem('persist:assessment');
    localStorage.removeItem('persist:course');
    localStorage.removeItem('persist:documents');
    localStorage.removeItem('persist:quizzes');
    resetAssessmentState();
    resetCourseState();
    resetDocumentState();
    resetQuizState()
    
  };

  async function UpdateCourse() {
    const plainDescription = courseDescription ? courseDescription.replace(/<(?:\/)?[sp]+[^>]*>/g, '') : _courseFromState.description.replace(/<(?:\/)?[sp]+[^>]*>/g, '');;

    dispatch(updateCourseFromDataBase({..._courseFromState,title: payload.title,description:plainDescription}));

    let _id = toast.loading("Please wait..", {
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
      const updateCoursedata = await CourseApi.PUT_UpdateCourse(_courseFromState);
      if (updateCoursedata.data.id) {
        
        if(_assessmentFromState.courseId === ""){
          const assessment = {
            courseId: updateCoursedata?.data?.id,
            questions: _assessmentFromState.questions,
            createdByUserId: _assessmentFromState.createdByUserId,
            createdDate: _assessmentFromState.createdDate,
            modifiedByUserId: _assessmentFromState.modifiedByUserId,
            modifiedAt: _assessmentFromState.modifiedAt,
            dueDate: _assessmentFromState.dueDate,
            courseTitle: courseTitle,
            instructorName: "John Doe",
            instructorId: "656f1335650c740ce0ae4d65",
            status: _assessmentFromState.status,
            isRetaken: _assessmentFromState.isRetaken,
            attempts :  _assessmentFromState.attempts,
          };
  
          const postAssessment = await AssessmentApi.POST_AddAssessments(assessment)!;
       
      
        }else{
          
          const updateAssessment = await AssessmentApi.PUT_UpdateAssessment(_assessmentFromState);
        
    
        }
       

        const uploadImageResponse = await CourseApi.POST_Image(updateCoursedata.data.id, formData);

        const extractedVideo = updateCoursedata?.data?.sections.reduce(
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
          _quizzesFromState.map(async (quiz: IQuiz) => {
              try {
                  if (quiz.questions.length === 0) {
                      const newQuiz = { ...quiz, state: 1 };
                      return newQuiz;
                  }
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
      
          console.log("Updated quizzes",updatedQuizzes);

        const _updateQuizzes = await QuizApi.PUT_UpdateQuizzes(updatedQuizzes);

        debugger;
        toast.update(_id, {
          render: "course saved",
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(_id);
          clearReduxState()
        }, 2000);
      }

    } catch (error) {
      toast.update(_id, {
        render: "Error saving course",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    }
  }

  //Delete Course
  async function deleteCourse() {
    let _id = toast.loading("Please wait..", {
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
      const data = await CourseApi.DELETE_CourseById(_courseFromState?.id);

      if (data == "Successfully deleted the course") {
        toast.update(_id, {
          render: "course deleted",
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(_id);
        }, 2000);
        window.location.href = "/protected/admin/manage-courses";
      } else {
        toast.update(_id, {
          render: "Error deleting course",
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(_id);
        }, 2000);
        window.location.href = "/protected/admin/manage-courses";
      }
    } catch (error) {
      toast.update(_id, {
        render: "Error loading course",
        type: "error",
        isLoading: false,
      });
      window.location.href = "/protected/admin/manage-courses";
    }
  }
  const handleDeleteVideo = (videoId: string, ModuleId:any) => {
    dispatch(deleteVideoFromModule({ moduleId: ModuleId, videoId }));
  };

  //Create Section
  const createSection = function () {
    const payload = {
      sectionTitle: sectionTitle,
      sectionCompetency: competency,
    };

    dispatch(addSection(payload));
    setDisableSectionInput(true);
    setChangeBtn(!changeBtn);
  };

  useEffect(() => {
    const sectionIds = _courseFromState.sections.map((section) => section.id);
    const lastSectionId = sectionIds[sectionIds.length - 1];
    setSectionId(lastSectionId);
  }, [_courseFromState.sections]);

  const clearSectionContent = () => {
    setSectionTitle("");
    setCompetency("");
    setChangeBtn(!changeBtn);
    setDisableSectionInput(!disableSectionInput);
  };

  const handleDeleteSection = async (sectionId: any) => {
    clearSectionContent();
    dispatch(deleteSection(sectionId));
    setDisableSectionInput(false);
    setNewSection(true);
  };

  const customModalStyles = {
    modal: {
      maxWidth: "60%",
      width: "100%",
      marginTop:"20px",
      marginLeft:"50px"
    },
  };



  const createAssessment = () => {
    const payload = {
      dueDate : "",
    }
    if(_assessmentFromState.courseId === courseId){
      dispatch(createAssessmentDetail(payload));
    }
  }
  
  useEffect(() => {
    formData.append("file", imageUrl);
  }, [imageUrl]);

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
          onClose={() => setEditModuleModalOpen(false)}
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
                <h2 className="mb-0">Edit Course</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a >Home</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Course</li>
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

                <div style={{ height: "200px", overflow: "auto" }}>
          
                <ReactQuillWrapper
        style={{ height: "100px" }}
        value={courseDescription}
        onChange={(value :string) => setCourseDescription(value)}
        placeholder="Module description..."
        modules={descriptionToolbar}
      />
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
              
                </div>
               
                {
                  !newSection ? <Pagination
                  expandedSection={expandedSection}
                  handleSectionClick={handleSectionClick}
                  selectSection={selectSection}
                  handleDeleteSection={handleDeleteSection}
                  setModuleId={setModuleId}
                  setEditModuleModalOpen={setEditModuleModalOpen}
                  setSectionId={setSectionId}
                  setVideoId={setVideoId}
                  handleDeleteVideo={handleDeleteVideo}
                  setVideo = {setVideo}
                  sections={_courseFromState.sections}
                  itemsPerPage={9}
                /> :    <div
                className="accordion js-accordion accordion--boxed mb-24pt"
                id="parent"
                data-domfactory-upgraded="accordion"
              >
                <div className="accordion__item open">
                  <a
                    href="#"
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
                    <span className="accordion__toggle-icon material-icons">
                      keyboard_arrow_down
                    </span>
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
                      {!changeBtn ? (
                        <>
                          {updateSection ? (
                            <a
                              onClick={() => {
                                setDisableSectionInput(false);
                                setUpdateSection(!updateSection);
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
                                setUpdateSection(!updateSection);
                              }}
                              className="btn btn-outline-secondary mb-24pt mb-sm-0"
                            >
                              update section
                            </a>
                          )}
                        </>
                      ) : (
                        <a
                          onClick={createSection}
                          className="btn btn-outline-secondary mb-24pt mb-sm-0"
                        >
                          save section
                        </a>
                      )}
                    </div>
                    {!changeBtn && (
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
                }
               


              




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
                      <a
                        href="#"
                        onClick={UpdateCourse}
                        className="btn btn-accent"
                      >
                        save changes
                      </a>
                    </button>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex">
                        <strong>Save Draft</strong>
                      </a>
                      <i className="material-icons text-muted">check</i>
                    </div>
                    <div className="list-group-item">
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={deleteCourse}
                        className="text-danger"
                      >
                        <strong>Delete Course</strong>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="page-separator">
                  <div className="page-separator__text">Course Logo</div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Image url {imgError && <span style={{color : "tomato" , fontWeight : "500px"}}>* required</span>}</label>
                      {/* <div className="form-group m-0"> */}
                      <div className="custom-file"
                      
                      >
                        <input
                          type="file"
                          id="file"
                          style={{
                            border: "2px solid tomato" ,
                          }}
                          onChange={handleImageChange}
                          className="custom-file-input"
                        />
                        <label className="custom-file-label">{!imageUrl ? "Choose file" : imageUrl.name}</label>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <label className="form-label">Intructor name</label>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Instructor Name "
                        value={instructorName}
                        onChange={(e: any) => setInstructorName(e.target.value)}
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
                <div className="page-separator">
                  <div className="page-separator__text">Section</div>
                </div>
                <div className="card">
                  <div className="card-header text-center">
                    <button
                         onClick={() => {
                          clearSectionContent();
                          setNewSection(!newSection);
 
                         }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <a  className="btn btn-accent">
                       {!newSection ? " Create Section" : "All Sections"}
                      </a>
                    </button>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" >
                        <strong>Save Draft</strong>
                      </a>
                      <i className="material-icons text-muted">check</i>
                    </div>
                  </div>
                </div>

                <div className="page-separator">
                  <div className="page-separator__text">Assessment</div>
                </div>
                <div className="card">
                  <div className="card-header text-center">
                    <button
                      onClick={() => {
                        setCreateAssessmentModuleModalOpen(true);
                        createAssessment();
                      }}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <a  className="btn btn-accent">
                        Create Assessment
                      </a>
                    </button>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" >
                        <strong>Save Draft</strong>
                      </a>
                      <i className="material-icons text-muted">check</i>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
export default dynamic (() => Promise.resolve(EditCourse), {ssr: false})