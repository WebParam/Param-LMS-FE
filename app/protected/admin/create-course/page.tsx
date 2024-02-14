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
import {
  getSelectedQuizForEdit,
} from "@/app/redux/quizSlice";
import CreateCourseSidebar from "@/app/components/createCourseSidebar";


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

  console.log("ReactQuillComponent:", ReactQuillComponent);

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
  const [competency, setCompetency] = useState<string>("");
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [disableSectionInput, setDisableSectionInput] =
    useState<boolean>(false);
  const [changeBtn, setChangeBtn] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState("");
  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [disableCreateCourseBtn, setDisableCreateCourseBtn] =
    useState<boolean>(true);
  const [updateSection, setUpdateSection] = useState<boolean>(true);
  const [newSection, setNewSection] = useState<boolean>(true);
  const [sectionBtn, setSectionBtn] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<File>();
  const _quizzesFromState: any[] = useSelector(getSelectedQuizForEdit);
  const [imgError, setImgError] = useState(false);
  const [moduleId, setModuleId] = useState<string>("")

  const [videoId, setVideoId] = useState<string>("")

  console.log("Course", _courseFromState);

  let cookies = new Cookies();

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

  const payload = {
    creatingUser: userData?.id,
    title: courseTitle ?? _courseFromState.title,
    description: courseDescription,
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

  const handleDescriptionChange = (content: string, _: any, source: string) => {
    if (source === "user") {
      const plainDescription = content.replace(/<\/?p>/gi, "");

      setCourseDescription(plainDescription);

      dispatch(createCourseDetail(payload));
    }
  };


  async function createCourse() {
    
  const formData: any = new FormData();
    setImgError(false);
    setDisableCreateCourseBtn(true);
    if(!imageUrl){
      setImgError(true)
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
   
      const createCourseResponse = await Api.POST_CreateCourse(
        _courseFromState
      )!;

      if (createCourseResponse?.data?.id) {
      

        const courseId: string = createCourseResponse.data?.id!;
        const uploadImageResponse = await Api.POST_Image(courseId, formData);

        const extractedVideo = createCourseResponse?.data?.sections.reduce(
          (accumulator: IVideo[], section: any) => {
            // Iterate through modules within the section
            const videosInModules = section.modules.reduce(
              (moduleAccumulator: IVideo[], module: any) => {
                // Concatenate videos within the module to the accumulator
                return moduleAccumulator.concat(module.videos);
              },
              []
            );
            // Concatenate videos from all modules in the section to the accumulator
            return accumulator.concat(videosInModules);
          },
          []
        );
        
        const updatedQuizzes = await Promise.all(
          _quizzesFromState.map(async (quiz: IQuiz) => {
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


     if(sectionId){
      dispatch(addModuleToSection(payload));
     }

  };

  useEffect(() => {
    const sectionIds = _courseFromState?.sections?.map((section) => section.id);
    const lastSectionId = sectionIds[sectionIds?.length - 1];
    setSectionId(lastSectionId);
    if (sectionId?.length > 0) {
      setDisableCreateCourseBtn(false);
    }
  });

  useEffect(() => {
    // formData.append("file", imageUrl);
    // console.log("File from formdata", formData?.logoImageFile);
  }, [imageUrl]);

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

  const customModalStyles = {
    modal: {
      maxWidth: "60%",
      width: "100%",
    },
  };

  useEffect(() => {
    // Update the document title using the browser API
  //  document !=undefined? document.title = 'Khumla':"";
  });

  return (
    <div
      id="test"
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push=""
      data-responsive-width="992px"
      data-domfactory-upgraded="mdk-cdrawer-layout"
    >
      <ToastContainer />

      
      <div
        className="mdk-drawer-layout__content page-content"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        {/* Header */}
        {/* Navbar */}
        <div
              style={{
                "position": "relative",
          "left": "6em",
          "width": "1200px" 
              }}
          className="navbar navbar-expand pr-0 navbar-light border-bottom-2"
          id="default-navbar"
          data-primary=""
        >
          {/* Navbar Toggler */}
          <button
            className="navbar-toggler w-auto mr-16pt d-block d-lg-none rounded-0"
            type="button"
            data-toggle="sidebar"
          >
            <span className="material-icons">short_text</span>
          </button>
          {/* // END Navbar Toggler */}
          {/* Navbar Brand */}
          <a href="index.html" className="navbar-brand mr-16pt d-lg-none">
            <span className="avatar avatar-sm navbar-brand-icon mr-0 mr-lg-8pt">
              <span className="avatar-title rounded bg-primary">
                <img
                  src="../../public/images/illustration/student/128/white.svg"
                  alt="logo"
                  className="img-fluid"
                />
              </span>
            </span>
            <span className="d-none d-lg-block">Luma</span>
          </a>
          {/* // END Navbar Brand */}
          {/* Navbar Search */}
          <form
            className="search-form navbar-search d-none d-md-flex mr-16pt"
            action="index.html"
          >
            <button className="btn" type="submit">
              <i className="material-icons">search</i>
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Search ..."
            />
          </form>
          {/* // END Navbar Search */}
          <div className="flex" />
          {/* Navbar Menu */}
          <div className="nav navbar-nav flex-nowrap d-flex mr-16pt">
            {/* Notifications dropdown */}
            <div
              className="nav-item dropdown dropdown-notifications dropdown-xs-down-full"
              data-toggle="tooltip"
              data-title="Messages"
              data-placement="bottom"
              data-boundary="window"
              data-original-title=""
              title=""
            >
              <button
                className="nav-link btn-flush dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                data-caret="false"
              >
                <i className="material-icons icon-24pt">mail_outline</i>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <div data-perfect-scrollbar="" className="position-relative ps">
                  <div className="dropdown-header">
                    <strong>Messages</strong>
                  </div>
                  <div className="list-group list-group-flush mb-0">
                    <a
                      href="javascript:void(0);"
                      className="list-group-item list-group-item-action unread"
                    >
                      <span className="d-flex align-items-center mb-1">
                        <small className="text-black-50">5 minutes ago</small>
                        <span className="ml-auto unread-indicator bg-accent" />
                      </span>
                      <span className="d-flex">
                        <span className="avatar avatar-xs mr-2">
                          <img
                            src="../../public/images/people/110/woman-5.jpg"
                            alt="people"
                            className="avatar-img rounded-circle"
                          />
                        </span>
                        <span className="flex d-flex flex-column">
                          <strong className="text-black-100">Michelle</strong>
                          <span className="text-black-70">
                            Clients loved the new design.
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="list-group-item list-group-item-action"
                    >
                      <span className="d-flex align-items-center mb-1">
                        <small className="text-black-50">5 minutes ago</small>
                      </span>
                      <span className="d-flex">
                        <span className="avatar avatar-xs mr-2">
                          <img
                            src="../../public/images/people/110/woman-5.jpg"
                            alt="people"
                            className="avatar-img rounded-circle"
                          />
                        </span>
                        <span className="flex d-flex flex-column">
                          <strong className="text-black-100">Michelle</strong>
                          <span className="text-black-70">🔥 Superb job..</span>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                    <div
                      className="ps__thumb-x"
                      tabIndex={0}
                      style={{ left: 0, width: 0 }}
                    />
                  </div>
                  <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                    <div
                      className="ps__thumb-y"
                      tabIndex={0}
                      style={{ top: 0, height: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* // END Notifications dropdown */}
            {/* Notifications dropdown */}
            <div
              className="nav-item ml-16pt dropdown dropdown-notifications dropdown-xs-down-full"
              data-toggle="tooltip"
              data-title="Notifications"
              data-placement="bottom"
              data-boundary="window"
              data-original-title=""
              title=""
            >
              <button
                className="nav-link btn-flush dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                data-caret="false"
              >
                <i className="material-icons">notifications_none</i>
                <span className="badge badge-notifications badge-accent">
                  2
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <div data-perfect-scrollbar="" className="position-relative ps">
                  <div className="dropdown-header">
                    <strong>System notifications</strong>
                  </div>
                  <div className="list-group list-group-flush mb-0">
                    <a
                      href="javascript:void(0);"
                      className="list-group-item list-group-item-action unread"
                    >
                      <span className="d-flex align-items-center mb-1">
                        <small className="text-black-50">3 minutes ago</small>
                        <span className="ml-auto unread-indicator bg-accent" />
                      </span>
                      <span className="d-flex">
                        <span className="avatar avatar-xs mr-2">
                          <span className="avatar-title rounded-circle bg-light">
                            <i className="material-icons font-size-16pt text-accent">
                              account_circle
                            </i>
                          </span>
                        </span>
                        <span className="flex d-flex flex-column">
                          <span className="text-black-70">
                            Your profile information has not been synced
                            correctly.
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="list-group-item list-group-item-action"
                    >
                      <span className="d-flex align-items-center mb-1">
                        <small className="text-black-50">5 hours ago</small>
                      </span>
                      <span className="d-flex">
                        <span className="avatar avatar-xs mr-2">
                          <span className="avatar-title rounded-circle bg-light">
                            <i className="material-icons font-size-16pt text-primary">
                              group_add
                            </i>
                          </span>
                        </span>
                        <span className="flex d-flex flex-column">
                          <strong className="text-black-100">Adrian. D</strong>
                          <span className="text-black-70">
                            Wants to join your private group.
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="list-group-item list-group-item-action"
                    >
                      <span className="d-flex align-items-center mb-1">
                        <small className="text-black-50">1 day ago</small>
                      </span>
                      <span className="d-flex">
                        <span className="avatar avatar-xs mr-2">
                          <span className="avatar-title rounded-circle bg-light">
                            <i className="material-icons font-size-16pt text-warning">
                              storage
                            </i>
                          </span>
                        </span>
                        <span className="flex d-flex flex-column">
                          <span className="text-black-70">
                            Your deploy was successful.
                          </span>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                    <div
                      className="ps__thumb-x"
                      tabIndex={0}
                      style={{ left: 0, width: 0 }}
                    />
                  </div>
                  <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                    <div
                      className="ps__thumb-y"
                      tabIndex={0}
                      style={{ top: 0, height: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* // END Notifications dropdown */}
            <Dropdown>
              <Dropdown.Toggle id="accountDropdown" variant="link">
                <span className="avatar avatar-sm mr-8pt2">
                  <span className="avatar-title rounded-circle bg-primary">
                    <i className="material-icons">account_box</i>
                  </span>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ textAlign: "right" }}>
                <Dropdown.Header>Account</Dropdown.Header>
                <Dropdown.Item href="/protected/admin/account">
                  Edit Account
                </Dropdown.Item>
                <Dropdown.Item href="billing.html">Billing</Dropdown.Item>
                <Dropdown.Item href="billing-history.html">
                  Payments
                </Dropdown.Item>
                <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* // END Navbar Menu */}
        </div>
        {/* // END Navbar */}
        {/* // END Header */}
        <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">Create Course</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Create Course</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* BEFORE Page Content */}
        {/* // END BEFORE Page Content */}
        {/* Page Content */}
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

                <div style={{ height: "150px" }}>
                  <div style={{ height: "200px", overflow: "auto" }}>
                  <ReactQuillWrapper
        style={{ height: "100px" }}
        value={courseDescription}
        onChange={handleDescriptionChange}
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
                          Module.videos.map((video:IVideo) => (
                            <div
                            style={{ cursor: "pointer" }}
                            className="accordion__menu-link"
                            key={video.id}
                            >
                             <FaVideo
                             
                                        onClick={() => {
                                          setModuleId(Module.id)
                                setEditModuleModalOpen(true);
                                setSectionId(section.id);
                                setVideoId(video.id);
                              }}
                                       
                                       className="video-icon" /> 
                            <a
                              style={{marginLeft:"8px"}}
                              className="flex"
                              onClick={() => {
                                setModuleId(Module.id)
                                setEditModuleModalOpen(true);
                                setSectionId(section.id);
                                setVideoId(video.id);
                              }}
                            >
                              {video.title}
                            </a>
                            <span className="text-muted">
                              <button
                                onClick={() =>
                                  handleDeleteVideo(video.id)
                                }
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
                        <label className="custom-file-label">Choose file</label>
                        {/* </div> */}
                      </div>
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
        <div className="bg-body border-top-2 mt-auto">
          <div className="container page__container page-section d-flex flex-column">
            <p className="text-70 brand mb-24pt">
              <img
                className="brand-icon"
                src="../../public/images/logo/black-70@2x.png"
                width={30}
                alt="Luma"
              />{" "}
              Luma
            </p>
            <p className="measure-lead-max text-50 small mr-8pt">
              Luma is a beautifully crafted user interface for modern Education
              Platforms, including Courses &amp; Tutorials, Video Lessons,
              Student and Teacher Dashboard, Curriculum Management, Earnings and
              Reporting, ERP, HR, CMS, Tasks, Projects, eCommerce and more.
            </p>
            <p className="mb-8pt d-flex">
              <a href="" className="text-70 text-underline mr-8pt small">
                Terms
              </a>
              <a href="" className="text-70 text-underline small">
                Privacy policy
              </a>
            </p>
            <p className="text-50 small mt-n1 mb-0">
              Copyright 2019 © All rights reserved.
            </p>
          </div>
        </div>
        {/* // END Footer */}
      </div>

      {}
    <CreateCourseSidebar/>
      {/* // END drawer */}
    </div>
  );
}


export default dynamic (() => Promise.resolve(EditCourse), {ssr: false})