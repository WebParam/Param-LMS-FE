import { NextPage } from "next";
import Cookies from "universal-cookie";
import { IoPersonSharp } from "react-icons/io5";

const HeadNav: NextPage<{ setIsOpen: any; isOpen: boolean }> = ({
  setIsOpen,
  isOpen,
}) => {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  return (
    <>
      <div
        className="navbar navbar-expand navbar-shadow px-0  pl-lg-16pt navbar-light bg-body"
        id="default-navbar"
        data-primary
      >
        {/*     <!-- Navbar toggler --> */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="navbar-togger d-block d-lg-none rounded-0"
        >
          <span className="material-icons">menu</span>
        </button>

{/*     <!-- Navbar Brand --> */}
    <a href="index.html"
       className="navbar-brand mr-16pt d-lg-none">
        <img className="navbar-brand-icon mr-0 mr-lg-8pt"
             src="/assets/images/logo/accent-teal-100@2x.png"
             width="32"
             alt="Khumla"/>
        <span className="d-none d-lg-block">Khumla</span>
    </a>

    <div className="flex"></div>
    
    <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
        <div className="nav-item dropdown d-none d-sm-flex">
            <a href="#"
               className="nav-link d-flex align-items-center dropdown-toggle"
                          data-toggle="dropdown">
                          <span className="user-icon material-icons sidebar-menu-icon sidebar-menu-icon--left rounded-circle mr-8pt">account_circle</span>
                <span className="flex d-flex flex-column mr-8pt">
                    <span className="navbar-text-100">{loggedInUser?.firstName} {loggedInUser?.lastName}</span>
                    <small className="navbar-text-50">{loggedInUser?.role}</small>
                </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header"><strong>Account</strong></div>
                <a className="dropdown-item"
                   href="#edit-account.html">Edit Account</a>
                <a className="dropdown-item"
                   href="/">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadNav;
