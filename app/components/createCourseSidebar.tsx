import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function CreateCourseSidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div
      id="default-drawer"
      data-align="start"
      data-position="left"
      data-domfactory-upgraded="mdk-drawer"
      data-persistent=""
      data-opened=""
    >
      <div className="mdk-drawer__scrim" style={{}} />
      <div
        className={`mdk-drawer__content js-sidebar-mini ${
          isSidebarExpanded ? 'expanded' : ''
        }`}
        data-responsive-width="992px"
        data-layout="mini-secondary"
      >
        <div
          className={`sidebar sidebar-mini sidebar-dark-pickled-bluewood sidebar-left d-flex flex-column ${
            isSidebarExpanded ? 'expanded' : ''
          }`}
        
        >
          {/* Brand */}
          <a
            href="index.html"
            className="sidebar-brand p-0 navbar-height d-flex justify-content-center"
          >
            <span className="avatar avatar-sm">
              <span className="avatar-title rounded bg-primary">
                <FaBars
                  onMouseEnter={() => setIsSidebarExpanded(true)}
                  onMouseLeave={() => setIsSidebarExpanded(false)}
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
              className="sidebar-menu-item display-flex flex-row d-flex justify-content-center align-items-center"
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
              <span>student</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
