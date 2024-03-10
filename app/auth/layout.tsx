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