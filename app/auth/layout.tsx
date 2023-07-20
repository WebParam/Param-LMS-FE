import Image from "next/image";

export const metadata = {
  title: "Login",
  description: "Supercharge your learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<>


<div
    className="mdk-header-layout js-mdk-header-layout"
    data-domfactory-upgraded="mdk-header-layout"
  >
    {/* Header */}
    <div
      id="header"
      className="mdk-header js-mdk-header mb-0"
      data-fixed=""
      data-retarget-mouse-scroll=""
      data-domfactory-upgraded="mdk-header"
      style={{ paddingTop: 64 }}
    >
      <div className="mdk-header__bg">
        <div className="mdk-header__bg-front" />
        <div className="mdk-header__bg-rear" />
      </div>
      <div className="mdk-header__content">
        <div
          className="navbar navbar-expand px-0 navbar-dark bg-dark mdk-header--fixed"
          id="default-navbar"
          data-primary="data-primary"
        >
          {/* Navbar toggler */}
          <button
            className="navbar-toggler d-block rounded-0"
            type="button"
            data-toggle="sidebar"
          >
            <span className="material-icons">menu</span>
          </button>
          {/* Navbar Brand */}
          <a href="index.html" className="navbar-brand mr-16pt">
            <img
              className="navbar-brand-icon mr-0 mr-lg-8pt"
              src="assets/images/logo/accent-teal-100@2x.png"
              width={32}
              alt="Huma"
            />
            <span className="d-none d-lg-block">Huma</span>
          </a>
          {/* <button class="btn navbar-btn mr-16pt" data-toggle="modal" data-target="#apps">Apps <i class="material-icons">arrow_drop_down</i></button> */}
          <form
            className="search-form navbar-search d-none d-md-flex mr-16pt"
            action="fixed-index.html"
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
          <div className="flex" />
          <div
            className="nav navbar-nav flex-nowrap d-none d-lg-flex mr-16pt"
            style={{ whiteSpace: "nowrap" }}
          >
            <div className="nav-item dropdown d-none d-sm-flex">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                EN
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header">
                  <strong>Select language</strong>
                </div>
                <a className="dropdown-item active" href="">
                  English
                </a>
                <a className="dropdown-item" href="">
                  French
                </a>
                <a className="dropdown-item" href="">
                  Romanian
                </a>
                <a className="dropdown-item" href="">
                  Spanish
                </a>
              </div>
            </div>
          </div>
          <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
            <div className="nav-item dropdown d-none d-sm-flex">
              <a
                href="#"
                className="nav-link d-flex align-items-center dropdown-toggle"
                data-toggle="dropdown"
              >
                <img
                  width={32}
                  height={32}
                  className="rounded-circle mr-8pt"
                  src="assets/images/people/50/guy-3.jpg"
                  alt="account"
                />
                <span className="flex d-flex flex-column mr-8pt">
                  <span className="navbar-text-100">Laza Bogdan</span>
                  <small className="navbar-text-50">Administrator</small>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header">
                  <strong>Account</strong>
                </div>
                <a className="dropdown-item" href="fixed-edit-account.html">
                  Edit Account
                </a>
                <a className="dropdown-item" href="fixed-billing.html">
                  Billing
                </a>
                <a className="dropdown-item" href="fixed-billing-history.html">
                  Payments
                </a>
                <a className="dropdown-item" href="fixed-login.html">
                  Logout
                </a>
              </div>
            </div>
            {/* Notifications dropdown */}
            <div className="nav-item ml-16pt dropdown dropdown-notifications">
              <button
                className="nav-link btn-flush dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                data-dropdown-disable-document-scroll=""
                data-caret="false"
              >
                <i className="material-icons">notifications</i>
                <span className="badge badge-notifications badge-accent">2</span>
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
            {/* Notifications dropdown */}
            <div className="nav-item ml-16pt dropdown dropdown-notifications">
              <button
                className="nav-link btn-flush dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                data-dropdown-disable-document-scroll=""
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
                            src="assets/images/people/110/woman-5.jpg"
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
                            src="assets/images/people/110/woman-5.jpg"
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
          </div>
          <div className="dropdown border-left-2 navbar-border">
            <button
              className="navbar-toggler navbar-toggler-custom d-block"
              type="button"
              data-toggle="dropdown"
              data-caret="false"
            >
              <span className="material-icons">business_center</span>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-header">
                <strong>Select company</strong>
              </div>
              <a
                href=""
                className="dropdown-item active d-flex align-items-center"
              >
                <div className="avatar avatar-sm mr-8pt">
                  <span className="avatar-title rounded bg-primary">FM</span>
                </div>
                <small className="ml-4pt flex">
                  <span className="d-flex flex-column">
                    <strong className="text-black-100">
                      FrontendMatter Inc.
                    </strong>
                    <span className="text-black-50">Administrator</span>
                  </span>
                </small>
              </a>
              <a href="" className="dropdown-item d-flex align-items-center">
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
    {/* // END Header */}
    {/* Header Layout Content */}
    <div
      className="mdk-header-layout__content page-content "
      style={{ paddingTop: 64 }}
    >
      <div
        className="page__subnav navbar navbar-expand-sm navbar-shadow navbar-light bg-white p-sm-0 d-none d-sm-flex"
        id="secondary-navbar"
      >
        <div className="container page__container">
          {/* Navbar toggler */}
          <button
            className="navbar-toggler ml-n16pt"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-submenu2"
          >
            <span className="material-icons">people_outline</span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-submenu2">
            <div className="navbar-collapse__content pb-16pt pb-sm-0">
              <ul className="nav navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">assessment</i>
                    Dashboards
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="fixed-index.html">
                      Analytics Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-analytics.html">
                      Analytics 2 Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-projects.html">
                      Projects Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-tasks-board.html">
                      Tasks Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-staff.html">
                      Staff Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-ecommerce.html">
                      Shop Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-erp-dashboard.html">
                      ERP Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-crm-dashboard.html">
                      CRM Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-hr-dashboard.html">
                      HR Dashboard
                    </a>
                    <a className="dropdown-item" href="fixed-cms-dashboard.html">
                      CMS Dashboard
                    </a>
                    <a
                      className="dropdown-item disabled"
                      href="fixed-ui-card-metrics.html"
                    >
                      Card Metrics
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown" style={{ position: "initial" }}>
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">business_center</i>
                    Apps
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-caret-center"
                    style={{ width: 800, left: "1.5rem" }}
                  >
                    <div className="row no-gutters">
                      <div className="col border-right">
                        <div className="dropdown-header">Productivity</div>
                        <a className="dropdown-item" href="fixed-projects.html">
                          Projects
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-tasks-board.html"
                        >
                          Tasks Board
                        </a>
                        <a className="dropdown-item" href="fixed-tasks-list.html">
                          Tasks List
                        </a>
                        {/* <a class="dropdown-item disabled" href="fixed-kanban.html">Kanban</a>
      <a class="dropdown-item disabled" href="fixed-task-details.html">Task Details</a>
      <a class="dropdown-item disabled" href="fixed-team-members.html">Team Members</a> */}
                        {/* <div class="dropdown-header">Marketplace</div>
      <a class="dropdown-item disabled" href="fixed-digital-product.html">Digital 
      Product</a> */}
                        <div className="dropdown-header">eCommerce</div>
                        <a className="dropdown-item" href="fixed-ecommerce.html">
                          Shop Dashboard
                        </a>
                        {/* <a class="dropdown-item disabled" href="fixed-edit-product.html">Edit Product</a> */}
                      </div>
                      <div className="col border-right">
                        <div className="dropdown-header">Enterprise</div>
                        <a
                          className="dropdown-item"
                          href="fixed-erp-dashboard.html"
                        >
                          ERP Dashboard
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-crm-dashboard.html"
                        >
                          CRM Dashboard
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-hr-dashboard.html"
                        >
                          HR Dashboard
                        </a>
                        <a className="dropdown-item" href="fixed-employees.html">
                          Employees
                        </a>
                        <a className="dropdown-item" href="fixed-staff.html">
                          Staff
                        </a>
                        <a className="dropdown-item" href="fixed-leaves.html">
                          Leaves
                        </a>
                        {/* <a class="dropdown-item disabled" href="fixed-departments.html">Departments</a>
      <a class="dropdown-item disabled" href="fixed-documents.html">Documents</a>
      <a class="dropdown-item disabled" href="fixed-attendance.html">Attendance</a>
      <a class="dropdown-item disabled" href="fixed-recruitment.html">Recruitment</a>
      <a class="dropdown-item disabled" href="fixed-payroll.html">Payroll</a>
      <a class="dropdown-item disabled" href="fixed-training.html">Training</a>
      <a class="dropdown-item disabled" href="fixed-employee-profile.html">Employee Profile</a>
      <a class="dropdown-item disabled" href="fixed-accounting.html">Accounting</a>
      <a class="dropdown-item disabled" href="fixed-inventory.html">Inventory</a> */}
                      </div>
                      <div className="col border-right">
                        <div className="dropdown-header">Messaging</div>
                        <a className="dropdown-item" href="fixed-messages.html">
                          Messages
                        </a>
                        <a className="dropdown-item" href="fixed-email.html">
                          Email
                        </a>
                        <div className="dropdown-header">Community</div>
                        <a className="dropdown-item" href="fixed-faq.html">
                          FAQ
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-discussions.html"
                        >
                          Discussions
                        </a>
                        <a className="dropdown-item" href="fixed-discussion.html">
                          Discussion Details
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-discussions-ask.html"
                        >
                          Ask Question
                        </a>
                      </div>
                      <div className="col">
                        <div className="dropdown-header">CMS</div>
                        <a
                          className="dropdown-item"
                          href="fixed-cms-dashboard.html"
                        >
                          CMS Dashboard
                        </a>
                        <a className="dropdown-item" href="fixed-posts.html">
                          Posts
                        </a>
                        {/* <div class="dropdown-header">Education</div>
      <a class="dropdown-item disabled" href="fixed-index.html">Student Dashboard</a>
      <a class="dropdown-item disabled" href="fixed-index.html">Teacher Dashboard</a>
      <a class="dropdown-item disabled" href="fixed-index.html">Course</a>
      <a class="dropdown-item disabled" href="fixed-index.html">Lesson</a>
      <a class="dropdown-item disabled" href="fixed-index.html">Add Course</a> */}
                      </div>
                    </div>
                  </div>
                </li>
                {/* <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
        <div class="dropdown-menu">
          
        </div>
      </li> */}
                <li
                  className="nav-item dropdown active"
                  style={{ position: "initial" }}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">account_box</i>
                    Account
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-caret-center"
                    style={{ width: 600, left: "1.5rem" }}
                  >
                    <div className="row no-gutters">
                      <div className="col border-right">
                        <div className="dropdown-header">Guest</div>
                        <a
                          className="dropdown-item active"
                          href="fixed-login.html"
                        >
                          Login
                        </a>
                        <a className="dropdown-item" href="fixed-pricing.html">
                          Pricing
                        </a>
                        <a className="dropdown-item" href="fixed-signup.html">
                          Sign Up
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-signup-payment.html"
                        >
                          Payment
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-reset-password.html"
                        >
                          Reset Password
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-change-password.html"
                        >
                          Change Password
                        </a>
                      </div>
                      <div className="col border-right">
                        <div className="dropdown-header">Edit Account</div>
                        <a
                          className="dropdown-item"
                          href="fixed-edit-account.html"
                        >
                          Edit Account
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-edit-account-profile.html"
                        >
                          Profile &amp; Privacy
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-edit-account-notifications.html"
                        >
                          Email Notifications
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-edit-account-password.html"
                        >
                          Account Password
                        </a>
                      </div>
                      <div className="col">
                        <div className="dropdown-header">Billing</div>
                        <a className="dropdown-item" href="fixed-billing.html">
                          Subscription
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-billing-upgrade.html"
                        >
                          Upgrade Account
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-billing-payment.html"
                        >
                          Payment Information
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-billing-history.html"
                        >
                          Payment History
                        </a>
                        <a
                          className="dropdown-item"
                          href="fixed-billing-invoice.html"
                        >
                          Invoice
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">tune</i>
                    Components
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="fixed-ui-buttons.html">
                      Buttons
                    </a>
                    <a className="dropdown-item" href="fixed-ui-avatars.html">
                      Avatars
                    </a>
                    <a className="dropdown-item" href="fixed-ui-forms.html">
                      Forms
                    </a>
                    <a className="dropdown-item" href="fixed-ui-loaders.html">
                      Loaders
                    </a>
                    <a className="dropdown-item" href="fixed-ui-tables.html">
                      Tables
                    </a>
                    <a className="dropdown-item" href="fixed-ui-cards.html">
                      Cards
                    </a>
                    <a className="dropdown-item" href="fixed-ui-icons.html">
                      Icons
                    </a>
                    <a className="dropdown-item" href="fixed-ui-tabs.html">
                      Tabs
                    </a>
                    <a className="dropdown-item" href="fixed-ui-alerts.html">
                      Alerts
                    </a>
                    <a className="dropdown-item" href="fixed-ui-badges.html">
                      Badges
                    </a>
                    <a className="dropdown-item" href="fixed-ui-progress.html">
                      Progress
                    </a>
                    <a className="dropdown-item" href="fixed-ui-pagination.html">
                      Pagination
                    </a>
                    {/* <a class="dropdown-item disabled" href="fixed-ui-typography.html">Typography</a>
          <a class="dropdown-item disabled" href="fixed-ui-colors.html">Colors</a>
          <a class="dropdown-item disabled" href="fixed-ui-breadcrumb.html">Breadcrumb</a>
          <a class="dropdown-item disabled" href="fixed-ui-accordions.html">Accordions</a>
          <a class="dropdown-item disabled" href="fixed-ui-modals.html">Modals</a>
          <a class="dropdown-item disabled" href="fixed-ui-chips.html">Chips</a> */}
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">folder</i>
                    Plugins
                  </a>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-charts.html"
                    >
                      Charts
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-flatpickr.html"
                    >
                      Flatpickr
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-daterangepicker.html"
                    >
                      Date Range Picker
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-dragula.html"
                    >
                      Dragula
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-dropzone.html"
                    >
                      Dropzone
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-range-sliders.html"
                    >
                      Range Sliders
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-quill.html"
                    >
                      Quill
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-select2.html"
                    >
                      Select2
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-nestable.html"
                    >
                      Nestable
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-fancytree.html"
                    >
                      Fancy Tree
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-maps-vector.html"
                    >
                      Vector Maps
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-sweet-alert.html"
                    >
                      Sweet Alert
                    </a>
                    <a
                      className="dropdown-item"
                      href="fixed-ui-plugin-toastr.html"
                    >
                      Toastr
                    </a>
                    <a className="dropdown-item disabled" href="">
                      Disabled
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a
                    href="fixed-profile.html"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">view_compact</i>
                    Layouts
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="compact-login.html">
                      Compact
                    </a>
                    <a className="dropdown-item" href="mini-login.html">
                      Mini
                    </a>
                    <a className="dropdown-item" href="login.html">
                      App
                    </a>
                    <a className="dropdown-item" href="boxed-login.html">
                      Boxed
                    </a>
                    <a className="dropdown-item" href="sticky-login.html">
                      Sticky
                    </a>
                    <a className="dropdown-item active" href="fixed-login.html">
                      Fixed
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


{children}

<div className="js-fix-footer footer border-top-2">
      <div className="container page__container page-section d-flex flex-column">
        <p className="text-70 brand mb-24pt">
          <img
            className="brand-icon"
            src="assets/images/logo/black-70@2x.png"
            width={30}
            alt="Huma"
          />{" "}
          Huma
        </p>
        <p className="measure-lead-max text-muted mb-0 small">
          Huma is a beautifully crafted user interface for modern Business Admin
          Web Applications, with examples for many pages needed for Customer
          Relationship Management, Enterprise Resource Planning, Human Resources,
          Content Management System, Project Management, Tasks, eCommerce,
          Messaging and Account Management.
        </p>
      </div>
      <div className="pb-16pt pb-lg-24pt">
        <div className="container page__container">
          <div className="bg-dark rounded page-section py-lg-32pt px-16pt px-lg-24pt">
            <div className="row">
              <div className="col-md-2 col-sm-4 mb-24pt mb-md-0">
                <p className="text-white-70 mb-8pt">
                  <strong>Follow us</strong>
                </p>
                <nav className="nav nav-links nav--flush">
                  <a href="#" className="nav-link mr-8pt">
                    <img
                      src="assets/images/icon/footer/facebook-square@2x.png"
                      width={24}
                      height={24}
                      alt="Facebook"
                    />
                  </a>
                  <a href="#" className="nav-link mr-8pt">
                    <img
                      src="assets/images/icon/footer/twitter-square@2x.png"
                      width={24}
                      height={24}
                      alt="Twitter"
                    />
                  </a>
                  <a href="#" className="nav-link mr-8pt">
                    <img
                      src="assets/images/icon/footer/vimeo-square@2x.png"
                      width={24}
                      height={24}
                      alt="Vimeo"
                    />
                  </a>
                  {/* <a href="#" class="nav-link"><img src="assets/images/icon/footer/youtube-square@2x.png" width="24" height="24" alt="YouTube"></a> */}
                </nav>
              </div>
              <div className="col-md-6 col-sm-4 mb-24pt mb-md-0 d-flex align-items-center">
                <a href="" className="btn btn-outline-white">
                  English{" "}
                  <span className="icon--right material-icons">
                    arrow_drop_down
                  </span>
                </a>
              </div>
              <div className="col-md-4 text-md-right">
                <p className="mb-8pt d-flex align-items-md-center justify-content-md-end">
                  <a href="" className="text-white-70 text-underline mr-16pt">
                    Terms
                  </a>
                  <a href="" className="text-white-70 text-underline">
                    Privacy policy
                  </a>
                </p>
                <p className="text-white-50 small mb-0">
                  Copyright 2019 © All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>






</>

  );
}
