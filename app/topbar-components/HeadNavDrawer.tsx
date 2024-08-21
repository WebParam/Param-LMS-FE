import { NextPage } from "next";
import Cookies from "universal-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const HeadNavDrawer: NextPage<{ setIsOpen: any; isOpen: boolean }> = ({
  setIsOpen,
  isOpen,
}) => {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const pathName = usePathname();
  const isAccount = pathName == "/protected/admin/account"

  const logout = () => {
    cookies.remove("param-lms-user", {
      path: "/",
    });

    if (loggedInUser?.role == "Admin") router.replace("/");
    else router.replace("/");
  };

  return (
    <>
      {/* <!-- Header --> */}
      <div id="header" className="mdk-header js-mdk-header mb-0" data-fixed>
        <div className="mdk-header__content">
          <div
            className="navbar navbar-expand px-0 nav-bar-bg navbar-dark"
            id="default-navbar"
            data-primary
          >
            {/* <!-- Navbar toggler --> */}
            <button
              className="navbar-toggler d-block rounded-0"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              type="button"
              data-toggle="sidebar"
            >
              <span className="material-icons">menu</span>
            </button>

            {/* <!-- Navbar Brand --> */}
            <a className="navbar-brand mr-16pt">
              <span
                className=" d-lg-block"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "450px",
                }}
              >
                thooto 
                  {courseTitle && ` - ${courseTitle}`}
                
              </span>
            </a>

            <div className="flex"></div>

            <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
              <div className="nav-item dropdown d-none d-sm-flex">
                <a
                  href="#"
                  className="nav-link d-flex align-items-center dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span className="user-icon material-icons sidebar-menu-icon sidebar-menu-icon--left rounded-circle mr-8pt">
                    account_circle
                  </span>
                  <span className="flex d-flex flex-column mr-8pt">
                    <span className="navbar-text-100">
                      {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </span>
                    <small className="navbar-text-50">
                      {loggedInUser?.role}
                    </small>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-header">
                    <strong>Account</strong>
                  </div>
                  <a className="dropdown-item cursor-pointer">
                    <Link href="/protected/admin/account/basic-info?account-title=Basic Information">
                    Edit Account
                    </Link>
                  </a>
                  <a className="dropdown-item cursor-pointer" onClick={() => logout()}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- // END Header --> */}
    </>
  );
};

export default HeadNavDrawer;
