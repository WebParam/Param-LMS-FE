import { NextPage } from "next";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeadNav: NextPage<{ setIsOpen: any; isOpen: boolean }> = ({
  setIsOpen,
  isOpen,
}) => {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const router = useRouter();

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
            className="navbar navbar-expand nav-bar-bg navbar-dark"
            id="default-navbar"
            data-primary
          >
            {/* <!-- Navbar Brand --> */}
            <a className="navbar-brand mr-16pt">
              <span className=" d-lg-block">thooto</span>
            </a>

            <div className="flex"></div>

            <div className="nav navbar-nav flex-nowrap d-flex ml-0">
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

                  <Link
                    className="dropdown-item"
                    href="/protected/admin/account/basic-info?account-title=Basic Information"
                  >
                    Edit Account
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => logout()}
                    href=""
                  >
                    Logout
                  </Link>
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

export default HeadNav;
