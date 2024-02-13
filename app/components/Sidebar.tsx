import { Link } from "@mui/material";
import { usePathname } from "next/navigation";
function Sidebar() {
  const pathname = usePathname();

  console.log("Pathname", pathname);
  return (
    <div style={{
      position:"relative",
      zIndex: "1",
      display:"inline-block",
      
    }}>
      <div className="tab-pane  fade active show " id="sm_instructor">
        <div className="sidebar-heading">Instructor</div>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item  ${
              pathname == "/protected/admin/dashboard" && "active"
            } cursor-pointer`}
          >
            <a
              className="sidebar-menu-button"
              href="/protected/admin/dashboard"
              style={{ cursor: "pointer" }}
            >
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                school
              </span>
              <span className="sidebar-menu-text">Home</span>
            </a>
          </li>

          <li
            className={`sidebar-menu-item  ${
              pathname == "/protected/admin/manage-courses" && "active"
            } cursor-pointer`}
          >
            <a
              className="sidebar-menu-button"
              href="/protected/admin/manage-courses"
              style={{ cursor: "pointer" }}
            >
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                import_contacts
              </span>
              <span className="sidebar-menu-text">Manage Courses</span>
            </a>
          </li>

          <li
            className={`sidebar-menu-item  ${
              pathname == "" && "active"
            } cursor-pointer`}
          >
            <a className="sidebar-menu-button " style={{ cursor: "pointer" }}>
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                receipt
              </span>
              <span className="sidebar-menu-text">Statement</span>
            </a>
          </li>
          <li
            className={`sidebar-menu-item  ${
              pathname == "/protected/admin/create-course" && "active"
            } cursor-pointer`}
          >
            <a
              className="sidebar-menu-button"
              href="/protected/admin/create-course"
              style={{ cursor: "pointer" }}
            >
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                post_add
              </span>
              <span className="sidebar-menu-text">Create Course</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
