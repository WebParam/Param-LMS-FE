"use client"
import React from 'react'
import { Link } from '@mui/material';

function EditAccount() {
  return (
    <div>
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
                <a className="sidebar-menu-button" href="billing-history.html">
                  Payments
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="login.html">
                  Logout
                </a>
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
                      <span className="sidebar-menu-text">ERP Dashboard</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="crm-dashboard.html"
                    >
                      <span className="sidebar-menu-text">CRM Dashboard</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="hr-dashboard.html">
                      <span className="sidebar-menu-text">HR Dashboard</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="employees.html">
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
                      <span className="sidebar-menu-text">Browse Teachers</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="student-profile.html"
                    >
                      <span className="sidebar-menu-text">Student Profile</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      href="teacher-profile.html"
                    >
                      <span className="sidebar-menu-text">Teacher Profile</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="blog.html">
                      <span className="sidebar-menu-text">Blog</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="blog-post.html">
                      <span className="sidebar-menu-text">Blog Post</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="faq.html">
                      <span className="sidebar-menu-text">FAQ</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="help-center.html">
                      {/*  */}
                      <span className="sidebar-menu-text">Help Center</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="discussions.html">
                      <span className="sidebar-menu-text">Discussions</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="discussion.html">
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
                      <span className="sidebar-menu-text">Ask Question</span>
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
                    <a className="sidebar-menu-button" href="tasks-board.html">
                      <span className="sidebar-menu-text">Tasks Board</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="tasks-list.html">
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
                      <span className="sidebar-menu-text">CMS Dashboard</span>
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
                    <a className="sidebar-menu-button" href="ecommerce.html">
                      <span className="sidebar-menu-text">Shop Dashboard</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button disabled"
                      href="edit-product.html"
                    >
                      <span className="sidebar-menu-text">Edit Product</span>
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
                  <span className="sidebar-menu-text">Student Dashboard</span>
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
                <a className="sidebar-menu-button" href="student-paths.html">
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
                <a className="sidebar-menu-button" href="student-course.html">
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    face
                  </span>
                  <span className="sidebar-menu-text">Course Preview</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="student-lesson.html">
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
                  <span className="sidebar-menu-text">Skill Assessment</span>
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
                  href="/protected/admin/dashboard"
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

              <Link href="/protected/admin/manage-courses"  style = {{textDecoration:"none"}}className="small">
              <a
                  className="sidebar-menu-button"
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    import_contacts
                  </span>
                  <span className="sidebar-menu-text">Manage Courses</span>
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
                <a
                  className="sidebar-menu-button"
                  href="instructor-edit-course.html"
                >
                  <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                    post_add
                  </span>
                  <span className="sidebar-menu-text">Edit Course</span>
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
                <a className="sidebar-menu-button" href="signup-payment.html">
                  <span className="sidebar-menu-text">Payment</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="reset-password.html">
                  <span className="sidebar-menu-text">Reset Password</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="change-password.html">
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
                  <span className="sidebar-menu-text">Email Notifications</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a
                  className="sidebar-menu-button"
                  href="edit-account-password.html"
                >
                  <span className="sidebar-menu-text">Account Password</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="billing.html">
                  <span className="sidebar-menu-text">Subscription</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="billing-upgrade.html">
                  <span className="sidebar-menu-text">Upgrade Account</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="billing-payment.html">
                  <span className="sidebar-menu-text">Payment Information</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="billing-history.html">
                  <span className="sidebar-menu-text">Payment History</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="billing-invoice.html">
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
                    <a className="sidebar-menu-button" href="ui-buttons.html">
                      <span className="sidebar-menu-text">Buttons</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-avatars.html">
                      <span className="sidebar-menu-text">Avatars</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-forms.html">
                      <span className="sidebar-menu-text">Forms</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-loaders.html">
                      <span className="sidebar-menu-text">Loaders</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-tables.html">
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
                    <a className="sidebar-menu-button" href="ui-alerts.html">
                      <span className="sidebar-menu-text">Alerts</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-badges.html">
                      <span className="sidebar-menu-text">Badges</span>
                    </a>
                  </li>
                  <li className="sidebar-menu-item">
                    <a className="sidebar-menu-button" href="ui-progress.html">
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
                      <span className="sidebar-menu-text">Range Sliders</span>
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
                  <span className="sidebar-menu-text">Mini + Secondary</span>
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
      
        <div >
            {/* <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div> */}
{/* 
            <!-- <div className="sk-bounce">
    <div className="sk-bounce-dot"></div>
    <div className="sk-bounce-dot"></div>
  </div> */}

            {/* <!-- More spinner examples at https://github.com/tobiasahlin/SpinKit/blob/master/examples.html --> */}
        </div>

        <div className="mdk-drawer-layout js-mdk-drawer-layout"
             data-push
             data-responsive-width="992px">
            <div className="mdk-drawer-layout__content page-content">

                {/* <!-- Header --> */}

                <div className="navbar navbar-expand navbar-shadow px-0  pl-lg-16pt navbar-dark bg-dark"
                     id="default-navbar"
                     data-primary>

                    {/* <!-- Navbar toggler --> */}
                    <button className="navbar-toggler d-block d-lg-none rounded-0"
                            type="button"
                            data-toggle="sidebar">
                        <span className="material-icons">menu</span>
                    </button>

                    {/* <!-- Navbar Brand --> */}
                    <a href="index.html"
                       className="navbar-brand mr-16pt d-lg-none">
                        <img className="navbar-brand-icon mr-0 mr-lg-8pt"
                             src="assets/images/logo/accent-teal-100@2x.png"
                             width="32"
                             alt="Huma"/>
                        <span className="d-none d-lg-block">Huma</span>
                    </a>

                    {/* <!-- <button className="btn navbar-btn mr-16pt" data-toggle="modal" data-target="#apps">Apps <i className="material-icons">arrow_drop_down</i></button> --> */}

                    <form className="search-form navbar-search d-none d-md-flex mr-16pt"
                          action="boxed-index.html">
                        <button className="btn"
                                type="submit"><i className="material-icons">search</i></button>
                        <input type="text"
                               className="form-control"
                               placeholder="Search ..."/>
                    </form>

                    <div className="flex"></div>

                    <div className="nav navbar-nav flex-nowrap d-none d-lg-flex mr-16pt"
                         style={{whiteSpace: "nowrap"}}>
                        <div className="nav-item dropdown d-none d-sm-flex">
                            <a 
                               className="nav-link dropdown-toggle"
                               data-toggle="dropdown">EN</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="dropdown-header"><strong>Select language</strong></div>
                                <a className="dropdown-item active"
                                   href="">English</a>
                                <a className="dropdown-item"
                                   href="">French</a>
                                <a className="dropdown-item"
                                   href="">Romanian</a>
                                <a className="dropdown-item"
                                   href="">Spanish</a>
                            </div>
                        </div>
                    </div>

                    <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
                        <div className="nav-item dropdown d-none d-sm-flex">
                            <a href="#"
                               className="nav-link d-flex align-items-center dropdown-toggle"
                               data-toggle="dropdown">
                                <img width="32"
                                     height="32"
                                     className="rounded-circle mr-8pt"
                                     src="assets/images/people/50/guy-3.jpg"
                                     alt="account" />
                                <span className="flex d-flex flex-column mr-8pt">
                                    <span className="navbar-text-100">Laza Bogdan</span>
                                    <small className="navbar-text-50">Administrator</small>
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="dropdown-header"><strong>Account</strong></div>
                                <a className="dropdown-item active"
                                   href="boxed-edit-account.html">Edit Account</a>
                                <a className="dropdown-item"
                                   href="boxed-billing.html">Billing</a>
                                <a className="dropdown-item"
                                   href="boxed-billing-history.html">Payments</a>
                                <a className="dropdown-item"
                                   href="boxed-login.html">Logout</a>
                            </div>
                        </div>
{/* 
                        <!-- Notifications dropdown --> */}
                        <div className="nav-item ml-16pt dropdown dropdown-notifications">
                            <button className="nav-link btn-flush dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    data-dropdown-disable-document-scroll
                                    data-caret="false">
                                <i className="material-icons">notifications</i>
                                <span className="badge badge-notifications badge-accent">2</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div data-perfect-scrollbar
                                     className="position-relative">
                                    <div className="dropdown-header"><strong>System notifications</strong></div>
                                    <div className="list-group list-group-flush mb-0">

                                        <a href="javascript:void(0);"
                                           className="list-group-item list-group-item-action unread">
                                            <span className="d-flex align-items-center mb-1">
                                                <small className="text-black-50">3 minutes ago</small>

                                                <span className="ml-auto unread-indicator bg-accent"></span>

                                            </span>
                                            <span className="d-flex">
                                                <span className="avatar avatar-xs mr-2">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <i className="material-icons font-size-16pt text-accent">account_circle</i>
                                                    </span>
                                                </span>
                                                <span className="flex d-flex flex-column">

                                                    <span className="text-black-70">Your profile information has not been synced correctly.</span>
                                                </span>
                                            </span>
                                        </a>

                                        <a href="javascript:void(0);"
                                           className="list-group-item list-group-item-action">
                                            <span className="d-flex align-items-center mb-1">
                                                <small className="text-black-50">5 hours ago</small>

                                            </span>
                                            <span className="d-flex">
                                                <span className="avatar avatar-xs mr-2">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <i className="material-icons font-size-16pt text-primary">group_add</i>
                                                    </span>
                                                </span>
                                                <span className="flex d-flex flex-column">
                                                    <strong className="text-black-100">Adrian. D</strong>
                                                    <span className="text-black-70">Wants to join your private group.</span>
                                                </span>
                                            </span>
                                        </a>

                                        <a href="javascript:void(0);"
                                           className="list-group-item list-group-item-action">
                                            <span className="d-flex align-items-center mb-1">
                                                <small className="text-black-50">1 day ago</small>

                                            </span>
                                            <span className="d-flex">
                                                <span className="avatar avatar-xs mr-2">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <i className="material-icons font-size-16pt text-warning">storage</i>
                                                    </span>
                                                </span>
                                                <span className="flex d-flex flex-column">

                                                    <span className="text-black-70">Your deploy was successful.</span>
                                                </span>
                                            </span>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- // END Notifications dropdown -->

                        <!-- Notifications dropdown --> */}
                        <div className="nav-item ml-16pt dropdown dropdown-notifications">
                            <button className="nav-link btn-flush dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    data-dropdown-disable-document-scroll
                                    data-caret="false">
                                <i className="material-icons icon-24pt">mail_outline</i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div data-perfect-scrollbar
                                     className="position-relative">
                                    <div className="dropdown-header"><strong>Messages</strong></div>
                                    <div className="list-group list-group-flush mb-0">

                                        <a href="javascript:void(0);"
                                           className="list-group-item list-group-item-action unread">
                                            <span className="d-flex align-items-center mb-1">
                                                <small className="text-black-50">5 minutes ago</small>

                                                <span className="ml-auto unread-indicator bg-accent"></span>

                                            </span>
                                            <span className="d-flex">
                                                <span className="avatar avatar-xs mr-2">
                                                    <img src="assets/images/people/110/woman-5.jpg"
                                                         alt="people"
                                                         className="avatar-img rounded-circle"/>
                                                </span>
                                                <span className="flex d-flex flex-column">
                                                    <strong className="text-black-100">Michelle</strong>
                                                    <span className="text-black-70">Clients loved the new design.</span>
                                                </span>
                                            </span>
                                        </a>

                                        <a href="javascript:void(0);"
                                           className="list-group-item list-group-item-action">
                                            <span className="d-flex align-items-center mb-1">
                                                <small className="text-black-50">5 minutes ago</small>

                                            </span>
                                            <span className="d-flex">
                                                <span className="avatar avatar-xs mr-2">
                                                    <img src="assets/images/people/110/woman-5.jpg"
                                                         alt="people"
                                                         className="avatar-img rounded-circle"/>
                                                </span>
                                                <span className="flex d-flex flex-column">
                                                    <strong className="text-black-100">Michelle</strong>
                                                    <span className="text-black-70">🔥 Superb job..</span>
                                                </span>
                                            </span>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- // END Notifications dropdown --> */}
                    </div>

                    <div className="dropdown border-left-2 navbar-border">
                        <button className="navbar-toggler navbar-toggler-custom d-block"
                                type="button"
                                data-toggle="dropdown"
                                data-caret="false">
                            <span className="material-icons">business_center</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-header"><strong>Select company</strong></div>
                            <a href=""
                               className="dropdown-item active d-flex align-items-center">

                                <div className="avatar avatar-sm mr-8pt">

                                    <span className="avatar-title rounded bg-primary">FM</span>

                                </div>

                                <small className="ml-4pt flex">
                                    <span className="d-flex flex-column">
                                        <strong className="text-black-100">FrontendMatter Inc.</strong>
                                        <span className="text-black-50">Administrator</span>
                                    </span>
                                </small>
                            </a>
                            <a href=""
                               className="dropdown-item d-flex align-items-center">

                                <div className="avatar avatar-sm mr-8pt">

                                    <span className="avatar-title rounded bg-accent">HH</span>

                                </div>

                                <small className="ml-4pt flex">
                                    <span className="d-flex flex-column">
                                        <strong className="text-black-100">HumaHuma Inc.</strong>
                                        <span className="text-black-50">Publisher</span>
                                    </span>
                                </small>
                            </a>
                        </div>
                    </div>

                </div>

                {/* <!-- // END Header --> */}

                <div className="border-bottom-2 py-32pt position-relative z-1">
                    <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
                        <div className="flex d-flex flex-column flex-sm-row align-items-center">

                            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                                <h2 className="mb-0">Account</h2>

                                <ol className="breadcrumb p-0 m-0">
                                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>

                                    <li className="breadcrumb-item">

                                        <a href="">Account</a>

                                    </li>

                                    <li className="breadcrumb-item active">

                                        Edit Account

                                    </li>

                                </ol>

                            </div>

                            <div className="dropdown">
                                <a href=""
                                   className="border rounded d-flex align-items-center p-16pt"
                                   data-toggle="dropdown"
                                   data-caret="false">

                                    <div className="avatar avatar-sm mr-8pt">

                                        <span className="avatar-title rounded bg-primary">FM</span>

                                    </div>

                                    <small className="ml-4pt flex">
                                        <span className="d-flex align-items-center">
                                            <span className="flex d-flex flex-column">
                                                <strong className="text-100">FrontendMatter Inc.</strong>
                                                <span className="text-50">Select company</span>
                                            </span>
                                            <i className="material-icons icon-16pt text-50 ml-4pt">arrow_drop_down</i>
                                        </span>
                                    </small>
                                </a>
                                <div className="dropdown-menu w-100">
                                    <div className="dropdown-header"><strong>Select company</strong></div>
                                    <a href=""
                                       className="dropdown-item active d-flex align-items-center">

                                        <div className="avatar avatar-sm mr-8pt">

                                            <span className="avatar-title rounded bg-primary">FM</span>

                                        </div>

                                        <small className="ml-4pt flex">
                                            <span className="d-flex flex-column">
                                                <strong className="text-black-100">FrontendMatter Inc.</strong>
                                                <span className="text-black-50">Administrator</span>
                                            </span>
                                        </small>
                                    </a>
                                    <a href=""
                                       className="dropdown-item d-flex align-items-center">

                                        <div className="avatar avatar-sm mr-8pt">

                                            <span className="avatar-title rounded bg-accent">HH</span>

                                        </div>

                                        <small className="ml-4pt flex">
                                            <span className="d-flex flex-column">
                                                <strong className="text-black-100">HumaHuma Inc.</strong>
                                                <span className="text-black-50">Publisher</span>
                                            </span>
                                        </small>
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container-fluid page__container">
                    <form action="boxed-edit-account.html">
                        <div className="row">
                            <div className="col-lg-9 pr-lg-0">

                                <div className="page-section">
                                    <h4>Basic Information</h4>
                                    <div className="list-group list-group-form">
                                        <div className="list-group-item">
                                            <div className="form-group row align-items-center mb-0">
                                                <label className="form-label col-form-label col-sm-3">First name</label>
                                                <div className="col-sm-9">
                                                    <input type="text"
                                                           className="form-control"
                                                           value="Alexander"
                                                           placeholder="Your first name ..."/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="form-group row align-items-center mb-0">
                                                <label className="form-label col-form-label col-sm-3">Last name</label>
                                                <div className="col-sm-9">
                                                    <input type="text"
                                                           className="form-control"
                                                           value="Watson"
                                                           placeholder="Your last name ..."/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="form-group row align-items-center mb-0">
                                                <label className="form-label col-form-label col-sm-3">Email address</label>
                                                <div className="col-sm-9">
                                                    <input type="email"
                                                           className="form-control"
                                                           value="alexander.watson@fake-mail.com"
                                                           placeholder="Your email address ..."/>
                                                    <small className="form-text text-muted">Note that if you change your email, you will have to confirm it again.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 page-nav">
                                <div className="page-section pt-lg-112pt">
                                    <nav className="nav page-nav__menu">
                                        <a className="nav-link active"
                                           href="boxed-edit-account.html">Basic Information</a>
                                        <a className="nav-link"
                                           href="boxed-edit-account-profile.html">Profile &amp; Privacy</a>
                                        <a className="nav-link"
                                           href="boxed-edit-account-notifications.html">Email Notifications</a>
                                        <a className="nav-link"
                                           href="boxed-edit-account-password.html">Change Password</a>
                                    </nav>
                                    <div className="page-nav__content">
                                        <button type="submit"
                                                className="btn btn-accent">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="js-fix-footer footer border-top-2">
                    <div className="container-fluid page__container page-section d-flex flex-column">
                        <p className="text-70 brand mb-24pt">
                            <img className="brand-icon"
                                 src="assets/images/logo/black-70@2x.png"
                                 width="30"
                                 alt="Huma"/> Huma
                        </p>
                        <p className="measure-lead-max text-muted mb-0 small">Huma is a beautifully crafted user interface for modern Business Admin Web Applications, with examples for many pages needed for Customer Relationship Management, Enterprise Resource Planning, Human Resources, Content Management System, Project Management, Tasks, eCommerce, Messaging and Account Management.</p>
                    </div>
                    <div className="pb-16pt pb-lg-24pt">
                        <div className="container-fluid page__container">
                            <div className="bg-dark rounded page-section py-lg-32pt px-16pt px-lg-24pt">
                                <div className="row">
                                    <div className="col-md-2 col-sm-4 mb-24pt mb-md-0">
                                        <p className="text-white-70 mb-8pt"><strong>Follow us</strong></p>
                                        <nav className="nav nav-links nav--flush">
                                            <a href="#"
                                               className="nav-link mr-8pt"><img src="assets/images/icon/footer/facebook-square@2x.png"
                                                     width="24"
                                                     height="24"
                                                     alt="Facebook"/></a>
                                            <a href="#"
                                               className="nav-link mr-8pt"><img src="assets/images/icon/footer/twitter-square@2x.png"
                                                     width="24"
                                                     height="24"
                                                     alt="Twitter"/></a>
                                            <a href="#"
                                               className="nav-link mr-8pt"><img src="assets/images/icon/footer/vimeo-square@2x.png"
                                                     width="24"
                                                     height="24"
                                                     alt="Vimeo"/></a>
                                            {/* <!-- <a href="#" className="nav-link"><img src="assets/images/icon/footer/youtube-square@2x.png" width="24" height="24" alt="YouTube"></a> --> */}
                                        </nav>
                                    </div>
                                    <div className="col-md-6 col-sm-4 mb-24pt mb-md-0 d-flex align-items-center">
                                        <a href=""
                                           className="btn btn-outline-white">English <span className="icon--right material-icons">arrow_drop_down</span></a>
                                    </div>
                                    <div className="col-md-4 text-md-right">
                                        <p className="mb-8pt d-flex align-items-md-center justify-content-md-end">
                                            <a href=""
                                               className="text-white-70 text-underline mr-16pt">Terms</a>
                                            <a href=""
                                               className="text-white-70 text-underline">Privacy policy</a>
                                        </p>
                                        <p className="text-white-50 small mb-0">Copyright 2019 &copy; All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- // END drawer-layout__content -->

            <!-- drawer --> */}
            <div className="mdk-drawer js-mdk-drawer"
                 id="default-drawer">
                <div className="mdk-drawer__content">
                    <div className="sidebar sidebar-light sidebar-left"
                         data-perfect-scrollbar>

                        <a href="boxed-index.html"
                           className="sidebar-brand sidebar-brand-dark bg-dark">
                            <img className="sidebar-brand-icon"
                                 src="assets/images/logo/accent-teal-100@2x.png"
                                 alt="Huma"/>
                            <span>Huma</span>
                        </a>

                        <div className="sidebar-heading">Overview</div>
                        <ul className="sidebar-menu">
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   href="boxed-index.html">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">insert_chart_outlined</span>
                                    <span className="sidebar-menu-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#dashboards_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">link</span>
                                    Shortcuts
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="dashboards_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-index.html">
                                            <span className="sidebar-menu-text">Analytics Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-analytics.html">
                                            <span className="sidebar-menu-text">Analytics 2 Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-projects.html">
                                            <span className="sidebar-menu-text">Projects Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-tasks-board.html">
                                            <span className="sidebar-menu-text">Tasks Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-staff.html">
                                            <span className="sidebar-menu-text">Staff Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ecommerce.html">
                                            <span className="sidebar-menu-text">Shop Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-erp-dashboard.html">
                                            <span className="sidebar-menu-text">ERP Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-crm-dashboard.html">
                                            <span className="sidebar-menu-text">CRM Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-hr-dashboard.html">
                                            <span className="sidebar-menu-text">HR Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-cms-dashboard.html">
                                            <span className="sidebar-menu-text">CMS Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="boxed-ui-card-metrics.html">
                                            <span className="sidebar-menu-text">Card Metrics</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div className="sidebar-heading">Applications</div>
                        <ul className="sidebar-menu">
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button js-sidebar-collapse"
                                   data-toggle="collapse"
                                   href="#enterprise_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">donut_large</span>
                                    Enterprise
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="enterprise_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-erp-dashboard.html">
                                            <span className="sidebar-menu-text">ERP Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-crm-dashboard.html">
                                            <span className="sidebar-menu-text">CRM Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-hr-dashboard.html">
                                            <span className="sidebar-menu-text">HR Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-employees.html">
                                            <span className="sidebar-menu-text">Employees</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-staff.html">
                                            <span className="sidebar-menu-text">Staff</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-leaves.html">
                                            <span className="sidebar-menu-text">Leaves</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="boxed-departments.html">
                                            <span className="sidebar-menu-text">Departments</span>
                                        </a>
                                    </li>
                                    {/* <!-- <li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-documents.html">
    <span className="sidebar-menu-text">Documents</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-attendance.html">
    <span className="sidebar-menu-text">Attendance</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-recruitment.html">
    <span className="sidebar-menu-text">Recruitment</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-payroll.html">
    <span className="sidebar-menu-text">Payroll</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-training.html">
    <span className="sidebar-menu-text">Training</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-employee-profile.html">
    <span className="sidebar-menu-text">Employee Profile</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-accounting.html">
    <span className="sidebar-menu-text">Accounting</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-inventory.html">
    <span className="sidebar-menu-text">Inventory</span>
  </a>
</li> --> */}
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#productivity_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">access_time</span>
                                    Productivity
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="productivity_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-projects.html">
                                            <span className="sidebar-menu-text">Projects</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-tasks-board.html">
                                            <span className="sidebar-menu-text">Tasks Board</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-tasks-list.html">
                                            <span className="sidebar-menu-text">Tasks List</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="boxed-kanban.html">
                                            <span className="sidebar-menu-text">Kanban</span>
                                        </a>
                                    </li>
                                    {/* <!-- <li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-task-details.html">
    <span className="sidebar-menu-text">Task Details</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-team-members.html">
    <span className="sidebar-menu-text">Team Members</span>
  </a>
</li> --> */}
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#ecommerce_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">shopping_cart</span>
                                    eCommerce
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="ecommerce_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ecommerce.html">
                                            <span className="sidebar-menu-text">Shop Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="boxed-edit-product.html">
                                            <span className="sidebar-menu-text">Edit Product</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#messaging_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">message</span>
                                    Messaging
                                    <span className="sidebar-menu-badge badge badge-accent badge-notifications ml-auto">2</span>
                                    <span className="sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="messaging_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-messages.html">
                                            <span className="sidebar-menu-text">Messages</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-email.html">
                                            <span className="sidebar-menu-text">Email</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* <!-- <li className="sidebar-menu-item">
          <a className="sidebar-menu-button" data-toggle="collapse" href="#marketplace_menu">
            <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">assessment</span>
            Marketplace
            <span className="ml-auto sidebar-menu-toggle-icon"></span>
          </a>
          <ul className="sidebar-submenu collapse sm-indent" id="marketplace_menu">
            <li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-digital-product.html">
    <span className="sidebar-menu-text">Digital Product</span>
  </a>
