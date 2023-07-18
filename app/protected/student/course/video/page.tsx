import Image from 'next/image'
import styles from './page.module.css'

export default function CourseDetail() {
  return (

<>
<>
  <div
    className="navbar navbar-light border-0 navbar-expand-sm"
    style={{ whiteSpace: "nowrap" }}
  >
    <div className="container page__container flex-column flex-sm-row">
      <nav className="nav navbar-nav">
        <div className="nav-item py-16pt py-sm-0">
          <div className="media flex-nowrap">
            <div className="media-left mr-16pt">
              <a href="student-take-course.html">
                <img
                  src="../../public/images/paths/angular_64x64.png"
                  width={40}
                  alt="Angular"
                  className="rounded"
                />
              </a>
            </div>
            <div className="media-body d-flex flex-column">
              <a href="student-take-course.html" className="card-title">
                Angular Fundamentals
              </a>
              <div className="d-flex">
                <span className="text-50 small font-weight-bold mr-8pt">
                  Elijah Murray
                </span>
                <span className="text-50 small">
                  Software Engineer and Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ul className="nav navbar-nav ml-sm-auto align-items-center align-items-sm-end d-none d-lg-flex">
        <li className="nav-item active ml-sm-16pt">
          <a href="" className="nav-link">
            Video
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            Downloads
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            Notes
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            Discussions
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div className="bg-primary pb-lg-64pt py-32pt">
    <div className="container page__container">
      <nav className="course-nav">
        <a
          data-toggle="tooltip"
          data-placement="bottom"
          data-title="Getting Started with Angular: Introduction"
          href=""
          data-original-title=""
          title=""
        >
          <span className="material-icons">check_circle</span>
        </a>
        <a
          data-toggle="tooltip"
          data-placement="bottom"
          data-title="Getting Started with Angular: Introduction to TypeScript"
          href=""
          data-original-title=""
          title=""
        >
          <span className="material-icons text-primary">account_circle</span>
        </a>
        <a
          data-toggle="tooltip"
          data-placement="bottom"
          data-title="Getting Started with Angular: Comparing Angular to AngularJS"
          href=""
          data-original-title=""
          title=""
        >
          <span className="material-icons">play_circle_outline</span>
        </a>
        <a
          data-toggle="tooltip"
          data-placement="bottom"
          data-title="Quiz: Getting Started with Angular"
          href="student-take-quiz.html"
          data-original-title=""
          title=""
        >
          <span className="material-icons">hourglass_empty</span>
        </a>
      </nav>
      <div className="js-player bg-primary embed-responsive embed-responsive-16by9 mb-32pt" data-domfactory-upgraded="player">
                      <div className="player embed-responsive-item">
                          <div className="player__content">
                              <div className="player__image" ></div>
                              <a href="" className="player__play bg-primary">
                                  <span className="material-icons">play_arrow</span>
                              </a>
                          </div>
                          <div className="player__embed d-none">
                              <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"></iframe>
                          </div>
                      </div>
                  </div>
      <div className="d-flex flex-wrap align-items-end mb-16pt">
        <h1 className="text-white flex m-0">Introduction to TypeScript</h1>
        <p className="h1 text-white-50 font-weight-light m-0">50:13</p>
      </div>
      <p className="hero__lead measure-hero-lead text-white-50 mb-24pt">
        JavaScript is now used to power backends, create hybrid mobile
        applications, architect cloud solutions, design neural networks and even
        control robots. Enter TypeScript: a superset of JavaScript for scalable,
        secure, performant and feature-rich applications.
      </p>
      <a href="" className="btn btn-white">
        Resume lesson
      </a>
    </div>
  </div>
  <div className="navbar navbar-expand-sm navbar-light bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
    <div className="container page__container">
      <ul className="nav navbar-nav flex align-items-sm-center">
        <li className="nav-item navbar-list__item">
          <div className="media align-items-center">
            <span className="media-left mr-16pt">
              <img
                src="../../public/images/people/50/guy-6.jpg"
                width={40}
                alt="avatar"
                className="rounded-circle"
              />
            </span>
            <div className="media-body">
              <a className="card-title m-0" href="teacher-profile.html">
                Eddie Bryan
              </a>
              <p className="text-50 lh-1 mb-0">Instructor</p>
            </div>
          </div>
        </li>
        <li className="nav-item navbar-list__item">
          <i className="material-icons text-muted icon--left">schedule</i>
          2h 46m
        </li>
        <li className="nav-item navbar-list__item">
          <i className="material-icons text-muted icon--left">assessment</i>
          Beginner
        </li>
        <li className="nav-item ml-sm-auto text-sm-center flex-column navbar-list__item">
          <div className="rating rating-24">
            <div className="rating__item">
              <i className="material-icons">star</i>
            </div>
            <div className="rating__item">
              <i className="material-icons">star</i>
            </div>
            <div className="rating__item">
              <i className="material-icons">star</i>
            </div>
            <div className="rating__item">
              <i className="material-icons">star</i>
            </div>
            <div className="rating__item">
              <i className="material-icons">star_border</i>
            </div>
          </div>
          <p className="lh-1 mb-0">
            <small className="text-muted">20 ratings</small>
          </p>
        </li>
      </ul>
    </div>
  </div>
  <div className="page-section">
    <div className="container page__container">
      <div className="d-flex align-items-center mb-heading">
        <h4 className="m-0">Discussions</h4>
        <a href="discussions-ask.html" className="text-underline ml-auto">
          Ask a Question
        </a>
      </div>
      <div className="border-top">
        <div className="list-group list-group-flush">
          <div className="list-group-item p-3">
            <div className="row align-items-start">
              <div className="col-md-3 mb-8pt mb-md-0">
                <div className="media align-items-center">
                  <div className="media-left mr-12pt">
                    <a href="" className="avatar avatar-sm">
                      {/* <img src="../../LB" alt="avatar" class="avatar-img rounded-circle"> */}
                      <span className="avatar-title rounded-circle">LB</span>
                    </a>
                  </div>
                  <div className="d-flex flex-column media-body media-middle">
                    <a href="" className="card-title">
                      Laza Bogdan
                    </a>
                    <small className="text-muted">2 days ago</small>
                  </div>
                </div>
              </div>
              <div className="col mb-8pt mb-md-0">
                <p className="mb-8pt">
                  <a href="discussion.html" className="text-body">
                    <strong>
                      Using Angular HttpClientModule instead of HttpModule
                    </strong>
                  </a>
                </p>
                <a
                  href="discussion.html"
                  className="chip chip-outline-secondary"
                >
                  Angular fundamentals
                </a>
              </div>
              <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                <h5 className="m-0">1</h5>
                <p className="lh-1 mb-0">
                  <small className="text-70">answers</small>
                </p>
              </div>
            </div>
          </div>
          <div className="list-group-item p-3">
            <div className="row align-items-start">
              <div className="col-md-3 mb-8pt mb-md-0">
                <div className="media align-items-center">
                  <div className="media-left mr-12pt">
                    <a href="" className="avatar avatar-sm">
                      {/* <img src="../../AC" alt="avatar" class="avatar-img rounded-circle"> */}
                      <span className="avatar-title rounded-circle">AC</span>
                    </a>
                  </div>
                  <div className="d-flex flex-column media-body media-middle">
                    <a href="" className="card-title">
                      Adam Curtis
                    </a>
                    <small className="text-muted">3 days ago</small>
                  </div>
                </div>
              </div>
              <div className="col mb-8pt mb-md-0">
                <p className="mb-0">
                  <a href="discussion.html" className="text-body">
                    <strong>
                      Why am I getting an error when trying to install
                      angular/http@2.4.2
                    </strong>
                  </a>
                </p>
              </div>
              <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                <h5 className="m-0">1</h5>
                <p className="lh-1 mb-0">
                  <small className="text-70">answers</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="discussions.html" className="btn btn-outline-secondary">
        See all discussions for this lesson
      </a>
    </div>
  </div>
  {/* // END Page Content */}
</>

</>
  
  )
}
