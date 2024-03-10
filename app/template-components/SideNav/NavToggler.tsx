"use client"
import Cookies from "universal-cookie"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";

const NavToggler = () => {
    const [isStudentPathName, setIsStudentPathName] = useState<boolean>(false)
    const pathname = usePathname()
  
    useEffect(() => {
      if (pathname.includes("/protected/student")) {
        setIsStudentPathName(true);
      } else {
        setIsStudentPathName(false);
      }
    }, [pathname]);
     
const cookies = new Cookies();
const loggedInUser = cookies.get("param-lms-user");
console.log("User",loggedInUser)

  return (
      <>
          <a href="#compact-index.html" className="navbar-toggler navbar-toggler-right navbar-toggler-custom d-flex align-items-center justify-content-center position-absolute right-0 top-0" data-toggle="tooltip" data-title="Switch to Compact Vertical Layout" data-placement="right" data-boundary="window" data-original-title="" title="">
                            <span className="material-icons">sync_alt</span>
                        </a>

                        <a href="index.html" className="sidebar-brand ">
                            <img className="sidebar-brand-icon" src="/assets/images/logo/dodger-blue-100@2x.png" alt="Huma"/>
                            <span>Khumla</span>
                        </a>

                        <div className="sidebar-account mx-16pt mb-16pt dropdown">
                            <a href="#" className="nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown" data-caret="false">

                            <IoPerson
               style={{width:"32px",height:"32px"}}
               className="rounded-circle mr-8pt"

/>
                                <span className="flex d-flex flex-column mr-8pt">
                                    <span className="text-black-100">{loggedInUser?.firstName} {loggedInUser?.lastName}</span>
                                    <small className="text-black-50">{isStudentPathName ? "Student" : "Administrator"}</small>
                                </span>
                                <i className="material-icons text-black-20 icon-16pt">keyboard_arrow_down</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-full dropdown-menu-caret-center">
                                <div className="dropdown-header"><strong>Account</strong></div>
                                <a className="dropdown-item" href="#edit-account.html">Edit Account</a>
                                <a className="dropdown-item" href="#billing.html">Billing</a>
                                <a className="dropdown-item" href="#billing-history.html">Payments</a>
                                <a className="dropdown-item" href="/">Logout</a>
                                <div className="dropdown-divider"></div>
                                {/* <div className="dropdown-header"><strong>Select company</strong></div>
                                <a href="#" className="dropdown-item active d-flex align-items-center">

                                    <div className="avatar avatar-sm mr-8pt">

                                        <span className="avatar-title rounded bg-primary-dodger-blue">FM</span>

                                    </div>

                                    <small className="ml-4pt flex">
                                        <span className="d-flex flex-column">
                                            <strong className="text-black-100">FrontendMatter Inc.</strong>
                                            <span className="text-black-50">Administrator</span>
                                        </span>
                                    </small>
                                </a>
                                <a href="" className="dropdown-item d-flex align-items-center">

                                    <div className="avatar avatar-sm mr-8pt">

                                        <span className="avatar-title rounded bg-accent-pickled-bluewood">HH</span>

                                    </div>

                                    <small className="ml-4pt flex">
                                        <span className="d-flex flex-column">
                                            <strong className="text-black-100">HumaHuma Inc.</strong>
                                            <span className="text-black-50">Publisher</span>
                                        </span>
                                    </small>
                                </a> */}
                            </div>
                        </div>

                        <form action="index.html" className="search-form flex-shrink-0 search-form--black sidebar-m-b sidebar-p-l mx-16pt pr-0">
                            <input type="text" className="form-control pl-0" placeholder="Search"/>
                            <button className="btn" type="submit"><i className="material-icons">search</i></button>
                        </form>
    </>
  )
}

export default NavToggler