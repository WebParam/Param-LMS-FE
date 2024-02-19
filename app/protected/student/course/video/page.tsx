"use client"
import Image from 'next/image'
import styles from './page.module.css'
import {useCallback, useEffect} from 'react'
import { useState } from 'react';
import { ISection,ICourse, IModule, IVideo} from '@/app/interfaces/courses';
import { IUser } from '@/app/interfaces/user';
import IComment  from '@/app/interfaces/comment';
import { IResponseObject } from '@/app/lib/restapi/response';
import { Api } from '@/app/lib/restapi/endpoints';
import Cookies from 'universal-cookie';
import { getAuthor } from '@/app/lib/getAuthor';
import{formatTimeDifference} from '@/app/lib/formatTimeDifference';
import { getInitials } from '@/app/lib/getInitials';
import Aside from './aside/Aside';
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import './modal.css'
import { Modal } from 'react-responsive-modal';
import Quiz from '../quiz/page';
const cookies = new Cookies();


export default function CourseVideo() {
  
 const [author,setAuthor]=useState<IUser>();
 const [module,setModule]=useState<IModule>();
 const [video,setVideo]=useState<IVideo>();
 const [play, setPlay] = useState<boolean>(false);
 const [comments,setComments]=useState<IComment[]>();
 const [asideToggler, setAsideToggler] = useState(false);
 const [open, setOpen] = useState(false);

 const [openNew, setOpenNew] = useState(false);

  const onOpenModal = () => setOpenNew(true);
  const onCloseModal = () => setOpenNew(false);

 
  const openQuiz = () => {
    setOpen(false);
    console.log("open quiz");
    goToQuiz()
   // onOpenModal();
  }

 function toggleAside() {
  setAsideToggler(state => !state)
 }

 useEffect(()=>{
  var course:ICourse = JSON.parse(localStorage.getItem("course")as any) || null
  var _module:IModule  = JSON.parse(localStorage.getItem("module")as any) || null
  setModule(_module);
  const first =_module.videos[0];
  setVideo(first);
  getComments(first.id); 
  console.log("first",first.id);





  
},[]);

const goToCommentDetails=(Comment:IComment)=> {
  localStorage.setItem("comment",JSON.stringify(Comment));
  cookies.set("video",video);
  window.location.href="/protected/student/Comments/comment-details";
 }
 
const handlePlayClick = useCallback((event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //setPlay(true);
  setPlay(!play);
  console.log("play", play)
  event.preventDefault();
}, []);

const goToQuiz = () => {
  window.location.href = '/protected/student/course/quiz';
}



const goToAskQuestion=()=>{
  window.location.href = '/protected/student/Comments/add-comment'; 
 localStorage.setItem("comment-video",JSON.stringify(video));
}
const goToAllComments=()=>{
  window.location.href = '/protected/student/Comments/all-comments'; 
 localStorage.setItem("comment-video",JSON.stringify(video)); 
}
const handleBackClick=()=>{
  window.location.href = '/protected/student/course/course-detail'; 
}

const handleVideoEnd = () => {
  // Video has ended, you can add your logic here
  console.log('Video has completed.');
  setOpen(!open)
};


const getComments=async (id:string)=>{
  var _comment:IResponseObject<IComment>[]= await Api.GET_CommentsByReference(id);
  var data:IComment[]=_comment.map((comment) => comment.data) as IComment[];
  setComments(data);
}

  return (
<>
<div className='asideToggler' onClick={toggleAside} style={{position: 'fixed', top: '50vh', right: '0', zIndex: '10', width: '20px'}}>
<button
  type="button"
  className="btn btn-dark app-settings-button app-settings-button--left"
  aria-expanded="false"
>
<i className="material-icons icon--left" style={{transform: 'scale(1.3)'}}>arrow_back_ios_new</i>
</button>
{asideToggler && <Aside videos={JSON.parse(localStorage.getItem("module")as any)}/>}
</div>
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

        {
          module?.videos.map((video:any) => (
            <a data-toggle="tooltip" data-placement="bottom" data-title={video?.title}  data-original-title title=""><span className="material-icons">check_circle</span></a>
          ))
        }
      </nav>
      <div className="js-player bg-primary embed-responsive embed-responsive-16by9 mb-32pt" data-domfactory-upgraded="player">
        <div className="player embed-responsive-item">
          <div className="player__content">
            <div className="player__image" />
            <a onClick={handlePlayClick} href="" className="player__play bg-primary">
              <span className="material-icons">play_arrow</span>
            </a>
          </div>
          <div className={play ? "player__embed" : "player__embed d-none"}>
            {/* <iframe
              className="embed-responsive-item"
              src={video?.videoLink}
              allowFullScreen
              onEnded={handleVideoEnd}
            /> */}
                 <ReactPlayer
                          width='100%'
                          height='100%'
                            url={video?.videoLink}
                            controls={true}
                            autoPlay={true}
                            onEnded={() => handleVideoEnd()}
                          />
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={open}
        onConfirm={() => openQuiz()}
        onCancel={() => setOpen(false)}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the module, We have attached a quiz to rate your understading of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
      {/* <Modal open={openNew} onClose={onCloseModal} center
      closeOnOverlayClick={false}
      classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}
      >
        <Quiz />
      </Modal> */}
      <div className="d-flex flex-wrap align-items-end mb-16pt">
        <h1 className="text-white flex m-0">{module?.title}</h1>
        <p className="h1 text-white-50 font-weight-light m-0">{video?.length}</p>
      </div>
      <p className="hero__lead measure-hero-lead text-white-50 mb-24pt">{video?.description}</p>
      <a
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          handlePlayClick(e);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
      </a>
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
        <h4 className="m-0">Discussions</h4>
        <a onClick={goToAskQuestion} style={{cursor:"pointer"}}  className="text-underline ml-auto">Ask a Question</a>
      </div>
      <div className="border-top">
        <div className="list-group list-group-flush">
          
         {comments?.slice(0,3).map((comment)=>(
           <div className="list-group-item p-3">
           <div className="row align-items-start">
             <div className="col-md-3 mb-8pt mb-md-0">
               <div className="media align-items-center">
                 <div className="media-left mr-12pt">
                   <a href="#" className="avatar avatar-sm">
                     {/* <img src="../../AC" alt="avatar" className="avatar-img rounded-circle"/>  */}
                     <span className="avatar-title rounded-circle">{getInitials(comment?.creatingUserName)}</span>
                   </a>
                 </div>
                 <div className="d-flex flex-column media-body media-middle">
                   <a href="#" className="card-title">{comment.creatingUserName}</a>
                   <small className="text-muted">{formatTimeDifference(comment.createdDate)}</small>
                 </div>
               </div>
             </div>
             <div className="col mb-8pt mb-md-0">
               <p className="mb-0"><a href="/protected/student/Comments/comment-details" onClick={()=>goToCommentDetails(comment)} className="text-body"><strong>{comment?.title}</strong></a></p>
             </div>
             <div className="col-auto d-flex flex-column align-items-center justify-content-center">
             <h5 className="m-0">{comment?.replies?.length??0}</h5>
               <p className="lh-1 mb-0"><small className="text-70">answers</small></p>
             </div>
           </div>
         </div>
         ))}
         
        </div>
      </div>
      {comments &&comments.length > 3 && (
  <a onClick={()=>goToAllComments()} className="btn btn-outline-secondary">
    See all discussions for this lesson
  </a>
)}
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
