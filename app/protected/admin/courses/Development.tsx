import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateCourseFromDataBase } from "@/app/redux/courseSlice";
import { ICourse } from "@/app/interfaces/courses";
import { NextPage } from 'next';

export const Development: NextPage<{courses: ICourse[]}> = ({courses})  => {
    const [courseHover, setCourseHover] = useState<boolean>(false);
    const editCourse = (course: any) => {
        dispatch(updateCourseFromDataBase(course?.data));
      };
      const dispatch = useDispatch();
    
  return (
      <>
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
                          
                        >
                          Learn Sketch
                        </a>
                      </div>
                      <a
                        
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
                        
                        >
                          Learn Flinto
                        </a>
                      </div>
                      <a
                       
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
                        >
                          Learn Photoshop
                        </a>
                      </div>
                      <a                        
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
                        >
                          Newsletter Design
                        </a>
                      </div>
                      <a                        
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
      </>
    )
}