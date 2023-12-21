"use client"
import Image from "next/image";
import Cookies from 'universal-cookie';
import { ReduxProvider } from "../provider";

const cookies =
new Cookies();

const isLoggedIn = cookies.get('param-lms-user');

console.log(isLoggedIn)


const metadata = {
  title: "Login",
  description: "Supercharge your learning",
};

export default function RootLayout({
  children
}: {
  children?: React.ReactNode;
}) {
  return (
<>
<ReduxProvider>

<div
    className="mdk-header-layout js-mdk-header-layout"
    data-domfactory-upgraded="mdk-header-layout"
  >


    {/* Header Layout Content */}
    <div
      className="mdk-header-layout__content page-content "
      style={false ? { paddingTop: 64 } : {}}
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
                   
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons icon--left">assessment</i>
                    Login 
                  </a>

                </li>
                <li className="nav-item dropdown" style={{ position: "initial" }}>
                  <a
                  
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                  <i className="material-icons icon--left">business_center</i>                    About
                  </a>

                </li>
             
              </ul>
              <ul className="nav navbar-nav ml-auto">
               
              </ul>
            </div>
          </div>
        </div>
      </div>


{children } 

{/*Footer*/}

  </div>
  </div>


</ReduxProvider>



</>

  );
}


{
  // <div className="js-fix-footer footer border-top-2">
  //     <div className="container page__container page-section d-flex flex-column">
  //       <p className="text-70 brand mb-24pt">
  //         <img
  //           className="brand-icon"
  //           src="assets/images/logo/black-70@2x.png"
  //           width={30}
  //           alt="Huma"
  //         />{" "}
  //         Huma
  //       </p>
  //       <p className="measure-lead-max text-muted mb-0 small">
  //         Huma is a beautifully crafted user interface for modern Business Admin
  //         Web Applications, with examples for many pages needed for Customer
  //         Relationship Management, Enterprise Resource Planning, Human Resources,
  //         Content Management System, Project Management, Tasks, eCommerce,
  //         Messaging and Account Management.
  //       </p>
  //     </div>
  //     <div className="pb-16pt pb-lg-24pt">
  //       <div className="container page__container">
  //         <div className="bg-dark rounded page-section py-lg-32pt px-16pt px-lg-24pt">
  //           <div className="row">
  //             <div className="col-md-2 col-sm-4 mb-24pt mb-md-0">
  //               <p className="text-white-70 mb-8pt">
  //                 <strong>Follow us</strong>
  //               </p>
  //               <nav className="nav nav-links nav--flush">
  //                 <a href="#" className="nav-link mr-8pt">
  //                   <img
  //                     src="assets/images/icon/footer/facebook-square@2x.png"
  //                     width={24}
  //                     height={24}
  //                     alt="Facebook"
  //                   />
  //                 </a>
  //                 <a href="#" className="nav-link mr-8pt">
  //                   <img
  //                     src="assets/images/icon/footer/twitter-square@2x.png"
  //                     width={24}
  //                     height={24}
  //                     alt="Twitter"
  //                   />
  //                 </a>
  //                 <a href="#" className="nav-link mr-8pt">
  //                   <img
  //                     src="assets/images/icon/footer/vimeo-square@2x.png"
  //                     width={24}
  //                     height={24}
  //                     alt="Vimeo"
  //                   />
  //                 </a>
  //                 {/* <a href="#" class="nav-link"><img src="assets/images/icon/footer/youtube-square@2x.png" width="24" height="24" alt="YouTube"></a> */}
  //               </nav>
  //             </div>
  //             <div className="col-md-6 col-sm-4 mb-24pt mb-md-0 d-flex align-items-center">
  //               <a href="" className="btn btn-outline-white">
  //                 English{" "}
  //                 <span className="icon--right material-icons">
  //                   arrow_drop_down
  //                 </span>
  //               </a>
  //             </div>
  //             <div className="col-md-4 text-md-right">
  //               <p className="mb-8pt d-flex align-items-md-center justify-content-md-end">
  //                 <a href="" className="text-white-70 text-underline mr-16pt">
  //                   Terms
  //                 </a>
  //                 <a href="" className="text-white-70 text-underline">
  //                   Privacy policy
  //                 </a>
  //               </p>
  //               <p className="text-white-50 small mb-0">
  //                 Copyright 2019 © All rights reserved.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
}



  // <div
  //   id="header"
  //   className="mdk-header js-mdk-header mb-0"
  //   data-fixed=""
  //   data-retarget-mouse-scroll=""
  //   data-domfactory-upgraded="mdk-header"
  //   style={{ paddingTop: 64 }}
  // >
  //   <div className="mdk-header__bg">
  //     <div className="mdk-header__bg-front" />
  //     <div className="mdk-header__bg-rear" />
  //   </div>
  //   <div className="mdk-header__content">
  //     <div
  //       className="navbar navbar-expand px-0 navbar-dark bg-dark mdk-header--fixed"
  //       id="default-navbar"
  //       data-primary="data-primary"
  //     >
  //       {/* Navbar toggler */}
  //       <button
  //         className="navbar-toggler d-block rounded-0"
  //         type="button"
  //         data-toggle="sidebar"
  //       >
  //         <span className="material-icons">menu</span>
  //       </button>
  //       {/* Navbar Brand */}
  //       <a href="index.html" className="navbar-brand mr-16pt">
  //         <img
  //           className="navbar-brand-icon mr-0 mr-lg-8pt"
  //           src="assets/images/logo/accent-teal-100@2x.png"
  //           width={32}
  //           alt="Huma"
  //         />
  //         <span className="d-none d-lg-block">Huma</span>
  //       </a>
  //       {/* <button class="btn navbar-btn mr-16pt" data-toggle="modal" data-target="#apps">Apps <i class="material-icons">arrow_drop_down</i></button> */}
  //       <form
  //         className="search-form navbar-search d-none d-md-flex mr-16pt"
  //         action="fixed-index.html"
  //       >
  //         <button className="btn" type="submit">
  //           <i className="material-icons">search</i>
  //         </button>
  //         <input
  //           type="text"
  //           className="form-control"
  //           placeholder="Search ..."
  //         />
  //       </form>
  //       <div className="flex" />
  //       <div
  //         className="nav navbar-nav flex-nowrap d-none d-lg-flex mr-16pt"
  //         style={{ whiteSpace: "nowrap" }}
  //       >
  //         <div className="nav-item dropdown d-none d-sm-flex">
  //           <a
  //             href="#"
  //             className="nav-link dropdown-toggle"
  //             data-toggle="dropdown"
  //           >
  //             EN
  //           </a>
  //           <div className="dropdown-menu dropdown-menu-right">
  //             <div className="dropdown-header">
  //               <strong>Select language</strong>
  //             </div>
  //             <a className="dropdown-item active" href="">
  //               English
  //             </a>
  //             <a className="dropdown-item" href="">
  //               French
  //             </a>
  //             <a className="dropdown-item" href="">
  //               Romanian
  //             </a>
  //             <a className="dropdown-item" href="">
  //               Spanish
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="nav navbar-nav flex-nowrap d-flex ml-0 mr-16pt">
  //         <div className="nav-item dropdown d-none d-sm-flex">
  //           <a
  //             href="#"
  //             className="nav-link d-flex align-items-center dropdown-toggle"
  //             data-toggle="dropdown"
  //           >
  //             <img
  //               width={32}
  //               height={32}
  //               className="rounded-circle mr-8pt"
  //               src="assets/images/people/50/guy-3.jpg"
  //               alt="account"
  //             />
  //             <span className="flex d-flex flex-column mr-8pt">
  //               <span className="navbar-text-100">Laza Bogdan</span>
  //               <small className="navbar-text-50">Administrator</small>
  //             </span>
  //           </a>
  //           <div className="dropdown-menu dropdown-menu-right">
  //             <div className="dropdown-header">
  //               <strong>Account</strong>
  //             </div>
  //             <a className="dropdown-item" href="fixed-edit-account.html">
  //               Edit Account
  //             </a>
  //             <a className="dropdown-item" href="fixed-billing.html">
  //               Billing
  //             </a>
  //             <a className="dropdown-item" href="fixed-billing-history.html">
  //               Payments
  //             </a>
  //             <a className="dropdown-item" href="fixed-login.html">
  //               Logout
  //             </a>
  //           </div>
  //         </div>
  //         {/* Notifications dropdown */}
  //         <div className="nav-item ml-16pt dropdown dropdown-notifications">
  //           <button
  //             className="nav-link btn-flush dropdown-toggle"
  //             type="button"
  //             data-toggle="dropdown"
  //             data-dropdown-disable-document-scroll=""
  //             data-caret="false"
  //           >
  //             <i className="material-icons">notifications</i>
  //             <span className="badge badge-notifications badge-accent">2</span>
  //           </button>
  //           <div className="dropdown-menu dropdown-menu-right">
  //             <div data-perfect-scrollbar="" className="position-relative ps">
  //               <div className="dropdown-header">
  //                 <strong>System notifications</strong>
  //               </div>
  //               <div className="list-group list-group-flush mb-0">
  //                 <a
  //                   href="javascript:void(0);"
  //                   className="list-group-item list-group-item-action unread"
  //                 >
  //                   <span className="d-flex align-items-center mb-1">
  //                     <small className="text-black-50">3 minutes ago</small>
  //                     <span className="ml-auto unread-indicator bg-accent" />
  //                   </span>
  //                   <span className="d-flex">
  //                     <span className="avatar avatar-xs mr-2">
  //                       <span className="avatar-title rounded-circle bg-light">
  //                         <i className="material-icons font-size-16pt text-accent">
  //                           account_circle
  //                         </i>
  //                       </span>
  //                     </span>
  //                     <span className="flex d-flex flex-column">
  //                       <span className="text-black-70">
  //                         Your profile information has not been synced
  //                         correctly.
  //                       </span>
  //                     </span>
  //                   </span>
  //                 </a>
  //                 <a
  //                   href="javascript:void(0);"
  //                   className="list-group-item list-group-item-action"
  //                 >
  //                   <span className="d-flex align-items-center mb-1">
  //                     <small className="text-black-50">5 hours ago</small>
  //                   </span>
  //                   <span className="d-flex">
  //                     <span className="avatar avatar-xs mr-2">
  //                       <span className="avatar-title rounded-circle bg-light">
  //                         <i className="material-icons font-size-16pt text-primary">
  //                           group_add
  //                         </i>
  //                       </span>
  //                     </span>
  //                     <span className="flex d-flex flex-column">
  //                       <strong className="text-black-100">Adrian. D</strong>
  //                       <span className="text-black-70">
  //                         Wants to join your private group.
  //                       </span>
  //                     </span>
  //                   </span>
  //                 </a>
  //                 <a
  //                   href="javascript:void(0);"
  //                   className="list-group-item list-group-item-action"
  //                 >
  //                   <span className="d-flex align-items-center mb-1">
  //                     <small className="text-black-50">1 day ago</small>
  //                   </span>
  //                   <span className="d-flex">
  //                     <span className="avatar avatar-xs mr-2">
  //                       <span className="avatar-title rounded-circle bg-light">
  //                         <i className="material-icons font-size-16pt text-warning">
  //                           storage
  //                         </i>
  //                       </span>
  //                     </span>
  //                     <span className="flex d-flex flex-column">
  //                       <span className="text-black-70">
  //                         Your deploy was successful.
  //                       </span>
  //                     </span>
  //                   </span>
  //                 </a>
  //               </div>
  //               <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
  //                 <div
  //                   className="ps__thumb-x"
  //                   tabIndex={0}
  //                   style={{ left: 0, width: 0 }}
  //                 />
  //               </div>
  //               <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
  //                 <div
  //                   className="ps__thumb-y"
  //                   tabIndex={0}
  //                   style={{ top: 0, height: 0 }}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* // END Notifications dropdown */}
  //         {/* Notifications dropdown */}
  //         <div className="nav-item ml-16pt dropdown dropdown-notifications">
  //           <button
  //             className="nav-link btn-flush dropdown-toggle"
  //             type="button"
  //             data-toggle="dropdown"
  //             data-dropdown-disable-document-scroll=""
  //             data-caret="false"
  //           >
  //             <i className="material-icons icon-24pt">mail_outline</i>
  //           </button>
  //           <div className="dropdown-menu dropdown-menu-right">
  //             <div data-perfect-scrollbar="" className="position-relative ps">
  //               <div className="dropdown-header">
  //                 <strong>Messages</strong>
  //               </div>
  //               <div className="list-group list-group-flush mb-0">
  //                 <a
  //                   href="javascript:void(0);"
  //                   className="list-group-item list-group-item-action unread"
  //                 >
  //                   <span className="d-flex align-items-center mb-1">
  //                     <small className="text-black-50">5 minutes ago</small>
  //                     <span className="ml-auto unread-indicator bg-accent" />
  //                   </span>
  //                   <span className="d-flex">
  //                     <span className="avatar avatar-xs mr-2">
  //                       <img
  //                         src="assets/images/people/110/woman-5.jpg"
  //                         alt="people"
  //                         className="avatar-img rounded-circle"
  //                       />
  //                     </span>
  //                     <span className="flex d-flex flex-column">
  //                       <strong className="text-black-100">Michelle</strong>
  //                       <span className="text-black-70">
  //                         Clients loved the new design.
  //                       </span>
  //                     </span>
  //                   </span>
  //                 </a>
  //                 <a
  //                   href="javascript:void(0);"
  //                   className="list-group-item list-group-item-action"
  //                 >
  //                   <span className="d-flex align-items-center mb-1">
  //                     <small className="text-black-50">5 minutes ago</small>
  //                   </span>
  //                   <span className="d-flex">
  //                     <span className="avatar avatar-xs mr-2">
  //                       <img
  //                         src="assets/images/people/110/woman-5.jpg"
  //                         alt="people"
  //                         className="avatar-img rounded-circle"
  //                       />
  //                     </span>
  //                     <span className="flex d-flex flex-column">
  //                       <strong className="text-black-100">Michelle</strong>
  //                       <span className="text-black-70">🔥 Superb job..</span>
  //                     </span>
  //                   </span>
  //                 </a>
  //               </div>
  //               <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
  //                 <div
  //                   className="ps__thumb-x"
  //                   tabIndex={0}
  //                   style={{ left: 0, width: 0 }}
  //                 />
  //               </div>
  //               <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
  //                 <div
  //                   className="ps__thumb-y"
  //                   tabIndex={0}
  //                   style={{ top: 0, height: 0 }}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* // END Notifications dropdown */}
  //       </div>
  //       <div className="dropdown border-left-2 navbar-border">
  //         <button
  //           className="navbar-toggler navbar-toggler-custom d-block"
  //           type="button"
  //           data-toggle="dropdown"
  //           data-caret="false"
  //         >
  //           <span className="material-icons">business_center</span>
  //         </button>
  //         <div className="dropdown-menu dropdown-menu-right">
  //           <div className="dropdown-header">
  //             <strong>Select company</strong>
  //           </div>
  //           <a
  //             href=""
  //             className="dropdown-item active d-flex align-items-center"
  //           >
  //             <div className="avatar avatar-sm mr-8pt">
  //               <span className="avatar-title rounded bg-primary">FM</span>
  //             </div>
  //             <small className="ml-4pt flex">
  //               <span className="d-flex flex-column">
  //                 <strong className="text-black-100">
  //                   FrontendMatter Inc.
  //                 </strong>
  //                 <span className="text-black-50">Administrator</span>
  //               </span>
  //             </small>
  //           </a>
  //           <a href="" className="dropdown-item d-flex align-items-center">
  //             <div className="avatar avatar-sm mr-8pt">
  //               <span className="avatar-title rounded bg-accent">HH</span>
  //             </div>
  //             <small className="ml-4pt flex">
  //               <span className="d-flex flex-column">
  //                 <strong className="text-black-100">HumaHuma Inc.</strong>
  //                 <span className="text-black-50">Publisher</span>
  //               </span>
  //             </small>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
