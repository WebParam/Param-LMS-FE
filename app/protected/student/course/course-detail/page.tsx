"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { Api } from '@/app/lib/restapi/endpoints';
import { ICourse, ISection,IModule } from '@/app/interfaces/courses';
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '@/app/interfaces/user';
import { IResponseObject } from '@/app/lib/restapi/response';
import { getSelectedCourseForEdit } from '@/app/redux/courseSlice';
import { getAuthor } from '@/app/lib/getAuthor';
import IComment from '@/app/interfaces/comment';
import { formatTimeDifference } from '@/app/lib/formatTimeDifference';
import { getInitials } from '@/app/lib/getInitials';
import CourseInfoPanel from './about-panel/page';
const cookies = new Cookies();


export default function CourseDetail() {

  //Restrict();

  const [data, setData] = useState<ICourse>();
  const [sections,setSection]=useState<ISection[]>([])
  const [openSections,setOpenSections]=useState<number[]>([]);
  const [userCourses,setUserCourses]=useState<ICourse[]>([]);
  const [author,setAuthor]=useState<IUser>();
  const [comments,setComments]=useState<IComment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const goToSectionModule=(module:IModule)=>{
    localStorage.setItem("module",JSON.stringify(module));
    window.location.href = '/protected/student/course/video'; 
   }
 
   
   const state:any=useSelector(getSelectedCourseForEdit).course;
  useEffect(() => {
    setSection(state?.sections);
       setData(state);
       if(state){
        setIsLoading(false);
       }
    getUserCourses(state?.creatingUser);
    const fetchData=async ()=>{
      setAuthor(await getAuthor(state?.creatingUser)); 
      debugger;
      var _comments=await Api.GET_CommentsByReference(state.id);
      if(_comments){
        setComments(_comments?.map((comment)=>comment.data)as any);
        console.log("Comments",_comments);
      }
      }
    fetchData();
  },[]); 

  const goLeaveReview=()=>{
    window.location.href = '/protected/student/Comments/add-course-comment'; 
   localStorage.setItem("add-course-comment",JSON.stringify(data));
  }

  async function getUserCourses(id:string){
    var userCourses= await Api.GET_CoursesByUserId(id);
    
    console.log("Author courses",userCourses?.data);
    setUserCourses(userCourses?.data);
  }

  const courseEnrollment = async (enrollmentData: any) => {
    var student = cookies.get('param-lms-user');
  
    const payload = {
      "userId": student?.id,
      "createdDate": enrollmentData?.createdDate,
      "creatingUser": enrollmentData?.creatingUser,
      "modifiedDate": "2024-01-12T10:22:30",
      "modifyingUser": enrollmentData?.modifyingUser,
      "state": 0,
      "courses": [enrollmentData?.id]
    }
    console.log("payload", payload);

    const enroll = await Api.POST_CourseEnrollment(payload);
    if(enroll){
      window.location.href = '/protected/student/dashboard'; 
      console.log("res", enroll)
    }


  }
 
 
  function _SetOpenSections(i:number){
    
    if(openSections.includes(i))
    { setOpenSections(openSections.filter(x=>x!=i))}
    else{ setOpenSections([...openSections, i])}
  }

  console.log("open", openSections)
  return (

<>
    <div
      className="mdk-box bg-primary js-mdk-box mb-0"
      data-effects="blend-background"
      data-domfactory-upgraded="mdk-box"
    >
      <div className="mdk-box__bg">
        <div
          className="mdk-box__bg-front"
          style={{
            transform: "translateZ(0px)",
            willChange: "opacity",
            opacity: 1
          }}
        />
        <div
          className="mdk-box__bg-rear"
          style={{
            transform: "translateZ(0px)",
            willChange: "opacity",
            opacity: 0
          }}
        />
      </div>
      <div className="mdk-box__content">
        <div className="hero py-64pt text-center text-sm-left">
          <div className="container page__container">
            <h1 className="text-white">{data ? data.title ?? "" : ""}
</h1>
            <p className="lead text-white-50 measure-hero-lead">
             {data?.description}
            </p>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start">
              <a
                href="student-lesson.html"
                className="btn btn-outline-white mb-16pt mb-sm-0 mr-sm-16pt"
              >
                Watch trailer{" "}
                <i className="material-icons icon--right">
                  play_circle_outline
                </i>
              </a>
              <a href="pricing.html" className="btn btn-white mb-16pt mb-sm-0 mr-sm-16pt">
                Start your free trial
              </a>
              <a 
                onClick={() => courseEnrollment(data)}
                href="#" className="btn btn-outline-white">
                Enroll 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="navbar navbar-expand-sm navbar-light bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
      <div className="container page__container">
        <ul className="nav navbar-nav flex align-items-sm-center">
          <li className="nav-item navbar-list__item">
            <div className="media align-items-center">
              <span className="media-left mr-16pt">
              <span className="material-icons text-primary">account_circle</span>
       
              </span>
              <div className="media-body">
                <a className="card-title m-0" href="teacher-profile.html">
                  {data?.creatingUserName}
                </a>
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
              <div className="rating__item">
                <i className="material-icons">star</i>
              </div>
              <div className="rating__item">
                <i className="material-icons">star</i>
              </div>
              <div className="rating__item">
                <i className="material-icons">star</i>
              </div>
              <div className="rating__item">
                <i className="material-icons">star</i>
              </div>
              <div className="rating__item">
                <i className="material-icons">star_border</i>
              </div>
            </div>
            <p className="lh-1 mb-0">
              <small className="text-muted">20 ratings</small>
            </p>
          </li>
        </ul>
      </div>
    </div> */}
    <CourseInfoPanel  course={data} isLoading={isLoading}/>
    <div className="page-section border-bottom-2">
      <div className="container page__container">
        <div className="page-separator">
          <div className="page-separator__text">Table of Contents</div>
        </div>
        <div className="row mb-0">
          <div className="col-lg-12">
            <div
              className="accordion js-accordion accordion--boxed list-group-flush"
              id="parent"
              data-domfactory-upgraded="accordion"
            >
              {/* <div onClick={(e)=>{e.preventDefault(); }} className={  "accordion__item"}>
                <a
                  href="#"
                  className="accordion__toggle collapsed"
                  data-toggle="collapse"
                  data-target="#course-toc-1"
                  data-parent="#parent"
                >
                  <span className="flex">Course Overview</span>
                  <span className="accordion__toggle-icon material-icons">
                    keyboard_arrow_down
                  </span>
                </a>
                <div className="accordion__menu collapse" id="course-toc-1">
                  <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">
                        play_circle_outline
                      // // </i>
                    </span>
                    <a className="flex" href="student-lesson.html">
                      Watch Trailer
                    </a>
                    <span className="text-muted">1m 10s</span>
                  </div>
                </div>
              </div> */}
               {/* <div className="accordion__item open">
                <a
                  href="#"
                  className="accordion__toggle"
                  data-toggle="collapse"
                  data-target="#course-toc-2"
                  data-parent="#parent"
                >
                  <span className="flex">Getting Started with Angular</span>
                  <span className="accordion__toggle-icon material-icons">
                    keyboard_arrow_down
                  </span>
                </a>
                <div
                  className="accordion__menu collapse show"
                  id="course-toc-2"
                >
                  <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">check_circle</i>
                    </span>
                    <a className="flex" href="student-lesson.html">
                      Introduction
                    </a>
                    <span className="text-muted">8m 42s</span>
                  </div>
                  <div className="accordion__menu-link active">
                    <span className="icon-holder icon-holder--small icon-holder--primary rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">
                        play_circle_outline
                      </i>
                    </span>
                    <a className="flex" href="student-lesson.html">
                      Introduction to TypeScript
                    </a>
                    <span className="text-muted">50m 13s</span>
                  </div>
                  <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">lock</i>
                    </span>
                    <a className="flex" href="student-lesson.html">
                      Comparing Angular to AngularJS
                    </a>
                    <span className="text-muted">12m 10s</span>
                  </div>
                  <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">
                        hourglass_empty
                      </i>
                    </span>
                    <a className="flex" href="student-take-quiz.html">
                      Quiz: Getting Started With Angular
                    </a>
                  </div>
                </div>
        </div>   */}
              
              {sections.length > 0 && (
  <>
    {sections.map((section,i) => (
      <div  
        onClick={(e)=>{ _SetOpenSections(i);e.preventDefault();}}
        className= { openSections.includes(i)? "accordion__item open": "accordion__item"} 
         key={section.id}
        >

        <a
         
          className="accordion__toggle"
          data-toggle="collapse"
          data-target={`#course-toc-${section.id}`}
          data-parent="#parent"
        >
          <span className="flex">
            {section.title ?? "Section title"}
          </span>
          <span className="accordion__toggle-icon material-icons">
            keyboard_arrow_down
          </span>
        </a>


        {/* {
          section.modules.map((

          ))
        } */}


        <div className={openSections.includes(i)? "accordion__menu collapse show": "accordion__menu collapse"} id={`course-toc-${section.id}`}>
          {/* <div className="accordion__menu-link">
            <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
              <i className="material-icons icon-16pt">lock</i>
            </span>
            <span className="text-muted">Lance</span> */}
            <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">
                        hourglass_empty
                      </i>
                    </span>
                   
                    {section.modules.map(module=>(
                      <div>
                        {
                       
                          
                            module.videos.map(video => (
                              <>
                            <span className="text-muted">{video.duration}</span> 
                            <a className="flex" style={{cursor:"pointer", paddingLeft:"1em"}}  onClick={()=>goToSectionModule(module)}>
                          {video.title}
                         </a>
                              </>
                      
                          ))
                        
                          
                    
                        }
                     
                      </div>
                   
                    ))}
                   
                  </div>
          {/* </div> */}
        </div>
      </div>
    ))}
  </>
)}

              {/* <div className="accordion__item">
                <a
                  href="#"
                  className="accordion__toggle collapsed"
                  data-toggle="collapse"
                  data-target="#course-toc-4"
                  data-parent="#parent"
                >
                  <span className="flex">
                    Exploring the Angular Template Syntax
                  </span>
                  <span className="accordion__toggle-icon material-icons">
                    keyboard_arrow_down
                  </span>
                </a>
                <div className="accordion__menu collapse" id="course-toc-4">
                  <div className="accordion__menu-link">
                    <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                      <i className="material-icons icon-16pt">lock</i>
                    </span>
                    <a className="flex" href="student-lesson.html">
                      Template Syntax
                    </a>
                    <span className="text-muted">04:23</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="col-lg-5 justify-content-center">
            <div className="card">
              <div className="card-body py-16pt text-center">
                <span className="icon-holder icon-holder--outline-secondary rounded-circle d-inline-flex mb-8pt">
                  <i className="material-icons">timer</i>
                </span>
                <h4 className="card-title">
                  <strong>Unlock Library</strong>
                </h4>
                <p className="card-subtitle text-70 mb-24pt">
                  Get access to all videos in the library
                </p>
                <a href="pricing.html" className="btn btn-accent mb-8pt">
                  Sign Up - Only $19.00/mo
                </a>
                <p className="mb-0">
                  Have an account? <a href="login.html">Login</a>
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    <div className="page-section bg-white border-bottom-2">
      <div className="container page__container">
        <div className="row ">
          <div className="col-md-7">
            <div className="page-separator">
              <div className="page-separator__text">About this course</div>
            </div>
            <p className="text-70">
             {data?.description}
            </p>
            {/* <p className="text-70 mb-0">
              This course will teach you the fundamentals o*f working with
              Angular 2. You *will learn everything you need to know to create
              complete applications including: components, services, directives,
              pipes, routing, HTTP, and even testing.
            </p> */}
          </div>
          <div className="col-md-5">
            <div className="page-separator">
              <div className="page-separator__text bg-white">
                What you’ll learn
              </div>
            </div>
            <ul className="list-unstyled">
             {
              sections.map((section)=>(

              <li className="d-flex align-items-center">
              <span className="material-icons text-50 mr-8pt">check</span>
              <span className="text-70">
                {section.title}
              </span>
            </li>))
             }
             
              {/* <li className="d-flex align-items-center">
                <span className="material-icons text-50 mr-8pt">check</span>
                <span className="text-70">
                  Create complete Angular applications
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="material-icons text-50 mr-8pt">check</span>
                <span className="text-70">Working with the Angular CLI</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="material-icons text-50 mr-8pt">check</span>
                <span className="text-70">
                  Understanding Dependency Injection
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="material-icons text-50 mr-8pt">check</span>
                <span className="text-70">Testing with Angular</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="page-section bg-white border-bottom-2">
      <div className="container">
        <div className="row">
          <div className="col-md-7 mb-24pt mb-md-0">
            <h4>About the author</h4>
            <p className="text-70 mb-24pt">
              {author?.summary}
            </p>
            <div className="page-separator">
              <div className="page-separator__text bg-white">
                More from the author
              </div>
            </div>
            {
              userCourses?.map((course)=>(
                <div className="card card-sm mb-8pt">
                <div className="card-body d-flex align-items-center">
                  <a href="course.html" className="avatar avatar-4by3 mr-12pt">
                    <img
                      src={course.bannerImage}
                      alt="Angular Routing In-Depth"
                      className="avatar-img rounded"
                    />
                  </a>
                  <div className="flex">
                    <a className="card-title mb-4pt" href="course.html">
                      {course.title}
                    </a>
                    <div className="d-flex align-items-center">
                      <div className="rating mr-8pt">
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                        <span className="rating__item">
                          <span className="material-icons">star_border</span>
                        </span>
                      </div>
                      <small className="text-muted">3/5</small>
                    </div>
                  </div>
                </div>
              </div>
              ))
            }
           
            {/* <div className="card card-sm mb-16pt">
              <div className="card-body d-flex align-items-center">
                <a href="course.html" className="avatar avatar-4by3 mr-12pt">
                  <img
                    src="public/images/paths/angular_testing_200x168.png"
                    alt="Angular Unit Testing"
                    className="avatar-img rounded"
                  />
                </a>
                <div className="flex">
                  <a className="card-title mb-4pt" href="course.html">
                    Angular Unit Testing
                  </a>
                  <div className="d-flex align-items-center">
                    <div className="rating mr-8pt">
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star_border</span>
                      </span>
                    </div>
                    <small className="text-muted">4/5</small>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="list-group list-group-flush">
              <div className="list-group-item px-0">
                <a href="" className="card-title mb-4pt">
                  Angular Best Practices
                </a>
                <p className="lh-1 mb-0">
                  <small className="text-muted mr-8pt">6h 40m</small>
                  <small className="text-muted mr-8pt">13,876 Views</small>
                  <small className="text-muted">13 May 2018</small>
                </p>
              </div>
              <div className="list-group-item px-0">
                <a href="" className="card-title mb-4pt">
                  Unit Testing in Angular
                </a>
                <p className="lh-1 mb-0">
                  <small className="text-muted mr-8pt">6h 40m</small>
                  <small className="text-muted mr-8pt">13,876 Views</small>
                  <small className="text-muted">13 May 2018</small>
                </p>
              </div>
              <div className="list-group-item px-0">
                <a href="" className="card-title mb-4pt">
                  Migrating Applications from AngularJS to Angular
                </a>
                <p className="lh-1 mb-0">
                  <small className="text-muted mr-8pt">6h 40m</small>
                  <small className="text-muted mr-8pt">13,876 Views</small>
                  <small className="text-muted">13 May 2018</small>
                </p>
              </div>
            </div> */}
          </div>
          <div className="col-md-5 pt-sm-32pt pt-md-0 d-flex flex-column align-items-center justify-content-start">
            <div className="text-center">
              <p className="mb-16pt">
                <img
                  src={author?.image}
                  alt="guy-6"
                  className="rounded-circle"
                  width={64}
                />
              </p>
              <h4 className="m-0">{author?.name} {author?.surname}</h4>
              <p className="lh-1">
                <small className="text-muted">{author?.headLine}</small>
              </p>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start">
                <a
                  href="teacher-profile.html"
                  className="btn btn-outline-primary mb-16pt mb-sm-0 mr-sm-16pt"
                >
                  Follow
                </a>
                <a
                  href="teacher-profile.html"
                  className="btn btn-outline-secondary"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="page-section border-bottom-2">
      <div className="container">
        <div className="page-headline text-center">
          <h2>Feedback</h2>
          <p className="lead text-70 measure-lead mx-auto">
            What other students turned professionals have to say about us after
            learning with us and reaching their goals.
          </p>
        </div>
        {/* <div className="position-relative carousel-card p-0 mx-auto">
          <div
            className="row d-block js-mdk-carousel"
            id="carousel-feedback"
            data-interval={3000}
            style={{ overflow: "hidden" }}
            data-domfactory-upgraded="mdk-carousel"
          >
            <a
              className="carousel-control-next js-mdk-carousel-control mt-n24pt"
              href="#carousel-feedback"
              role="button"
              data-slide="next"
              data-domfactory-upgraded="mdk-carousel-control"
            >
              <span
                className="carousel-control-icon material-icons"
                aria-hidden="true"
              >
                keyboard_arrow_right
              </span>
              <span className="sr-only">Next</span>
            </a>
            <div
              className="mdk-carousel__content"
              style={{ transitionDuration: "0ms", width: 1404 }}
            >
              {/* <div
                className="col-12 col-md-6 mdk-carousel__item"
                style={{ width: 468 }}
              >
                <div className="card card-feedback card-body">
                  <blockquote className="blockquote mb-0">
                    <p className="text-70 small mb-0">
                      A wonderful course on how to start. Eddie beautifully
                      conveys all essentials of a becoming a good Angular
                      developer. Very glad to have taken this course. Thank you
                      Eddie Bryan.
                    </p>
                  </blockquote>
                </div>
                <div className="media ml-12pt">
                  <div className="media-left mr-12pt">
                    <a href="student-profile.html" className="avatar avatar-sm">
                      {/* <img src="../../public/images/people/110/guy-.jpg" width="40" alt="avatar" class="rounded-circle"> 
                      <span className="avatar-title rounded-circle">UK</span>
                    </a>
                  </div>
                  <div className="media-body media-middle">
                    <a href="student-profile.html" className="card-title">
                      Umberto Kass
                    </a>
                    <div className="rating mt-4pt">
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star_border</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div
                className="col-12 col-md-6 mdk-carousel__item"
                style={{ width: 468 }}
              >
                <div className="card card-feedback card-body">
                  <blockquote className="blockquote mb-0">
                    <p className="text-70 small mb-0">
                      A wonderful course on how to start. Eddie beautifully
                      conveys all essentials of a becoming a good Angular
                      developer. Very glad to have taken this course. Thank you
                      Eddie Bryan.
                    </p>
                  </blockquote>
                </div>
                <div className="media ml-12pt">
                  <div className="media-left mr-12pt">
                    <a href="student-profile.html" className="avatar avatar-sm">
                      {/* <img src="../../public/images/people/110/guy-.jpg" width="40" alt="avatar" class="rounded-circle"> 
                      <span className="avatar-title rounded-circle">UK</span>
                    </a>
                  </div>
                  <div className="media-body media-middle">
                    <a href="student-profile.html" className="card-title">
                      Umberto Kass
                    </a>
                    <div className="rating mt-4pt">
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star_border</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 mdk-carousel__item"
                style={{ width: 468 }}
              >
                <div className="card card-feedback card-body">
                  <blockquote className="blockquote mb-0">
                    <p className="text-70 small mb-0">
                      A wonderful course on how to start. Eddie beautifully
                      conveys all essentials of a becoming a good Angular
                      developer. Very glad to have taken this course. Thank you
                      Eddie Bryan.
                    </p>
                  </blockquote>
                </div>
                <div className="media ml-12pt">
                  <div className="media-left mr-12pt">
                    <a href="student-profile.html" className="avatar avatar-sm">
                      {/* <img src="../../public/images/people/110/guy-.jpg" width="40" alt="avatar" class="rounded-circle"> 
                      <span className="avatar-title rounded-circle">UK</span>
                    </a>
                  </div>
                  <div className="media-body media-middle">
                    <a href="student-profile.html" className="card-title">
                      Umberto Kass
                    </a>
                    <div className="rating mt-4pt">
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star</span>
                      </span>
                      <span className="rating__item">
                        <span className="material-icons">star_border</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div> */}
      </div>
    </div>
    <div className="page-section bg-white border-bottom-2">
      <div className="container page__container">
        <div className="page-separator">
          <div className="page-separator__text">Student Feedback</div>
          <a onClick={goLeaveReview} style={{cursor:"pointer"}}  className="page-separator__text ml-auto">Tell Us What You Think<i className="material-icons icon--right">arrow_forward</i></a>
        </div>
        <div className="row mb-32pt">
          <div className="col-md-3 mb-32pt mb-md-0">
            <div className="display-1">4.7</div>
            <div className="rating rating-24">
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star_border</span>
              </span>
            </div>
            <p className="text-muted mb-0">20 ratings</p>
          </div>
          <div className="col-md-9">
            <div
              className="row align-items-center mb-8pt"
              data-toggle="tooltip"
              data-title="75% rated 5/5"
              data-placement="top"
              data-original-title=""
              title=""
            >
              <div className="col-md col-sm-6">
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    aria-valuenow={75}
                    style={{ width: "75%" }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-6 d-none d-sm-flex align-items-center">
                <div className="rating">
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="row align-items-center mb-8pt"
              data-toggle="tooltip"
              data-title="16% rated 4/5"
              data-placement="top"
              data-original-title=""
              title=""
            >
              <div className="col-md col-sm-6">
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    aria-valuenow={16}
                    style={{ width: "16%" }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-6 d-none d-sm-flex align-items-center">
                <div className="rating">
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="row align-items-center mb-8pt"
              data-toggle="tooltip"
              data-title="12% rated 3/5"
              data-placement="top"
              data-original-title=""
              title=""
            >
              <div className="col-md col-sm-6">
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    aria-valuenow={12}
                    style={{ width: "12%" }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-6 d-none d-sm-flex align-items-center">
                <div className="rating">
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="row align-items-center mb-8pt"
              data-toggle="tooltip"
              data-title="9% rated 2/5"
              data-placement="top"
              data-original-title=""
              title=""
            >
              <div className="col-md col-sm-6">
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    aria-valuenow={9}
                    style={{ width: "9%" }}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-6 d-none d-sm-flex align-items-center">
                <div className="rating">
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="row align-items-center mb-8pt"
              data-toggle="tooltip"
              data-title="0% rated 0/5"
              data-placement="top"
              data-original-title=""
              title=""
            >
              <div className="col-md col-sm-6">
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-md-auto col-sm-6 d-none d-sm-flex align-items-center">
                <div className="rating">
                  <span className="rating__item">
                    <span className="material-icons">star</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                  <span className="rating__item">
                    <span className="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
       {comments&&(
        comments.map((comment)=>(
          <div className="pb-16pt mb-16pt border-bottom row">
          <div className="col-md-3 mb-16pt mb-md-0">
            <div className="d-flex">
              <a
                href="student-profile.html"
                className="avatar avatar-sm mr-12pt"
              >
                {/* <img src="LB" alt="avatar" class="avatar-img rounded-circle"> */}
                <span className="avatar-title rounded-circle">{getInitials(comment?.creatingUserName)}</span>
              </a>
              <div className="flex">
                <p className="small text-muted m-0">{formatTimeDifference(comment.createdDate)}</p>
                <a href="student-profile.html" className="card-title">
                  {comment.creatingUserName}
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="rating mb-8pt">
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star</span>
              </span>
              <span className="rating__item">
                <span className="material-icons">star_border</span>
              </span>
            </div>
            <p className="text-70 mb-0">
             {comment.message}
            </p>
          </div>
        </div>
        ))
       )}
       
      </div>
    </div>
    <div className="page-section">
      <div className="container page__container">
        <div className="page-heading">
          <h4>Top Development Courses</h4>
          <a
            href="library-development.html"
            className="ml-sm-auto text-underline"
          >
            See Development Courses
          </a>
        </div>
        <div className="position-relative carousel-card">
          <div
            className="js-mdk-carousel row d-block"
            id="carousel-courses1"
            data-interval={3000}
            style={{ overflow: "hidden" }}
            data-domfactory-upgraded="mdk-carousel"
          >
            <a
              className="carousel-control-next js-mdk-carousel-control mt-n24pt"
              href="#carousel-courses1"
              role="button"
              data-slide="next"
              data-domfactory-upgraded="mdk-carousel-control"
            >
              <span
                className="carousel-control-icon material-icons"
                aria-hidden="true"
              >
                keyboard_arrow_right
              </span>
              <span className="sr-only">Next</span>
            </a>
            <div
              className="mdk-carousel__content"
              style={{ transitionDuration: "0ms", width: 936 }}
            >
              <div
                className="col-12 col-sm-6 col-md-4 col-xl-3 mdk-carousel__item"
                style={{ width: 234 }}
              >
                <div
                  className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay mdk-reveal js-mdk-reveal "
                  data-partial-height={44}
                  data-toggle="popover"
                  data-trigger="click"
                  data-original-title=""
                  title=""
                  data-domfactory-upgraded="mdk-reveal,overlay"
                  style={{ height: 212 }}
                >
                  <a
                    href="student-course.html"
                    className="js-image"
                    data-position="center"
                    data-height="auto"
                    data-domfactory-upgraded="image"
                    style={{
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        'url("https://luma.humatheme.com/public/images/paths/angular_430x168.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      height: 168
                    }}
                  >
                    <img
                      src="../../public/images/paths/angular_430x168.png"
                      alt="course"
                      style={{ visibility: "hidden" }}
                    />
                    <span className="overlay__content align-items-start justify-content-start">
                      <span className="overlay__action card-body d-flex align-items-center">
                        <i className="material-icons mr-4pt">
                          play_circle_outline
                        </i>
                        <span className="card-title text-white">Preview</span>
                      </span>
                    </span>
                  </a>
                  <span className="corner-ribbon corner-ribbon--default-right-top corner-ribbon--shadow bg-accent text-white">
                    NEW
                  </span>
                  <div className="mdk-reveal__content">
                    <div
                      className="mdk-reveal__partial"
                      style={{ height: 44 }}
                    />
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex">
                          <a className="card-title" href="student-course.html">
                            Learn Angular fundamentals
                          </a>
                          <small className="text-50 font-weight-bold mb-4pt">
                            Elijah Murray
                          </small>
                        </div>
                        <a
                          href="student-course.html"
                          data-toggle="tooltip"
                          data-title="Add Favorite"
                          data-placement="top"
                          data-boundary="window"
                          className="ml-4pt material-icons text-20 card-course__icon-favorite"
                          data-original-title=""
                          title=""
                        >
                          favorite_border
                        </a>
                      </div>
                      <div className="d-flex">
                        <div className="rating flex">
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star_border</span>
                          </span>
                        </div>
                        <small className="text-50">6 hours</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popoverContainer d-none">
                  <div className="media">
                    <div className="media-left mr-12pt">
                      <img
                        src="../../public/images/paths/angular_40x40@2x.png"
                        width={40}
                        height={40}
                        alt="Angular"
                        className="rounded"
                      />
                    </div>
                    <div className="media-body">
                      <div className="card-title mb-0">
                        Learn Angular fundamentals
                      </div>
                      <p className="lh-1 mb-0">
                        <span className="text-50 small">with</span>
                        <span className="text-50 small font-weight-bold">
                          Elijah Murray
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="my-16pt text-70">
                    Learn the fundamentals of working with Angular and how to
                    create basic applications.
                  </p>
                  <div className="mb-16pt">
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Fundamentals of working with Angular</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Create complete Angular applications</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Working with the Angular CLI</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Understanding Dependency Injection</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Testing with Angular</small>
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          access_time
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>6 hours</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          play_circle_outline
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>12 lessons</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          assessment
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>Beginner</small>
                        </p>
                      </div>
                    </div>
                    <div className="col text-right">
                      <a href="student-course.html" className="btn btn-primary">
                        Watch trailer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-4 col-xl-3 mdk-carousel__item"
                style={{ width: 234 }}
              >
                <div
                  className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay mdk-reveal js-mdk-reveal "
                  data-partial-height={44}
                  data-toggle="popover"
                  data-trigger="click"
                  data-original-title=""
                  title=""
                  data-domfactory-upgraded="mdk-reveal,overlay"
                  style={{ height: 212 }}
                >
                  <a
                    href="student-course.html"
                    className="js-image"
                    data-position="center"
                    data-height="auto"
                    data-domfactory-upgraded="image"
                    style={{
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        'url("https://luma.humatheme.com/public/images/paths/swift_430x168.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      height: 168
                    }}
                  >
                    <img
                      src="../../public/images/paths/swift_430x168.png"
                      alt="course"
                      style={{ visibility: "hidden" }}
                    />
                    <span className="overlay__content align-items-start justify-content-start">
                      <span className="overlay__action card-body d-flex align-items-center">
                        <i className="material-icons mr-4pt">
                          play_circle_outline
                        </i>
                        <span className="card-title text-white">Preview</span>
                      </span>
                    </span>
                  </a>
                  <div className="mdk-reveal__content">
                    <div
                      className="mdk-reveal__partial"
                      style={{ height: 44 }}
                    />
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex">
                          <a className="card-title" href="student-course.html">
                            Build an iOS Application in Swift
                          </a>
                          <small className="text-50 font-weight-bold mb-4pt">
                            Elijah Murray
                          </small>
                        </div>
                        <a
                          href="student-course.html"
                          data-toggle="tooltip"
                          data-title="Remove Favorite"
                          data-placement="top"
                          data-boundary="window"
                          className="ml-4pt material-icons text-20 card-course__icon-favorite"
                          data-original-title=""
                          title=""
                        >
                          favorite
                        </a>
                      </div>
                      <div className="d-flex">
                        <div className="rating flex">
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star_border</span>
                          </span>
                        </div>
                        <small className="text-50">6 hours</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popoverContainer d-none">
                  <div className="media">
                    <div className="media-left mr-12pt">
                      <img
                        src="../../public/images/paths/swift_40x40@2x.png"
                        width={40}
                        height={40}
                        alt="Angular"
                        className="rounded"
                      />
                    </div>
                    <div className="media-body">
                      <div className="card-title mb-0">
                        Build an iOS Application in Swift
                      </div>
                      <p className="lh-1 mb-0">
                        <span className="text-50 small">with</span>
                        <span className="text-50 small font-weight-bold">
                          Elijah Murray
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="my-16pt text-70">
                    Learn the fundamentals of working with Angular and how to
                    create basic applications.
                  </p>
                  <div className="mb-16pt">
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Fundamentals of working with Angular</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Create complete Angular applications</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Working with the Angular CLI</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Understanding Dependency Injection</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Testing with Angular</small>
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          access_time
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>6 hours</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          play_circle_outline
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>12 lessons</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          assessment
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>Beginner</small>
                        </p>
                      </div>
                    </div>
                    <div className="col text-right">
                      <a href="student-course.html" className="btn btn-primary">
                        Watch trailer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-4 col-xl-3 mdk-carousel__item"
                style={{ width: 234 }}
              >
                <div
                  className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay mdk-reveal js-mdk-reveal "
                  data-partial-height={44}
                  data-toggle="popover"
                  data-trigger="click"
                  data-original-title=""
                  title=""
                  data-domfactory-upgraded="mdk-reveal,overlay"
                  style={{ height: 212 }}
                >
                  <a
                    href="student-course.html"
                    className="js-image"
                    data-position="center"
                    data-height="auto"
                    data-domfactory-upgraded="image"
                    style={{
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        'url("https://luma.humatheme.com/public/images/paths/wordpress_430x168.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      height: 168
                    }}
                  >
                    <img
                      src="../../public/images/paths/wordpress_430x168.png"
                      alt="course"
                      style={{ visibility: "hidden" }}
                    />
                    <span className="overlay__content align-items-start justify-content-start">
                      <span className="overlay__action card-body d-flex align-items-center">
                        <i className="material-icons mr-4pt">
                          play_circle_outline
                        </i>
                        <span className="card-title text-white">Preview</span>
                      </span>
                    </span>
                  </a>
                  <div className="mdk-reveal__content">
                    <div
                      className="mdk-reveal__partial"
                      style={{ height: 44 }}
                    />
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex">
                          <a className="card-title" href="student-course.html">
                            Build a WordPress Website
                          </a>
                          <small className="text-50 font-weight-bold mb-4pt">
                            Elijah Murray
                          </small>
                        </div>
                        <a
                          href="student-course.html"
                          data-toggle="tooltip"
                          data-title="Add Favorite"
                          data-placement="top"
                          data-boundary="window"
                          className="ml-4pt material-icons text-20 card-course__icon-favorite"
                          data-original-title=""
                          title=""
                        >
                          favorite_border
                        </a>
                      </div>
                      <div className="d-flex">
                        <div className="rating flex">
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star_border</span>
                          </span>
                        </div>
                        <small className="text-50">6 hours</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popoverContainer d-none">
                  <div className="media">
                    <div className="media-left mr-12pt">
                      <img
                        src="../../public/images/paths/wordpress_40x40@2x.png"
                        width={40}
                        height={40}
                        alt="Angular"
                        className="rounded"
                      />
                    </div>
                    <div className="media-body">
                      <div className="card-title mb-0">
                        Build a WordPress Website
                      </div>
                      <p className="lh-1 mb-0">
                        <span className="text-50 small">with</span>
                        <span className="text-50 small font-weight-bold">
                          Elijah Murray
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="my-16pt text-70">
                    Learn the fundamentals of working with Angular and how to
                    create basic applications.
                  </p>
                  <div className="mb-16pt">
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Fundamentals of working with Angular</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Create complete Angular applications</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Working with the Angular CLI</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Understanding Dependency Injection</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Testing with Angular</small>
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          access_time
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>6 hours</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          play_circle_outline
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>12 lessons</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          assessment
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>Beginner</small>
                        </p>
                      </div>
                    </div>
                    <div className="col text-right">
                      <a href="student-course.html" className="btn btn-primary">
                        Watch trailer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-4 col-xl-3 mdk-carousel__item"
                style={{ width: 234 }}
              >
                <div
                  className="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay mdk-reveal js-mdk-reveal "
                  data-partial-height={44}
                  data-toggle="popover"
                  data-trigger="click"
                  data-original-title=""
                  title=""
                  data-domfactory-upgraded="mdk-reveal,overlay"
                  style={{ height: 212 }}
                >
                  <a
                    href="student-course.html"
                    className="js-image"
                    data-position="left"
                    data-height="auto"
                    data-domfactory-upgraded="image"
                    style={{
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        'url("https://luma.humatheme.com/public/images/paths/react_430x168.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "left center",
                      height: 168
                    }}
                  >
                    <img
                      src="../../public/images/paths/react_430x168.png"
                      alt="course"
                      style={{ visibility: "hidden" }}
                    />
                    <span className="overlay__content align-items-start justify-content-start">
                      <span className="overlay__action card-body d-flex align-items-center">
                        <i className="material-icons mr-4pt">
                          play_circle_outline
                        </i>
                        <span className="card-title text-white">Preview</span>
                      </span>
                    </span>
                  </a>
                  <div className="mdk-reveal__content">
                    <div
                      className="mdk-reveal__partial"
                      style={{ height: 44 }}
                    />
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex">
                          <a className="card-title" href="student-course.html">
                            Become a React Native Developer
                          </a>
                          <small className="text-50 font-weight-bold mb-4pt">
                            Elijah Murray
                          </small>
                        </div>
                        <a
                          href="student-course.html"
                          data-toggle="tooltip"
                          data-title="Add Favorite"
                          data-placement="top"
                          data-boundary="window"
                          className="ml-4pt material-icons text-20 card-course__icon-favorite"
                          data-original-title=""
                          title=""
                        >
                          favorite_border
                        </a>
                      </div>
                      <div className="d-flex">
                        <div className="rating flex">
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star</span>
                          </span>
                          <span className="rating__item">
                            <span className="material-icons">star_border</span>
                          </span>
                        </div>
                        <small className="text-50">6 hours</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popoverContainer d-none">
                  <div className="media">
                    <div className="media-left mr-12pt">
                      <img
                        src="../../public/images/paths/react_40x40@2x.png"
                        width={40}
                        height={40}
                        alt="Angular"
                        className="rounded"
                      />
                    </div>
                    <div className="media-body">
                      <div className="card-title mb-0">
                        Become a React Native Developer
                      </div>
                      <p className="lh-1 mb-0">
                        <span className="text-50 small">with</span>
                        <span className="text-50 small font-weight-bold">
                          Elijah Murray
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="my-16pt text-70">
                    Learn the fundamentals of working with Angular and how to
                    create basic applications.
                  </p>
                  <div className="mb-16pt">
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Fundamentals of working with Angular</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Create complete Angular applications</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Working with the Angular CLI</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Understanding Dependency Injection</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons icon-16pt text-50 mr-8pt">
                        check
                      </span>
                      <p className="flex text-50 lh-1 mb-0">
                        <small>Testing with Angular</small>
                      </p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          access_time
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>6 hours</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-4pt">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          play_circle_outline
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>12 lessons</small>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="material-icons icon-16pt text-50 mr-4pt">
                          assessment
                        </span>
                        <p className="flex text-50 lh-1 mb-0">
                          <small>Beginner</small>
                        </p>
                      </div>
                    </div>
                    <div className="col text-right">
                      <a href="student-course.html" className="btn btn-primary">
                        Watch trailer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/* // END drawer-layout__content */}
  </> 
  
  )
}
