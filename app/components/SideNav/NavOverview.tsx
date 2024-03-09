import Link from 'next/link'
const NavOverview = () => {
  return (
      <>
          <div className="sidebar-heading">Overview</div>
                        <ul className="sidebar-menu">
                            <li className="sidebar-menu-item active">
                                <a className="sidebar-menu-button" href="#">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">insert_chart_outlined</span>
                                    <span className="sidebar-menu-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button" href="#">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">people_outline</span>
                                    <span className="sidebar-menu-text">Students</span>
                                </a>
                            </li>
                            <li className="sidebar-menu-item">
                                <Link className="sidebar-menu-button" href="/protected/admin/courses">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">menu_book</span>
                                    <span className="sidebar-menu-text">Courses</span>
                                </Link>
                            </li>
                            <li className="sidebar-menu-item">
                                <a className="sidebar-menu-button" data-toggle="collapse" href="#dashboards_menu">
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">assignment</span>
                                    Assessments
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent" id="dashboards_menu">
                                    <li className="sidebar-menu-item active">
                                        <a className="sidebar-menu-button" href="#">
                                            <span className="sidebar-menu-text">Grade Assessment</span>
                                        </a>
                                    </li>                                                                      
                                </ul>
                            </li>
                        </ul>
    </>
  )
}

export default NavOverview