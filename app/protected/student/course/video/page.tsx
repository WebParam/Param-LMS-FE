"use client"
import Image from 'next/image'
import styles from './page.module.css'
import {useCallback, useEffect} from 'react'
import { useState } from 'react';
import { ISection,ICourse, IModule, IVideo} from '@/app/interfaces/courses';
import { IUser } from '@/app/interfaces/user';
import { IResponseObject } from '@/app/lib/restapi/response';
import { Api } from '@/app/lib/restapi/endpoints';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function CourseVideo() {
 const [author,setAuthor]=useState<IUser>();
 const [module,setModule]=useState<IModule>();
 const [video,setVideo]=useState<IVideo>();
 const [play, setPlay] = useState<boolean>(false);
const handlePlayClick = useCallback((event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  setPlay(true);
  event.preventDefault();
}, []);
const handleVideoSelectClick = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>,video:IVideo)=>{
  event.preventDefault;
  setVideo(video);

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const handleBackClick=()=>{
  window.location.href = '/protected/student/course/course-detail'; 
}


 useEffect(()=>{
    var course:ICourse = JSON.parse(localStorage.getItem("course")as any) || null
    var _module:IModule  = JSON.parse(localStorage.getItem("module")as any) || null
    setModule(_module)
   
    getAuthor(course?.creatingUser);
    setVideo(_module.videos[0]);
 },[]);
 
 const calculateDaysDifference = (createdDate:string) => {
  const videoDate = new Date(createdDate);
  const currentDate = new Date();

  const timeDifference = Math.abs(currentDate.getTime() - videoDate.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};
 async function getAuthor(id:string){
  var author:IUser= cookies.get(id);
  if(!author)
  {
    var response:IResponseObject<IUser> = await Api.GET_UserById(id);
    cookies.set(id,response.data);
    setAuthor(response.data);
  }
  else{
  setAuthor(author);
  }
}

  return (
<>
<div>
  <div className="navbar navbar-list navbar-light bg-white border-bottom-2 border-bottom navbar-expand-sm" style={{whiteSpace: 'nowrap'}}>
    <div className="container page__container">
      <nav className="nav navbar-nav">
        <div className="nav-item navbar-list__item">
          <a onClick={handleBackClick} style={{cursor:"pointer"}}  className="nav-link h-auto"><i className="material-icons icon--left">keyboard_backspace</i> Back to Course</a>
        </div>
        <div className="nav-item navbar-list__item">
          <div className="d-flex align-items-center flex-nowrap">
            <div className="mr-16pt">
              <a href=""><span className="material-icons text-primary">play_circle_outline</span></a>
            </div>
            <div className="flex">
              <a href="" className="card-title text-body mb-0">{video?.title}</a>
              <p className="lh-1 d-flex align-items-center mb-0">
                <span className="text-50 small font-weight-bold mr-8pt">{author?.name} {author?.surname}</span>
                {/* <span className="text-50 small">{author?.headLine}</span> */}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div className="bg-primary pb-lg-64pt py-32pt">
    <div className="container page__container">
      <nav className="course-nav">
        <a data-toggle="tooltip" data-placement="bottom" data-title="Getting Started with Angular: Introduction"  data-original-title title=""><span className="material-icons">check_circle</span></a>
        <a data-toggle="tooltip" data-placement="bottom" data-title="Getting Started with Angular: Introduction to TypeScript" href="" data-original-title title=""><span className="material-icons text-primary">account_circle</span></a>
        <a data-toggle="tooltip" data-placement="bottom" data-title="Getting Started with Angular: Comparing Angular to AngularJS" href="" data-original-title title=""><span className="material-icons">play_circle_outline</span></a>
        <a data-toggle="tooltip" data-placement="bottom" data-title="Quiz: Getting Started with Angular" href="student-take-quiz.html" data-original-title title=""><span className="material-icons">hourglass_empty</span></a>
      </nav>
      <div className="js-player bg-primary embed-responsive embed-responsive-16by9 mb-32pt" data-domfactory-upgraded="player">
        <div className="player embed-responsive-item">
          <div className="player__content">
          <div className="player__image" />
                      <a onClick={handlePlayClick} href="" className="player__play bg-primary">
                        <span className="material-icons">play_arrow</span>
                      </a>
                    </div>
          <div className={play?"player__embed":"player__embed d-none"}>
            <iframe className="embed-responsive-item" src={video?.videoLink} allowFullScreen/>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap align-items-end mb-16pt">
        <h1 className="text-white flex m-0">{module?.title}</h1>
        <p className="h1 text-white-50 font-weight-light m-0">{video?.length}</p>
      </div>
      <p className="hero__lead measure-hero-lead text-white-50 mb-24pt">{video?.description}</p>
      <a onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{handlePlayClick(e);
       window.scrollTo({
       top: 0,
       behavior: 'smooth',
  });} }  className="btn btn-white">Resume lesson</a>
    </div>
  </div>
  <div className="navbar navbar-expand-sm navbar-light bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
    <div className="container page__container">
      <ul className="nav navbar-nav flex align-items-sm-center">
        <li className="nav-item navbar-list__item">
          <div className="media align-items-center">
            <p className="media-left mr-16pt">
            <span className="material-icons text-primary">account_circle</span>
            </p>
            <div className="media-body">
              <a className="card-title m-0" href="teacher-profile.html">{author?.name} {author?.surname}</a>
              <p className="text-50 lh-1 mb-0">Instructor</p>
            </div>
          </div>
        </li>
        <li className="nav-item navbar-list__item">
          <i className="material-icons text-muted icon--left">schedule</i>
          2h 46m
        </li>
        <li className="nav-item navbar-list__item">
          <i className="material-icons text-muted icon--left">assessment</i>
          Beginner
        </li>
        <li className="nav-item ml-sm-auto text-sm-center flex-column navbar-list__item">
          <div className="rating rating-24">
            <div className="rating__item"><i className="material-icons">star</i></div>
            <div className="rating__item"><i className="material-icons">star</i></div>
            <div className="rating__item"><i className="material-icons">star</i></div>
            <div className="rating__item"><i className="material-icons">star</i></div>
            <div className="rating__item"><i className="material-icons">star_border</i></div>
          </div>
          <p className="lh-1 mb-0"><small className="text-muted">20 ratings</small></p>
        </li>
      </ul>
    </div>
  </div>
  <div className="page-section">
    <div className="container page__container">
      <div className="d-flex align-items-center mb-heading">
        <h4 className="m-0">Lessons</h4>
        {/* <a href="discussions-ask.html" className="text-underline ml-auto">Ask a Question</a> */}
      </div>
      <div className="border-top">
        <div className="list-group list-group-flush">
         {module?.videos?.map((_video)=>(
           <div className="list-group-item p-3">
           <div className="row align-items-start">
             <div className="col-md-3 mb-8pt mb-md-0">
               <div className="media align-items-center">
                 <div className="media-left mr-12pt">
                   <a href="" className="avatar avatar-sm">
                     {/* <img src="../../LB" alt="avatar" class="avatar-img rounded-circle"> */}
                     <span className="avatar-title rounded-circle">{author?.name[0]}{author?.surname[0]}</span>
                   </a>
                 </div>
                 <div className="d-flex flex-column media-body media-middle">
                   <a href="" className="card-title">{author?.name} {author?.surname}</a>
                   <small className="text-muted">{calculateDaysDifference(_video.createdDate)} days ago</small>
                 </div>
               </div>
             </div>
             <div className="col mb-8pt mb-md-0">
               <p className="mb-8pt"><a style={{cursor:"pointer"}}   onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{handleVideoSelectClick(e,_video) }} className="text-body"><strong>{_video.title}</strong></a></p>
               <a onClick={handleBackClick} style={{cursor:"pointer"}}  className="chip chip-outline-secondary">{module.title}</a>
             </div>
             <div className="col-auto d-flex flex-column align-items-center justify-content-center">
               <a style={{cursor:"pointer"}} onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{handleVideoSelectClick(e,_video) }} className="lh-1 mb-0"><small className="text-70"><span className="material-icons">  {_video.id === video?.id ?'pause': 'play_circle_outline' }</span></small></a>
             </div>
           </div>
         </div>
         ))}
          {/* <div className="list-group-item p-3">
            <div className="row align-items-start">
              <div className="col-md-3 mb-8pt mb-md-0">
                <div className="media align-items-center">
                  <div className="media-left mr-12pt">
                    <a href="#" className="avatar avatar-sm">
                      {/* <img src="../../AC" alt="avatar" class="avatar-img rounded-circle"> 
                      <span className="avatar-title rounded-circle">AC</span>
                    </a>
                  </div>
                  <div className="d-flex flex-column media-body media-middle">
                    <a href="#" className="card-title">Adam Curtis</a>
                    <small className="text-muted">3 days ago</small>
                  </div>
                </div>
              </div>
              <div className="col mb-8pt mb-md-0">
                <p className="mb-0"><a href="discussion.html" className="text-body"><strong>Why am I getting an error when trying to install angular/http@2.4.2</strong></a></p>
              </div>
              <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                <h5 className="m-0">1</h5>
                <p className="lh-1 mb-0"><small className="text-70">answers</small></p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* <a href="discussions.html" className="btn btn-outline-secondary">See all discussions for this lesson</a> */}
    </div>
  </div>
  {/* drawer */}
  <div className="mdk-drawer js-mdk-drawer" id="default-drawer">
    <div className="mdk-drawer__content">
      <div className="sidebar sidebar-dark sidebar-left" data-perfect-scrollbar>
        {/* Navbar toggler */}
        <a href="compact-analytics.html" className="navbar-toggler navbar-toggler-right navbar-toggler-custom d-flex align-items-center justify-content-center position-absolute right-0 top-0" data-toggle="tooltip" data-title="Switch to Compact Vertical Layout" data-placement="right" data-boundary="window">
          <span className="material-icons">sync_alt</span>
        </a>
        <a href="index.html" className="sidebar-brand ">
          <img className="sidebar-brand-icon" src="assets/images/logo/accent-teal-100@2x.png" alt="Khumla" />
          <span>Khumla</span>
        </a>
        <div className="sidebar-account mx-16pt mb-16pt dropdown">
          <a href="#" className="nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown" data-caret="false">
            <img width={32} height={32} className="rounded-circle mr-8pt" src="assets/images/people/50/guy-3.jpg" alt="account" />
            <span className="flex d-flex flex-column mr-8pt">
              <span className="text-black-100">Laza Bogdan</span>
              <small className="text-black-50">Administrator</small>
            </span>
            <i className="material-icons text-black-20 icon-16pt">keyboard_arrow_down</i>
          </a>
          <div className="dropdown-menu dropdown-menu-full dropdown-menu-caret-center">
            <div className="dropdown-header"><strong>Account</strong></div>
            <a className="dropdown-item" href="edit-account.html">Edit Account</a>
            <a className="dropdown-item" href="billing.html">Billing</a>
            <a className="dropdown-item" href="billing-history.html">Payments</a>
            <a className="dropdown-item" href="login.html">Logout</a>
            <div className="dropdown-divider" />
            <div className="dropdown-header"><strong>Select company</strong></div>
            <a href="#" className="dropdown-item active d-flex align-items-center">
              <div className="avatar avatar-sm mr-8pt">
                <span className="avatar-title rounded bg-primary">FM</span>
              </div>
              <small className="ml-4pt flex">
                <span className="d-flex flex-column">
                  <strong className="text-black-100">FrontendMatter Inc.</strong>
                  <span className="text-black-50">Administrator</span>
                </span>
              </small>
            </a>
            <a href="#" className="dropdown-item d-flex align-items-center">
              <div className="avatar avatar-sm mr-8pt">
                <span className="avatar-title rounded bg-accent">HH</span>
              </div>
              <small className="ml-4pt flex">
                <span className="d-flex flex-column">
                  <strong className="text-black-100">Khumla Inc.</strong>
                  <span className="text-black-50">Publisher</span>
                </span>
              </small>
            </a>
          </div>
        </div>
        <form action="index.html" className="search-form flex-shrink-0 search-form--black sidebar-m-b sidebar-p-l mx-16pt pr-0">
          <input type="text" className="form-control pl-0" placeholder="Search" />
          <button className="btn" type="submit"><i className="material-icons">search</i></button>
        </form>
        <div className="sidebar-heading">Overview</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a className="sidebar-menu-button" href="_courses.html">
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">insert_chart_outlined</span>
              <span className="sidebar-menu-text">Dashboard</span>
            </a>
          </li>
        </ul>
        <div className="sidebar-heading">Courses</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a className="sidebar-menu-button js-sidebar-collapse" data-toggle="collapse" href="#enterprise_menu">
              <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">donut_large</span>
              Courses
              <span className="ml-auto sidebar-menu-toggle-icon" />
            </a>
            <ul className="sidebar-submenu collapse sm-indent" id="enterprise_menu">
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="_courses.html">
                  <span className="sidebar-menu-text">My courses</span>
                </a>
              </li>
              <li className="sidebar-menu-item">
                <a className="sidebar-menu-button" href="_manage-quiz.html">
                  <span className="sidebar-menu-text">My quizes</span>
                </a>
              </li>
            </ul>
          </li>
        </ul> 
      </div>
    </div>
  </div>
  {/* // END drawer */}
</div>
</>


  
  )
}
