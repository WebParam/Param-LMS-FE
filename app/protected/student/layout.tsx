import Sidebar from "@/app/components/Sidebar";
import { ReduxProvider } from "@/app/provider";
import Image from "next/image";
import Link from 'next/link'

import Cookies from "universal-cookie";
var cookies =new Cookies();
export const metadata = {
  title: "Student - Portal",
  description: "Supercharge your learning",
};



export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {

 
  return (
    <ReduxProvider>
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
    {/* Header */}
    <div
      className="navbar navbar-expand navbar-light border-bottom-2"
      id="default-navbar"
      data-primary=""
    >
      {/* Navbar toggler */}
      <button
        className="navbar-toggler w-auto mr-16pt d-block d-lg-none rounded-0"
        type="button"
        data-toggle="sidebar"
      >
        <span className="material-icons">short_text</span>
      </button>
      {/* Navbar Brand */}
      <a href="index.html" className="navbar-brand mr-16pt d-lg-none">
        {/* <img class="navbar-brand-icon" src="../../public/images/logo/white-100@2x.png" width="30" alt="Luma"> */}
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
      <ul className="nav navbar-nav d-none d-sm-flex flex justify-content-start ml-8pt">
        <li className="nav-item">
          <a href="index.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            data-caret="false"
          >
            Courses
          </a>
          <div className="dropdown-menu">
            <a href="courses.html" className="dropdown-item">
              Browse Courses
            </a>
            <a href="student-course.html" className="dropdown-item active">
              Preview Course
            </a>
            <a href="student-lesson.html" className="dropdown-item">
              Preview Lesson
            </a>
            <a href="student-take-course.html" className="dropdown-item">
              <span className="mr-16pt">Take Course</span>{" "}
              <span className="badge badge-notifications badge-accent text-uppercase ml-auto">
                Pro
              </span>
            </a>
            <a href="student-take-lesson.html" className="dropdown-item">
              Take Lesson
            </a>
            <a href="student-take-quiz.html" className="dropdown-item">
              Take Quiz
            </a>
            <a
              href="student-quiz-result-details.html"
              className="dropdown-item"
            >
              Quiz Result
            </a>
            <a href="student-dashboard.html" className="dropdown-item">
              Student Dashboard
            </a>
            <a href="student-my-courses.html" className="dropdown-item">
              My Courses
            </a>
            <a href="student-quiz-results.html" className="dropdown-item">
              My Quizzes
            </a>
            <a href="help-center.html" className="dropdown-item">
              Help Center
            </a>
          </div>
        </li>
        <li className="nav-item dropdown">
       
            <Link href="/protected/student/assessments" className="nav-link">
              Assessment
            </Link>
        </li>
        <li className="nav-item">
          <a href="pricing.html" className="nav-link">
            Pricing
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            data-caret="false"
          >
            Teachers
          </a>
          <div className="dropdown-menu">
            <a href="instructor-dashboard.html" className="dropdown-item">
              Instructor Dashboard
            </a>
            <a href="instructor-courses.html" className="dropdown-item">
              Manage Courses
            </a>
            <a href="instructor-quizzes.html" className="dropdown-item">
              Manage Quizzes
            </a>
            <a href="instructor-earnings.html" className="dropdown-item">
              Earnings
            </a>
            <a href="instructor-statement.html" className="dropdown-item">
              Statement
            </a>
            <a href="instructor-edit-course.html" className="dropdown-item">
              Edit Course
            </a>
            <a href="instructor-edit-quiz.html" className="dropdown-item">
              Edit Quiz
            </a>
          </div>
        </li>
        <li
          className="nav-item dropdown"
          data-toggle="tooltip"
          data-title="Community"
          data-placement="bottom"
          data-boundary="window"
          data-original-title=""
          title=""
        >
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            data-caret="false"
          >
            <i className="material-icons">people_outline</i>
          </a>
          <div className="dropdown-menu">
            <a href="teachers.html" className="dropdown-item">
              Browse Teachers
            </a>
            <a href="student-profile.html" className="dropdown-item">
              Student Profile
            </a>
            <a href="teacher-profile.html" className="dropdown-item">
              Instructor Profile
            </a>
            <a href="blog.html" className="dropdown-item">
              Blog
            </a>
            <a href="blog-post.html" className="dropdown-item">
              Blog Post
            </a>
            <a href="faq.html" className="dropdown-item">
              FAQ
            </a>
            <a href="help-center.html" className="dropdown-item">
              Help Center
            </a>
            <a href="discussions.html" className="dropdown-item">
              Discussions
            </a>
            <a href="discussion.html" className="dropdown-item">
              Discussion Details
            </a>
            <a href="discussions-ask.html" className="dropdown-item">
              Ask Question
            </a>
          </div>
        </li>
      </ul>
      <ul className="nav navbar-nav ml-auto mr-0">
        <li className="nav-item">
          <a
            href="login.html"
            className="nav-link"
            data-toggle="tooltip"
            data-title="Login"
            data-placement="bottom"
            data-boundary="window"
            data-original-title=""
            title=""
          >
            <i className="material-icons">lock_open</i>
          </a>
        </li>
        <li className="nav-item">
          <a href="signup.html" className="btn btn-outline-dark">
            Get Started
          </a>
        </li>
      </ul>
    </div>
    {/* // END Header */}
    {/* BEFORE Page Content */}
    {/* // END BEFORE Page Content */}
    {/* Page Content */}
   <>
   {children}
   </>
    {/* // END Page Content */}
    {/* Footer */}
   
    {/* // END Footer */}
  </div>
  {/* // END drawer-layout__content */}
  {/* Drawer */}
  <Sidebar/>
  {/* // END Drawer */}
</div>
</ReduxProvider>
  );
}