</li>
          </ul>
        </li> -->
                            <!-- <li className="sidebar-menu-item">
          <a className="sidebar-menu-button" data-toggle="collapse" href="#education_menu">
            <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">layers</span>
            Education
            <span className="ml-auto sidebar-menu-toggle-icon"></span>
          </a>
          <ul className="sidebar-submenu collapse sm-indent" id="education_menu">
            
          </ul>
        </li> --> */}
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#cms_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">content_copy</span>
                                    CMS
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="cms_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-cms-dashboard.html">
                                            <span className="sidebar-menu-text">CMS Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-posts.html">
                                            <span className="sidebar-menu-text">Posts</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu-item active open">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#account_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">account_box</span>
                                    Account
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse show sm-indent"
                                    id="account_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-pricing.html">
                                            <span className="sidebar-menu-text">Pricing</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-login.html">
                                            <span className="sidebar-menu-text">Login</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-signup.html">
                                            <span className="sidebar-menu-text">Signup</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-signup-payment.html">
                                            <span className="sidebar-menu-text">Payment</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-reset-password.html">
                                            <span className="sidebar-menu-text">Reset Password</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-change-password.html">
                                            <span className="sidebar-menu-text">Change Password</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item active">
                                        <a className="sidebar-menu-button"
                                           href="boxed-edit-account.html">
                                            <span className="sidebar-menu-text">Edit Account</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-edit-account-profile.html">
                                            <span className="sidebar-menu-text">Profile &amp; Privacy</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-edit-account-notifications.html">
                                            <span className="sidebar-menu-text">Email Notifications</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-edit-account-password.html">
                                            <span className="sidebar-menu-text">Account Password</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-billing.html">
                                            <span className="sidebar-menu-text">Subscription</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-billing-upgrade.html">
                                            <span className="sidebar-menu-text">Upgrade Account</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-billing-payment.html">
                                            <span className="sidebar-menu-text">Payment Information</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-billing-history.html">
                                            <span className="sidebar-menu-text">Payment History</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-billing-invoice.html">
                                            <span className="sidebar-menu-text">Invoice</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#community_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">people_outline</span>
                                    Community
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="community_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-faq.html">
                                            <span className="sidebar-menu-text">FAQ</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-discussions.html">
                                            <span className="sidebar-menu-text">Discussions</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-discussion.html">
                                            <span className="sidebar-menu-text">Discussion Details</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-discussions-ask.html">
                                            <span className="sidebar-menu-text">Ask Question</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div className="sidebar-heading">UI</div>
                        <ul className="sidebar-menu">
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#components_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">tune</span>
                                    Components
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="components_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-buttons.html">
                                            <span className="sidebar-menu-text">Buttons</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-avatars.html">
                                            <span className="sidebar-menu-text">Avatars</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-forms.html">
                                            <span className="sidebar-menu-text">Forms</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-loaders.html">
                                            <span className="sidebar-menu-text">Loaders</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-tables.html">
                                            <span className="sidebar-menu-text">Tables</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-cards.html">
                                            <span className="sidebar-menu-text">Cards</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-icons.html">
                                            <span className="sidebar-menu-text">Icons</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-tabs.html">
                                            <span className="sidebar-menu-text">Tabs</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-alerts.html">
                                            <span className="sidebar-menu-text">Alerts</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-badges.html">
                                            <span className="sidebar-menu-text">Badges</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-progress.html">
                                            <span className="sidebar-menu-text">Progress</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-pagination.html">
                                            <span className="sidebar-menu-text">Pagination</span>
                                        </a>
                                    </li>
                                    {/* <!-- <li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-typography.html">
    <span className="sidebar-menu-text">Typography</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-colors.html">
    <span className="sidebar-menu-text">Colors</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-breadcrumb.html">
    <span className="sidebar-menu-text">Breadcrumb</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-accordions.html">
    <span className="sidebar-menu-text">Accordions</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-modals.html">
    <span className="sidebar-menu-text">Modals</span>
  </a>
</li>
<li className="sidebar-menu-item">
  <a className="sidebar-menu-button disabled" href="boxed-ui-chips.html">
    <span className="sidebar-menu-text">Chips</span>
  </a>
</li> --> */}
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="">
                                            <span className="sidebar-menu-text">Disabled</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#plugins_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">folder</span>
                                    Plugins
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="plugins_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-charts.html">
                                            <span className="sidebar-menu-text">Charts</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-flatpickr.html">
                                            <span className="sidebar-menu-text">Flatpickr</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-daterangepicker.html">
                                            <span className="sidebar-menu-text">Date Range Picker</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-dragula.html">
                                            <span className="sidebar-menu-text">Dragula</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-dropzone.html">
                                            <span className="sidebar-menu-text">Dropzone</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-range-sliders.html">
                                            <span className="sidebar-menu-text">Range Sliders</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-quill.html">
                                            <span className="sidebar-menu-text">Quill</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-select2.html">
                                            <span className="sidebar-menu-text">Select2</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-nestable.html">
                                            <span className="sidebar-menu-text">Nestable</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-fancytree.html">
                                            <span className="sidebar-menu-text">Fancy Tree</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-maps-vector.html">
                                            <span className="sidebar-menu-text">Vector Maps</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-sweet-alert.html">
                                            <span className="sidebar-menu-text">Sweet Alert</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="boxed-ui-plugin-toastr.html">
                                            <span className="sidebar-menu-text">Toastr</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button disabled"
                                           href="">
                                            <span className="sidebar-menu-text">Disabled</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button"
                                   data-toggle="collapse"
                                   href="#layouts_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">view_compact</span>
                                    Layouts
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent"
                                    id="layouts_menu">
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="compact-edit-account.html">
                                            <span className="sidebar-menu-text">Compact</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="mini-edit-account.html">
                                            <span className="sidebar-menu-text">Mini</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="edit-account.html">
                                            <span className="sidebar-menu-text">App</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item active">
                                        <a className="sidebar-menu-button"
                                           href="boxed-edit-account.html">
                                            <span className="sidebar-menu-text">Boxed</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="sticky-edit-account.html">
                                            <span className="sidebar-menu-text">Sticky</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           href="fixed-edit-account.html">
                                            <span className="sidebar-menu-text">Fixed</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            {/* <!-- // END drawer --> */}
        </div>
        {/* <!-- // END drawer-layout -->

        <!-- App Settings FAB --> */}
        <div id="app-settings">
            {/* <app-settings layout-active="boxed"
                          :layout-location="{
      'compact': 'compact-edit-account.html',
      'mini': 'mini-edit-account.html',
      'app': 'edit-account.html',
      'boxed': 'boxed-edit-account.html',
      'sticky': 'sticky-edit-account.html',
      'default': 'fixed-edit-account.html'
    }"
                          sidebar-type="light"
                          sidebar-variant="bg-body"></app-settings> */}
        </div>
    </div>
  )
}

export default EditAccount;
