"use client";
import { CreateCourseModal } from "./create-module-modal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  addSection,
  deleteModuleFromSection,
  deleteSection,
  deleteVideoFromModule,
  getSelectedCourseForEdit,
  createCourseDetail,
  updateSectionDetail,
  addModuleToSection,
  addVideoToModule,
  deleteAllSections,
} from "@/app/redux/courseSlice";
import {
  ICourse,
  ISection,
  IUpdateCourseDetailState,
  IUpdateSectionDetailState,
} from "@/app/interfaces/courses";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { useEffect } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { Link } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { EditCourseModal } from "./edit-module-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie"; // Import the library
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import "react-quill/dist/quill.snow.css";

export default function EditCourse() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editModuleModalOpen, setEditModuleModalOpen] =
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
  const [moduleId, setModuleId] = useState<string>();
  const [sectionBtn, setSectionBtn] = useState<boolean>(true);

  let cookies = new Cookies();

  const userData = cookies.get("param-lms-user");

  const dispatch = useDispatch();

  console.log("UserData", userData?.id);

  const descriptionToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
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
      (section) => section.id === id
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

  async function createCourse() {
    setDisableCreateCourseBtn(true);
    let _id = toast.loading("saving course..", {
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
    const plainDescription = courseDescription
      ? courseDescription.replace(/<\/?p>/gi, "")
      : _courseFromState.description;

    const payload = {
      creatingUser: "6580051b2b3b4e16f159792d",
      title: courseTitle ?? _courseFromState.title,
      description: plainDescription,
    } as IUpdateCourseDetailState;

    console.log("Creating User ", payload.creatingUser);

    dispatch(createCourseDetail(payload));

    try {
      const createCourse = await Api.POST_CreateCourse(_courseFromState);
      console.log(" Create Course after request: ", createCourse);
      console.log("response", createCourse);
      if(createCourse.data?._id){
        toast.update(_id, {
          render: "successfully saved course",
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
        return;
      }else{
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
    
    } catch (error) {
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

  useEffect(() => {
    const sectionIds = _courseFromState.sections.map((section) => section.id);
    const lastSectionId = sectionIds[sectionIds.length - 1];
    setSectionId(lastSectionId);
  }, [_courseFromState.sections]);

  console.log("COURSE", _courseFromState);

  const clearSectionContent = () => {
    setSectionTitle("");
    setCompetency("");
    setChangeBtn(false);
    setDisableSectionInput(false);
    setNewSection(true);
  };
  1;
  const handleDeleteModule = (sectionId: any, moduleId: any) => {
    console.log(sectionId);
    console.log(moduleId);
    dispatch(deleteModuleFromSection({ sectionId, moduleId }));
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
            ModuleId={moduleId}
            sectionId={sectionId}
            onClose={saveAndCloseEditModuleModal}
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
        {/* Header */}
        {/* Navbar */}
        <div
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
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">course title guideline</a>
                  </small>
                </div>

                <label className="form-label">Course Description</label>

                <div style={{ height: "150px" }}>
                  <div style={{ height: "200px", overflow: "auto" }}>
                    <ReactQuill
                      style={{ height: "100px" }}
                      value={courseDescription}
                      onChange={(value: any) => {
                        setCourseDescription(value); // Pass the new description
                      }}
                      placeholder="Course description..."
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
                  {selectedCourse.sections.map((section:ISection) => (
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
                        {section.modules.map((module) => (
                          <div
                            style={{ cursor: "pointer" }}
                            className="accordion__menu-link"
                            key={module.id}
                          >
                            <i
                              onClick={() => {
                                setEditModuleModalOpen(true);
                                setSectionId(section.id);
                                setModuleId(module.id);
                              }}
                              className="material-icons text-70 icon-16pt icon--left"
                            >
                              drag_handle
                            </i>
                            <a
                              className="flex"
                              onClick={() => {
                                setEditModuleModalOpen(true);
                                setSectionId(section.id);
                                setModuleId(module.id);
                              }}
                            >
                              {module.title}
                            </a>
                            <span className="text-muted">
                              <button
                                onClick={() =>
                                  handleDeleteModule(section.id, module.id)
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
                        ))}
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
                          <label className="form-label">Modules</label>
                          <FaPlus
                            onClick={() => {
                              setEditModalOpen(true);
                              updateCourseSection();
                              setDisableCreateCourseBtn(false);
                              clearSectionContent();
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
                    <div className="list-group-item">
                      <a href="#" className="text-danger">
                        <strong>Delete Course</strong>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="page-separator">
                  <div className="page-separator__text">Video</div>
                </div>
                <div className="card">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      src="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                      //   allowFullScreen=""
                    />
                  </div>
                  <div className="card-body">
                    <label className="form-label">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                      placeholder="Enter Video URL"
                    />

                    <small className="form-text text-muted">
                      Enter a valid video URL.
                    </small>
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
      <div
        className="mdk-drawer js-mdk-drawer layout-mini-secondary__drawer"
        id="default-drawer"
        data-align="start"
        data-position="left"
        data-domfactory-upgraded="mdk-drawer"
        data-persistent=""
        data-opened=""
      >
        <div className="mdk-drawer__scrim" style={{}} />
        <div
          className="mdk-drawer__content js-sidebar-mini"
          data-responsive-width="992px"
          data-layout="mini-secondary"
          style={{}}
        >
          <div className="sidebar sidebar-mini sidebar-dark-pickled-bluewood sidebar-left d-flex flex-column">
            {/* Brand */}
            <a
              href="index.html"
              className="sidebar-brand p-0 navbar-height d-flex justify-content-center"
            >
              <span className="avatar avatar-sm ">
                <span className="avatar-title rounded bg-primary">
                  <img
                    src="../../public/images/illustration/teacher/128/white.svg"
                    className="img-fluid"
                    alt="logo"
                  />
                </span>
              </span>
            </a>
            <div
              className="flex d-flex flex-column justify-content-start ps"
              data-perfect-scrollbar=""
            >
              <ul
                className="nav flex-shrink-0 flex-nowrap flex-column sidebar-menu mb-0 js-sidebar-mini-tabs"
                role="tablist"
              >
                <li
                  className="sidebar-menu-item"
                  data-toggle="tooltip"
                  data-title="Student"
                  data-placement="right"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_student"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_student"
                    aria-selected="true"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      school
                    </i>
                    <span className="sidebar-menu-text">Student</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item active"
                  data-toggle="tooltip"
                  data-title="Instructor"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_instructor"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_instructor"
                    aria-selected="false"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      format_shapes
                    </i>
                    <span className="sidebar-menu-text">Instructor</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item "
                  data-toggle="tooltip"
                  data-title="Apps"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_apps"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_apps"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      apps
                    </i>
                    <span className="sidebar-menu-text">Apps</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item "
                  data-toggle="tooltip"
                  data-title="Account"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_account"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_account"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      account_box
                    </i>
                    <span className="sidebar-menu-text">Account</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item "
                  data-toggle="tooltip"
                  data-title="Messaging"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_messaging"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_messaging"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      message
                    </i>
                    <span className="sidebar-menu-text">Messaging</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item"
                  data-toggle="tooltip"
                  data-title="Components"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_components"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_components"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      tune
                    </i>
                    <span className="sidebar-menu-text">Components</span>
                  </a>
                </li>
                <li
                  className="sidebar-menu-item"
                  data-toggle="tooltip"
                  data-title="Layouts"
                  data-placement="right"
                  data-boundary="window"
                  data-original-title=""
                  title=""
                >
                  <a
                    className="sidebar-menu-button"
                    href="#sm_layouts"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="sm_layouts"
                    aria-selected="false"
                  >
                    <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                      view_compact
                    </i>
                    <span className="sidebar-menu-text">Layouts</span>
                  </a>
                </li>
              </ul>
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
            <ul
              className="nav flex-column sidebar-menu align-items-center mb-12pt js-sidebar-mini-tabs"
              role="tablist"
            >
              <li className="sidebar-account" style={{ width: 40 }}>
                <a
                  href="#sm_account_1"
                  className="p-4pt d-flex align-items-center justify-content-center"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="sm_account_1"
                  aria-selected="true"
                >
                  <img
                    width={32}
                    height={32}
                    className="rounded-circle"
                    src="../../public/images/people/50/guy-3.jpg"
                    alt="account"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div
            className="sidebar sidebar-light sidebar-left flex sidebar-secondary ps"
            data-perfect-scrollbar=""
          >
            <div className="navbar navbar-light navbar-expand mb-12pt">
              <span className="d-none d-md-flex align-items-center mr-16pt">
                <span className="avatar avatar-sm mr-12pt">
                  <span className="avatar-title rounded navbar-avatar">
                    <i className="material-icons">trending_up</i>
                  </span>
                </span>
                <small className="flex d-flex flex-column">
                  <strong className="navbar-text-100">Earnings</strong>
                  <span className="navbar-text-50">$12.3k</span>
                </small>
              </span>
              <span className="d-none d-md-flex align-items-center mr-16pt">
                <span className="avatar avatar-sm mr-12pt">
                  <span className="avatar-title rounded navbar-avatar">
                    <i className="material-icons">receipt</i>
                  </span>
                </span>
                <small className="flex d-flex flex-column">
                  <strong className="navbar-text-100">Sales</strong>
                  <span className="navbar-text-50">264</span>
                </small>
              </span>
            </div>
            <div className="tab-content">
              <div className="tab-pane" id="sm_account_1">
                <div className="sidebar-heading">Account</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="edit-account.html">
                      <span className="sidebar-menu-text">Edit Account</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="billing.html">
                      Billing
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="billing-history.html"
                    >
                      Payments
                    </a>
                  </li>
                  <li className="sidebar-menu-item" onClick={logOut}>
                    <a className="sidebar-menu-button">Logout</a>
                  </li>
                </ul>
              </div>
              <div className="tab-pane " id="sm_apps">
                <div className="sidebar-heading">Apps</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button js-sidebar-collapse"
                      data-toggle="collapse"
                      href="#enterprise_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        donut_large
                      </span>
                      Enterprise
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="enterprise_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="erp-dashboard.html"
                        >
                          <span className="sidebar-menu-text">
                            ERP Dashboard
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="crm-dashboard.html"
                        >
                          <span className="sidebar-menu-text">
                            CRM Dashboard
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="hr-dashboard.html"
                        >
                          <span className="sidebar-menu-text">
                            HR Dashboard
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="employees.html"
                        >
                          <span className="sidebar-menu-text">Employees</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="staff.html">
                          <span className="sidebar-menu-text">Staff</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="leaves.html">
                          <span className="sidebar-menu-text">Leaves</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button disabled"
                          href="departments.html"
                        >
                          <span className="sidebar-menu-text">Departments</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#community_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        people_outline
                      </span>
                      Community
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="community_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="teachers.html">
                          <span className="sidebar-menu-text">
                            Browse Teachers
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="student-profile.html"
                        >
                          <span className="sidebar-menu-text">
                            Student Profile
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="teacher-profile.html"
                        >
                          <span className="sidebar-menu-text">
                            Teacher Profile
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="blog.html">
                          <span className="sidebar-menu-text">Blog</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="blog-post.html"
                        >
                          <span className="sidebar-menu-text">Blog Post</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="faq.html">
                          <span className="sidebar-menu-text">FAQ</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="help-center.html"
                        >
                          {/*  */}
                          <span className="sidebar-menu-text">Help Center</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="discussions.html"
                        >
                          <span className="sidebar-menu-text">Discussions</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="discussion.html"
                        >
                          <span className="sidebar-menu-text">
                            Discussion Details
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="discussions-ask.html"
                        >
                          <span className="sidebar-menu-text">
                            Ask Question
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#productivity_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        access_time
                      </span>
                      Productivity
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="productivity_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="projects.html">
                          <span className="sidebar-menu-text">Projects</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="tasks-board.html"
                        >
                          <span className="sidebar-menu-text">Tasks Board</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="tasks-list.html"
                        >
                          <span className="sidebar-menu-text">Tasks List</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button disabled"
                          href="kanban.html"
                        >
                          <span className="sidebar-menu-text">Kanban</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#cms_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        content_copy
                      </span>
                      CMS
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="cms_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="cms-dashboard.html"
                        >
                          <span className="sidebar-menu-text">
                            CMS Dashboard
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="posts.html">
                          <span className="sidebar-menu-text">Posts</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#ecommerce_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        shopping_cart
                      </span>
                      eCommerce
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="ecommerce_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ecommerce.html"
                        >
                          <span className="sidebar-menu-text">
                            Shop Dashboard
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button disabled"
                          href="edit-product.html"
                        >
                          <span className="sidebar-menu-text">
                            Edit Product
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="tab-pane " id="sm_student">
                <div className="sidebar-heading">Student</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="index.html">
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        home
                      </span>
                      <span className="sidebar-menu-text">Home</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="courses.html">
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        local_library
                      </span>
                      <span className="sidebar-menu-text">Browse Courses</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="paths.html">
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        style
                      </span>
                      <span className="sidebar-menu-text">Browse Paths</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-dashboard.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        account_box
                      </span>
                      <span className="sidebar-menu-text">
                        Student Dashboard
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-my-courses.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        search
                      </span>
                      <span className="sidebar-menu-text">My Courses</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-paths.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        timeline
                      </span>
                      <span className="sidebar-menu-text">My Paths</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="student-path.html">
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        change_history
                      </span>
                      <span className="sidebar-menu-text">Path Details</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-course.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        face
                      </span>
                      <span className="sidebar-menu-text">Course Preview</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-lesson.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        panorama_fish_eye
                      </span>
                      <span className="sidebar-menu-text">Lesson Preview</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-take-course.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        class
                      </span>
                      <span className="sidebar-menu-text">Take Course</span>
                      <span className="sidebar-menu-badge badge badge-accent badge-notifications ml-auto">
                        PRO
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-take-lesson.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        import_contacts
                      </span>
                      <span className="sidebar-menu-text">Take Lesson</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-take-quiz.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        dvr
                      </span>
                      <span className="sidebar-menu-text">Take Quiz</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-quiz-results.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        poll
                      </span>
                      <span className="sidebar-menu-text">My Quizzes</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-quiz-result-details.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        live_help
                      </span>
                      <span className="sidebar-menu-text">Quiz Result</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-path-assessment.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        layers
                      </span>
                      <span className="sidebar-menu-text">
                        Skill Assessment
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-path-assessment-result.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        assignment_turned_in
                      </span>
                      <span className="sidebar-menu-text">Skill Result</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-pane  fade active show " id="sm_instructor">
                <div className="sidebar-heading">Instructor</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="/procteted/dashboard"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        school
                      </span>
                      <span className="sidebar-menu-text">
                        Instructor Dashboard
                      </span>
                    </a>
                  </li>

                  <li className="sidebar-menu-item">
                    <Link
                      href="/protected/admin/manage-courses"
                      style={{ textDecoration: "none" }}
                      className="small"
                    >
                      <a className="sidebar-menu-button">
                        <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                          import_contacts
                        </span>
                        <span className="sidebar-menu-text">
                          Manage Courses
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="instructor-quizzes.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        help
                      </span>
                      <span className="sidebar-menu-text">Manage Quizzes</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="instructor-earnings.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        trending_up
                      </span>
                      <span className="sidebar-menu-text">Earnings</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="instructor-statement.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        receipt
                      </span>
                      <span className="sidebar-menu-text">Statement</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item active">
                    <a className="sidebar-menu-button">
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        post_add
                      </span>
                      <span className="sidebar-menu-text">Create Course</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="instructor-edit-quiz.html"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        format_shapes
                      </span>
                      <span className="sidebar-menu-text">Edit Quiz</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-pane " id="sm_account">
                <div className="sidebar-heading">Account</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="pricing.html">
                      <span className="sidebar-menu-text">Pricing</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="login.html">
                      <span className="sidebar-menu-text">Login</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="signup.html">
                      <span className="sidebar-menu-text">Signup</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="signup-payment.html"
                    >
                      <span className="sidebar-menu-text">Payment</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="reset-password.html"
                    >
                      <span className="sidebar-menu-text">Reset Password</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="change-password.html"
                    >
                      <span className="sidebar-menu-text">Change Password</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="edit-account.html">
                      <span className="sidebar-menu-text">Edit Account</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="edit-account-profile.html"
                    >
                      <span className="sidebar-menu-text">
                        Profile &amp; Privacy
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="edit-account-notifications.html"
                    >
                      <span className="sidebar-menu-text">
                        Email Notifications
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="edit-account-password.html"
                    >
                      <span className="sidebar-menu-text">
                        Account Password
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="billing.html">
                      <span className="sidebar-menu-text">Subscription</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="billing-upgrade.html"
                    >
                      <span className="sidebar-menu-text">Upgrade Account</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="billing-payment.html"
                    >
                      <span className="sidebar-menu-text">
                        Payment Information
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="billing-history.html"
                    >
                      <span className="sidebar-menu-text">Payment History</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="billing-invoice.html"
                    >
                      <span className="sidebar-menu-text">Invoice</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-pane " id="sm_messaging">
                <div className="sidebar-heading">Messaging</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="messages.html">
                      <span className="sidebar-menu-text">Messages</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="email.html">
                      <span className="sidebar-menu-text">Email</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-pane" id="sm_components">
                <div className="sidebar-heading">UI Components</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#components_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        tune
                      </span>
                      Components
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="components_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-buttons.html"
                        >
                          <span className="sidebar-menu-text">Buttons</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-avatars.html"
                        >
                          <span className="sidebar-menu-text">Avatars</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="ui-forms.html">
                          <span className="sidebar-menu-text">Forms</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-loaders.html"
                        >
                          <span className="sidebar-menu-text">Loaders</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-tables.html"
                        >
                          <span className="sidebar-menu-text">Tables</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="ui-cards.html">
                          <span className="sidebar-menu-text">Cards</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="ui-icons.html">
                          <span className="sidebar-menu-text">Icons</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="ui-tabs.html">
                          <span className="sidebar-menu-text">Tabs</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-alerts.html"
                        >
                          <span className="sidebar-menu-text">Alerts</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-badges.html"
                        >
                          <span className="sidebar-menu-text">Badges</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-progress.html"
                        >
                          <span className="sidebar-menu-text">Progress</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-pagination.html"
                        >
                          <span className="sidebar-menu-text">Pagination</span>
                        </a>
                      </li>
                      {/* <li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-typography.html">
    <span class="sidebar-menu-text">Typography</span>
  </a>
</li>
<li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-colors.html">
    <span class="sidebar-menu-text">Colors</span>
  </a>
</li>
<li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-breadcrumb.html">
    <span class="sidebar-menu-text">Breadcrumb</span>
  </a>
</li>
<li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-accordions.html">
    <span class="sidebar-menu-text">Accordions</span>
  </a>
</li>
<li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-modals.html">
    <span class="sidebar-menu-text">Modals</span>
  </a>
</li>
<li class="sidebar-menu-item">
  <a class="sidebar-menu-button disabled" href="ui-chips.html">
    <span class="sidebar-menu-text">Chips</span>
  </a>
</li> */}
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button disabled" href="">
                          <span className="sidebar-menu-text">Disabled</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#plugins_menu"
                    >
                      <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                        folder
                      </span>
                      Plugins
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse sm-indent"
                      id="plugins_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-charts.html"
                        >
                          <span className="sidebar-menu-text">Charts</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-flatpickr.html"
                        >
                          <span className="sidebar-menu-text">Flatpickr</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-daterangepicker.html"
                        >
                          <span className="sidebar-menu-text">
                            Date Range Picker
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-dragula.html"
                        >
                          <span className="sidebar-menu-text">Dragula</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-dropzone.html"
                        >
                          <span className="sidebar-menu-text">Dropzone</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-range-sliders.html"
                        >
                          <span className="sidebar-menu-text">
                            Range Sliders
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-quill.html"
                        >
                          <span className="sidebar-menu-text">Quill</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-select2.html"
                        >
                          <span className="sidebar-menu-text">Select2</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-nestable.html"
                        >
                          <span className="sidebar-menu-text">Nestable</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-fancytree.html"
                        >
                          <span className="sidebar-menu-text">Fancy Tree</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-maps-vector.html"
                        >
                          <span className="sidebar-menu-text">Vector Maps</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-sweet-alert.html"
                        >
                          <span className="sidebar-menu-text">Sweet Alert</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ui-plugin-toastr.html"
                        >
                          <span className="sidebar-menu-text">Toastr</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button disabled" href="">
                          <span className="sidebar-menu-text">Disabled</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="tab-pane" id="sm_layouts">
                <div className="sidebar-heading">Layouts</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../Compact_App_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">Compact</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../Mini_App_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">Mini</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item active">
                    <a
                      className="sidebar-menu-button"
                      href="../Mini_Secondary_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">
                        Mini + Secondary
                      </span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../App_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">App</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../Boxed_App_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">Boxed</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../Sticky_App_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">Sticky</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="../Fixed_Layout/instructor-edit-course.html"
                    >
                      <span className="sidebar-menu-text">Fixed</span>
                    </a>
                  </li>
                </ul>
              </div>
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
      {/* // END drawer */}
    </div>
  );
}
