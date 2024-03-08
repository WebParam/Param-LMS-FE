"use client";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { ICourse } from "@/app/interfaces/courses";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/vendor/spinkit.css";
import "../../../assets/css/preloader.css";
import dynamic from 'next/dynamic';
import Sidebar from "@/app/components/Sidebar";
import { IQuiz } from "@/app/interfaces/quiz";
import { updateCourseFromDataBase } from "@/app/redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";
function ManageCourses() {

  const [courseHover, setCourseHover] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[] | any>()
  const [quizzes, setQuizzes] = useState<any>([])
  const cookies = new Cookies();

  const dispatch = useDispatch();

  const userData = cookies.get("param-lms-user");
  console.log(userData);

  async function ListAllCourses() {
    
  let _id = toast.loading("Please wait..", {//loader
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
      const data = await Api.GET_CoursesByUserId("65cf2b93041671b63407c9a5");
      setCourses(data)
      toast.dismiss(_id);
    } catch (error) {
      console.log("Error fetching courses:", error);
      toast.update(_id, { render: "Error loading courses", type: "error", isLoading: false });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    }
  }

  async function getAllQuizzes() {
    localStorage.removeItem("quizzes");
    try {
      const getQuizzes = await Api.GET_AllQuizzes();
      setQuizzes(getQuizzes);
  
      if (getQuizzes && getQuizzes.length > 0) {
        const mappedQuizzes = getQuizzes.map((quiz: any) => quiz.data);
        console.log("Mapped Quizzes", mappedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(mappedQuizzes));
      } else {
        console.log("No quizzes found");
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  }
  

  const editCourse = (course: any) => {
    dispatch(updateCourseFromDataBase(course?.data));
  };

  useEffect(() => {
    ListAllCourses();
    getAllQuizzes();
  }, []);



  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push=""
      data-responsive-width="992px"
      data-domfactory-upgraded="mdk-drawer-layout"
    >
      <ToastContainer />
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
                <Dropdown.Item href="edit-account.html">
                  Edit Account
                </Dropdown.Item>
                <Dropdown.Item href="billing.html">Billing</Dropdown.Item>
                <Dropdown.Item href="billing-history.html">
                  Payments
                </Dropdown.Item>
                <Dropdown.Item href="/auth/login">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* // END Navbar Menu */}
        </div>
        {/* // END Navbar */}
        {/* // END Header */}
        <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">Courses</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Courses</li>
                </ol>
              </div>
            </div>
            <div className="row" role="tablist">
              <div className="col-auto">
                <Link
                  href="/protected/admin/create-course"
                  style={{ textDecoration: "none" }}
                  className="small"
                >
                  <a className="btn btn-outline-secondary">Add Course</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* BEFORE Page Content */}
        {/* // END BEFORE Page Content */}
        {/* Page Content */}
        <div className="container page__container page-section">
          <div className="page-separator">
            <div className="page-separator__text">Development Courses</div>
          </div>
          <div className="row">
            { courses?.length > 0 && courses.map((course: any) => (
              <>
                <div className="col-sm-6 col-md-4 col-xl-3">
                  <div
                    className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal overlay--show"
                    data-overlay-onload-show=""
                    data-popover-onload-show=""
                    data-force-reveal=""
                    data-partial-height={44}
                    data-toggle="popover"
                    data-trigger="click"
                    data-original-title=""
                    title=""
                    aria-describedby="popover384631"
                    data-domfactory-upgraded="mdk-reveal,overlay"
                    style={{ height: 212 }}
                    data-opened=""
                    onClick={() => editCourse(course)}
                  >
                    <a
                      onMouseOver={() => setCourseHover(true)}
                      onMouseLeave={() => setCourseHover(false)}
                      href="/protected/admin/edit-course"
                      className="js-image"
                      data-position="center"
                      data-height="auto"
                      data-domfactory-upgraded="image"
                      style={{
                        display: "block",
                        position: "relative",
                        overflow: "hidden",
                        backgroundImage: `url(${course.data.logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        height: 168,
                      }}
                    >
                      <img
                        src="../../public/images/paths/angular_430x168.png"
                        alt="course"
                        style={{ visibility: "hidden" }}
                      />

                      {courseHover && (
                        <>
                          {" "}
                          <div
                            className="popover popover-lg fade show bs-popover-right"
                            role="tooltip"
                            id="popover384631"
                            x-placement="right"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              top: 0,
                              left: 0,
                              transform: "translate3d(275px, 145px, 0px)",
                            }}
                          >
                            <div className="arrow" style={{ top: 181 }} />
                            <h3 className="popover-header" />

                            <div className="popover-body">
                              <div className="media">
                                <div className="media-left mr-12pt">
                                  <img
                                    src="../../public/images/paths/angular_40x40@2x.png"
                                    width={40}
                                    height={40}
                                    alt="Angular"
                                    className="rounded"
                                  />
                                </div>
                                <div className="media-body">
                                  <div className="card-title mb-0">
                                    Learn Angular fundamentals
                                  </div>
                                  <p className="lh-1">
                                    <span className="text-50 small">with</span>
                                    <span className="text-50 small font-weight-bold">
                                      Elijah Murray
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <p className="my-16pt text-70">
                                Learn the fundamentals of working with Angular
                                and how to create basic applications.
                              </p>
                              <div className="mb-16pt">
                                <div className="d-flex align-items-center">
                                  <span className="material-icons icon-16pt text-50 mr-8pt">
                                    check
                                  </span>
                                  <p className="flex text-50 lh-1 mb-0">
                                    <small>
                                      Fundamentals of working with Angular
                                    </small>
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <span className="material-icons icon-16pt text-50 mr-8pt">
                                    check
                                  </span>
                                  <p className="flex text-50 lh-1 mb-0">
                                    <small>
                                      Create complete Angular applications
                                    </small>
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <span className="material-icons icon-16pt text-50 mr-8pt">
                                    check
                                  </span>
                                  <p className="flex text-50 lh-1 mb-0">
                                    <small>Working with the Angular CLI</small>
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <span className="material-icons icon-16pt text-50 mr-8pt">
                                    check
                                  </span>
                                  <p className="flex text-50 lh-1 mb-0">
                                    <small>
                                      Understanding Dependency Injection
                                    </small>
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <span className="material-icons icon-16pt text-50 mr-8pt">
                                    check
                                  </span>
                                  <p className="flex text-50 lh-1 mb-0">
                                    <small>Testing with Angular</small>
                                  </p>
                                </div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col-auto">
                                  <div className="d-flex align-items-center mb-4pt">
                                    <span className="material-icons icon-16pt text-50 mr-4pt">
                                      access_time
                                    </span>
                                    <p className="flex text-50 lh-1 mb-0">
                                      <small>6 hours</small>
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center mb-4pt">
                                    <span className="material-icons icon-16pt text-50 mr-4pt">
                                      play_circle_outline
                                    </span>
                                    <p className="flex text-50 lh-1 mb-0">
                                      <small>12 lessons</small>
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <span className="material-icons icon-16pt text-50 mr-4pt">
                                      assessment
                                    </span>
                                    <p className="flex text-50 lh-1 mb-0">
                                      <small>Beginner</small>
                                    </p>
                                  </div>
                                </div>
                                <div className="col text-right">
                                  <a
                                    href="/protected/admin/edit-course"
                                    className="btn btn-primary"
                                  >
                                    Edit course
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                        </>
                      )}
                    </a>
                    <div
                      className="mdk-reveal__content"
                      style={{ transform: "translateY(-40px)" }}
                    >
                      <div
                        className="mdk-reveal__partial"
                        style={{ height: 44 }}
                      />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex">
                            <a
                              className="card-title mb-4pt"
                              href="/protected/admin/edit-course"
                              >
                              {course.data.title}
                            </a>
                          </div>
                          <a
                                    href="/protected/admin/edit-course"
                                    className="ml-4pt material-icons text-20 card-course__icon-favorite"
                          >
                            edit
                          </a>
                        </div>
                        <div className="d-flex">
                          <div className="rating flex">
                            <span className="rating__item">
                              <span className="material-icons">star</span>
                            </span>
                            <span className="rating__item">
                              <span className="material-icons">star</span>
                            </span>
                            <span className="rating__item">
                              <span className="material-icons">star</span>
                            </span>
                            <span className="rating__item">
                              <span className="material-icons">star</span>
                            </span>
                            <span className="rating__item">
                              <span className="material-icons">
                                star_border
                              </span>
                            </span>
                          </div>
                          <small className="text-50">6 hours</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

            {/* <div  className="col-sm-6 col-md-4 col-xl-3">
          <div
            className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal "
            data-partial-height={44}
            data-toggle="popover"
            data-trigger="click"
            data-original-title=""
            title=""
            data-domfactory-upgraded="mdk-reveal,overlay"
            style={{ height: 212 }}
          >
            <a
              href="instructor-edit-course.html"
              className="js-image"
              data-position="center"
              data-height="auto"
              data-domfactory-upgraded="image"
              style={{
                display: "block",
                position: "relative",
                overflow: "hidden",
                backgroundImage:
                  'url("https://luma.humatheme.com/public/images/paths/swift_430x168.png")',
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: 168
              }}
            >
              <img
                src="../../public/images/paths/swift_430x168.png"
                alt="course"
                style={{ visibility: "hidden" }}
              />
              <span className="overlay__content align-items-start justify-content-start">
                <span className="overlay__action card-body d-flex align-items-center">
                  <i className="material-icons mr-4pt">edit</i>
                  <span className="card-title text-white">Edit</span>
                </span>
              </span>
            </a>
            <div className="mdk-reveal__content">
              <div className="mdk-reveal__partial" style={{ height: 44 }} />
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex">
                    <a
                      className="card-title mb-4pt"
                      href="instructor-edit-course.html"
                    >
                      Build an iOS Application in Swift
                    </a>
                  </div>
                  <a
                    href="instructor-edit-course.html"
                    className="ml-4pt material-icons text-20 card-course__icon-favorite"
                  >
                    edit
                  </a>
                </div>
                <div className="d-flex">
                  <div className="rating flex">
                    <span className="rating__item">
                      <span className="material-icons">star</span>
                    </span>
                    <span className="rating__item">
                      <span className="material-icons">star</span>
                    </span>
                    <span className="rating__item">
                      <span className="material-icons">star</span>
                    </span>
                    <span className="rating__item">
                      <span className="material-icons">star</span>
                    </span>
                    <span className="rating__item">
                      <span className="material-icons">star_border</span>
                    </span>
                  </div>
                  <small className="text-50">6 hours</small>
                </div>
              </div>
            </div>
          </div>
          <div className="popoverContainer d-none">
            <div className="media">
              <div className="media-left mr-12pt">
                <img
                  src="../../public/images/paths/swift_40x40@2x.png"
                  width={40}
                  height={40}
                  alt="Angular"
                  className="rounded"
                />
              </div>
              <div className="media-body">
                <div className="card-title mb-0">
                  Build an iOS Application in Swift
                </div>
                <p className="lh-1">
                  <span className="text-50 small">with</span>
                  <span className="text-50 small font-weight-bold">
                    Elijah Murray
                  </span>
                </p>
              </div>
            </div>
            <p className="my-16pt text-70">
              Learn the fundamentals of working with Angular and how to create
              basic applications.
            </p>
            <div className="mb-16pt">
              <div className="d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-8pt">
                  check
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>Fundamentals of working with Angular</small>
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-8pt">
                  check
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>Create complete Angular applications</small>
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-8pt">
                  check
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>Working with the Angular CLI</small>
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-8pt">
                  check
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>Understanding Dependency Injection</small>
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-8pt">
                  check
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>Testing with Angular</small>
                </p>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="d-flex align-items-center mb-4pt">
                  <span className="material-icons icon-16pt text-50 mr-4pt">
                    access_time
                  </span>
                  <p className="flex text-50 lh-1 mb-0">
                    <small>6 hours</small>
                  </p>
                </div>
                <div className="d-flex align-items-center mb-4pt">
                  <span className="material-icons icon-16pt text-50 mr-4pt">
                    play_circle_outline
                  </span>
                  <p className="flex text-50 lh-1 mb-0">
                    <small>12 lessons</small>
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="material-icons icon-16pt text-50 mr-4pt">
                    assessment
                  </span>
                  <p className="flex text-50 lh-1 mb-0">
                    <small>Beginner</small>
                  </p>
                </div>
              </div>
              <div className="col text-right">
                <a
                  href="instructor-edit-course.html"
                  className="btn btn-primary"
                >
                  Edit course
                </a>
              </div>
            </div>
          </div>
        </div> */}
          </div>
          <div className="mb-32pt">
            <ul className="pagination justify-content-start pagination-xsm m-0">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true" className="material-icons">
                    chevron_left
                  </span>
                  <span>Prev</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Page 1">
                  <span>1</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Page 2">
                  <span>2</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span>Next</span>
                  <span aria-hidden="true" className="material-icons">
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
            
          </div>
          <div className="page-separator">
            <div className="page-separator__text">Design Courses</div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div
                className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal "
                data-partial-height={44}
                data-toggle="popover"
                data-trigger="click"
                data-original-title=""
                title=""
                data-domfactory-upgraded="mdk-reveal,overlay"
                style={{ height: 212 }}
              >
                <a
                  href="instructor-edit-course.html"
                  className="js-image"
                  data-position="center"
                  data-height="auto"
                  data-domfactory-upgraded="image"
                  style={{
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage:
                      'url("https://luma.humatheme.com/public/images/paths/sketch_430x168.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: 168,
                  }}
                >
                  <img
                    src="../../public/images/paths/sketch_430x168.png"
                    alt="course"
                    style={{ visibility: "hidden" }}
                  />
                  <span className="overlay__content align-items-start justify-content-start">
                    <span className="overlay__action card-body d-flex align-items-center">
                      <i className="material-icons mr-4pt">edit</i>
                      <span className="card-title text-white">Edit</span>
                    </span>
                  </span>
                </a>
                <div className="mdk-reveal__content">
                  <div className="mdk-reveal__partial" style={{ height: 44 }} />
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="flex">
                        <a
                          className="card-title mb-4pt"
                          href="instructor-edit-course.html"
                        >
                          Learn Sketch
                        </a>
                      </div>
                      <a
                        href="instructor-edit-course.html"
                        className="ml-4pt material-icons text-20 card-course__icon-favorite"
                      >
                        edit
                      </a>
                    </div>
                    <div className="d-flex">
                      <div className="rating flex">
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                      </div>
                      <small className="text-50">6 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popoverContainer d-none">
                <div className="media">
                  <div className="media-left mr-12pt">
                    <img
                      src="../../public/images/paths/sketch_40x40@2x.png"
                      width={40}
                      height={40}
                      alt="Angular"
                      className="rounded"
                    />
                  </div>
                  <div className="media-body">
                    <div className="card-title mb-0">Learn Sketch</div>
                    <p className="lh-1">
                      <span className="text-50 small">with</span>
                      <span className="text-50 small font-weight-bold">
                        Elijah Murray
                      </span>
                    </p>
                  </div>
                </div>
                <p className="my-16pt text-70">
                  Learn the fundamentals of working with Angular and how to
                  create basic applications.
                </p>
                <div className="mb-16pt">
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Fundamentals of working with Angular</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Create complete Angular applications</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Working with the Angular CLI</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Understanding Dependency Injection</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Testing with Angular</small>
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        access_time
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>6 hours</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        play_circle_outline
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>12 lessons</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        assessment
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Beginner</small>
                      </p>
                    </div>
                  </div>
                  <div className="col text-right">
                    <a
                      href="instructor-edit-course.html"
                      className="btn btn-primary"
                    >
                      Edit course
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div
                className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal "
                data-partial-height={44}
                data-toggle="popover"
                data-trigger="click"
                data-original-title=""
                title=""
                data-domfactory-upgraded="mdk-reveal,overlay"
                style={{ height: 212 }}
              >
                <a
                  href="instructor-edit-course.html"
                  className="js-image"
                  data-position="center"
                  data-height="auto"
                  data-domfactory-upgraded="image"
                  style={{
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage:
                      'url("https://luma.humatheme.com/public/images/paths/flinto_430x168.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: 168,
                  }}
                >
                  <img
                    src="../../public/images/paths/flinto_430x168.png"
                    alt="course"
                    style={{ visibility: "hidden" }}
                  />
                  <span className="overlay__content align-items-start justify-content-start">
                    <span className="overlay__action card-body d-flex align-items-center">
                      <i className="material-icons mr-4pt">edit</i>
                      <span className="card-title text-white">Edit</span>
                    </span>
                  </span>
                </a>
                <div className="mdk-reveal__content">
                  <div className="mdk-reveal__partial" style={{ height: 44 }} />
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="flex">
                        <a
                          className="card-title mb-4pt"
                          href="instructor-edit-course.html"
                        >
                          Learn Flinto
                        </a>
                      </div>
                      <a
                        href="instructor-edit-course.html"
                        className="ml-4pt material-icons text-20 card-course__icon-favorite"
                      >
                        edit
                      </a>
                    </div>
                    <div className="d-flex">
                      <div className="rating flex">
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                      </div>
                      <small className="text-50">6 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popoverContainer d-none">
                <div className="media">
                  <div className="media-left mr-12pt">
                    <img
                      src="../../public/images/paths/flinto_40x40@2x.png"
                      width={40}
                      height={40}
                      alt="Angular"
                      className="rounded"
                    />
                  </div>
                  <div className="media-body">
                    <div className="card-title mb-0">Learn Flinto</div>
                    <p className="lh-1">
                      <span className="text-50 small">with</span>
                      <span className="text-50 small font-weight-bold">
                        Elijah Murray
                      </span>
                    </p>
                  </div>
                </div>
                <p className="my-16pt text-70">
                  Learn the fundamentals of working with Angular and how to
                  create basic applications.
                </p>
                <div className="mb-16pt">
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Fundamentals of working with Angular</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Create complete Angular applications</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Working with the Angular CLI</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Understanding Dependency Injection</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Testing with Angular</small>
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        access_time
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>6 hours</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        play_circle_outline
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>12 lessons</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        assessment
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Beginner</small>
                      </p>
                    </div>
                  </div>
                  <div className="col text-right">
                    <a
                      href="instructor-edit-course.html"
                      className="btn btn-primary"
                    >
                      Edit course
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div
                className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal "
                data-partial-height={44}
                data-toggle="popover"
                data-trigger="click"
                data-original-title=""
                title=""
                data-domfactory-upgraded="mdk-reveal,overlay"
                style={{ height: 212 }}
              >
                <a
                  href="instructor-edit-course.html"
                  className="js-image"
                  data-position="center"
                  data-height="auto"
                  data-domfactory-upgraded="image"
                  style={{
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage:
                      'url("https://luma.humatheme.com/public/images/paths/photoshop_430x168.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: 168,
                  }}
                >
                  <img
                    src="../../public/images/paths/photoshop_430x168.png"
                    alt="course"
                    style={{ visibility: "hidden" }}
                  />
                  <span className="overlay__content align-items-start justify-content-start">
                    <span className="overlay__action card-body d-flex align-items-center">
                      <i className="material-icons mr-4pt">edit</i>
                      <span className="card-title text-white">Edit</span>
                    </span>
                  </span>
                </a>
                <div className="mdk-reveal__content">
                  <div className="mdk-reveal__partial" style={{ height: 44 }} />
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="flex">
                        <a
                          className="card-title mb-4pt"
                          href="instructor-edit-course.html"
                        >
                          Learn Photoshop
                        </a>
                      </div>
                      <a
                        href="instructor-edit-course.html"
                        className="ml-4pt material-icons text-20 card-course__icon-favorite"
                      >
                        edit
                      </a>
                    </div>
                    <div className="d-flex">
                      <div className="rating flex">
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                      </div>
                      <small className="text-50">6 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popoverContainer d-none">
                <div className="media">
                  <div className="media-left mr-12pt">
                    <img
                      src="../../public/images/paths/photoshop_40x40@2x.png"
                      width={40}
                      height={40}
                      alt="Angular"
                      className="rounded"
                    />
                  </div>
                  <div className="media-body">
                    <div className="card-title mb-0">Learn Photoshop</div>
                    <p className="lh-1">
                      <span className="text-50 small">with</span>
                      <span className="text-50 small font-weight-bold">
                        Elijah Murray
                      </span>
                    </p>
                  </div>
                </div>
                <p className="my-16pt text-70">
                  Learn the fundamentals of working with Angular and how to
                  create basic applications.
                </p>
                <div className="mb-16pt">
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Fundamentals of working with Angular</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Create complete Angular applications</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Working with the Angular CLI</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Understanding Dependency Injection</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Testing with Angular</small>
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        access_time
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>6 hours</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        play_circle_outline
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>12 lessons</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        assessment
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Beginner</small>
                      </p>
                    </div>
                  </div>
                  <div className="col text-right">
                    <a
                      href="instructor-edit-course.html"
                      className="btn btn-primary"
                    >
                      Edit course
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div
                className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary js-overlay mdk-reveal js-mdk-reveal "
                data-partial-height={44}
                data-toggle="popover"
                data-trigger="click"
                data-original-title=""
                title=""
                data-domfactory-upgraded="mdk-reveal,overlay"
                style={{ height: 212 }}
              >
                <a
                  href="instructor-edit-course.html"
                  className="js-image"
                  data-position="center"
                  data-height="auto"
                  data-domfactory-upgraded="image"
                  style={{
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage:
                      'url("https://luma.humatheme.com/public/images/paths/mailchimp_430x168.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: 168,
                  }}
                >
                  <img
                    src="../../public/images/paths/mailchimp_430x168.png"
                    alt="course"
                    style={{ visibility: "hidden" }}
                  />
                  <span className="overlay__content align-items-start justify-content-start">
                    <span className="overlay__action card-body d-flex align-items-center">
                      <i className="material-icons mr-4pt">edit</i>
                      <span className="card-title text-white">Edit</span>
                    </span>
                  </span>
                </a>
                <div className="mdk-reveal__content">
                  <div className="mdk-reveal__partial" style={{ height: 44 }} />
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="flex">
                        <a
                          className="card-title mb-4pt"
                          href="instructor-edit-course.html"
                        >
                          Newsletter Design
                        </a>
                      </div>
                      <a
                        href="instructor-edit-course.html"
                        className="ml-4pt material-icons text-20 card-course__icon-favorite"
                      >
                        edit
                      </a>
                    </div>
                    <div className="d-flex">
                      <div className="rating flex">
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                      </div>
                      <small className="text-50">6 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popoverContainer d-none">
                <div className="media">
                  <div className="media-left mr-12pt">
                    <img
                      src="../../public/images/paths/mailchimp_40x40@2x.png"
                      width={40}
                      height={40}
                      alt="Angular"
                      className="rounded"
                    />
                  </div>
                  <div className="media-body">
                    <div className="card-title mb-0">Newsletter Design</div>
                    <p className="lh-1">
                      <span className="text-50 small">with</span>
                      <span className="text-50 small font-weight-bold">
                        Elijah Murray
                      </span>
                    </p>
                  </div>
                </div>
                <p className="my-16pt text-70">
                  Learn the fundamentals of working with Angular and how to
                  create basic applications.
                </p>
                <div className="mb-16pt">
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Fundamentals of working with Angular</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Create complete Angular applications</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Working with the Angular CLI</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Understanding Dependency Injection</small>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="material-icons icon-16pt text-50 mr-8pt">
                      check
                    </span>
                    <p className="flex text-50 lh-1 mb-0">
                      <small>Testing with Angular</small>
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        access_time
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>6 hours</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center mb-4pt">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        play_circle_outline
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>12 lessons</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-4pt">
                        assessment
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Beginner</small>
                      </p>
                    </div>
                  </div>
                  <div className="col text-right">
                    <a
                      href="instructor-edit-course.html"
                      className="btn btn-primary"
                    >
                      Edit course
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="pagination justify-content-start pagination-xsm m-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true" className="material-icons">
                  chevron_left
                </span>
                <span>Prev</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Page 1">
                <span>1</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Page 2">
                <span>2</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span>Next</span>
                <span aria-hidden="true" className="material-icons">
                  chevron_right
                </span>
              </a>
            </li>
          </ul>

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

 
      {/* // END drawer */}
      <Sidebar/>
    </div>
  );
}

export default dynamic (() => Promise.resolve(ManageCourses), {ssr: false})


      {/*when you hover onto the course*/}

          {/* <div className="popover-body">
        <div className="media">
          <div className="media-left mr-12pt">
            <img
              src="../../public/images/paths/angular_40x40@2x.png"
              width={40}
              height={40}
              alt="Angular"
              className="rounded"
            />
          </div>
          <div className="media-body">
            <div className="card-title mb-0">Learn Angular fundamentals</div>
            <p className="lh-1">
              <span className="text-50 small">with</span>
              <span className="text-50 small font-weight-bold">
                Elijah Murray
              </span>
            </p>
          </div>
        </div>
        <p className="my-16pt text-70">
          Learn the fundamentals of working with Angular and how to create basic
          applications.
        </p>
        <div className="mb-16pt">
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">
              check
            </span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Fundamentals of working with Angular</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">
              check
            </span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Create complete Angular applications</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">
              check
            </span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Working with the Angular CLI</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">
              check
            </span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Understanding Dependency Injection</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">
              check
            </span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Testing with Angular</small>
            </p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center mb-4pt">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                access_time
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>6 hours</small>
              </p>
            </div>
            <div className="d-flex align-items-center mb-4pt">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                play_circle_outline
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>12 lessons</small>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                assessment
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>Beginner</small>
              </p>
            </div>
          </div>
          <div className="col text-right">
            <a href="instructor-edit-course.html" className="btn btn-primary">
              Edit course
            </a>
          </div>
        </div>
      </div> */}

          {/*when you hover onto the course*/}