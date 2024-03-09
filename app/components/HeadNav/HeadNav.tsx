import { NextPage } from 'next';

const HeadNav: NextPage<{setIsOpen: any, isOpen: boolean}> = ({setIsOpen, isOpen}) => {

  return (
      <>
          
          <div className="navbar navbar-expand navbar-shadow px-0  pl-lg-16pt navbar-light bg-body"
     id="default-navbar"
     data-primary>

{/*     <!-- Navbar toggler --> */}
              <button onClick={() => { setIsOpen(!isOpen) }} className="navbar-togger d-block d-lg-none rounded-0" >
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
                <img width="32"
                     height="32"
                     className="rounded-circle mr-8pt"
                     src="/assets/images/people/50/guy-3.jpg"
                     alt="account" />
                <span className="flex d-flex flex-column mr-8pt">
                    <span className="navbar-text-100">Laza Bogdan</span>
                    <small className="navbar-text-50">Administrator</small>
                </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header"><strong>Account</strong></div>
                <a className="dropdown-item"
                   href="edit-account.html">Edit Account</a>
                <a className="dropdown-item"
                   href="login.html">Logout</a>
            </div>
        </div>
    </div>

</div>

    </>
  )
}

export default HeadNav