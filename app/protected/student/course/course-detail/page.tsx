"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { Api } from '@/app/lib/restapi/endpoints';
import { ICourse, ISection, IModule } from '@/app/interfaces/courses';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '@/app/interfaces/user';
import { IResponseObject } from '@/app/lib/restapi/response';
import { getSelectedCourseForEdit } from '@/app/redux/courseSlice';
import { getAuthor } from '@/app/lib/getAuthor';
import IComment from '@/app/interfaces/comment';
import { formatTimeDifference } from '@/app/lib/formatTimeDifference';
import { getInitials } from '@/app/lib/getInitials';
import CourseInfoPanel from './about-panel/page';
import VideoGrid from './video-grid/page';
import AccordionSidebar from './accordion-sidebar/page';
 import './main.css'

import CoursePreview from "./course-preview/page";
import VideoSidebar from "./video-sidebar/page";

const cookies = new Cookies();


export default function CourseDetail() {


  const [data, setData] = useState<ICourse>();
  const [sections, setSection] = useState<ISection[]>([])
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [userCourses, setUserCourses] = useState<ICourse[]>();
  const [author, setAuthor] = useState<IUser>();
  const [comments, setComments] = useState<IComment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const goToSectionModule = (module: IModule) => {
    localStorage.setItem("module", JSON.stringify(module));
    window.location.href = '/protected/student/course/video';
  }


  const state: any = useSelector(getSelectedCourseForEdit).course;
  useEffect(() => {
    setSection(state?.sections);
    
    setData(state);
    if (state) {
      setIsLoading(false);
    }
    getUserCourses(state?.creatingUser);
    const fetchData = async () => {
      console.log("sections", sections)
      setAuthor(await getAuthor(state?.creatingUser));
      //debugger;
      var _comments = await Api.GET_CommentsByReference(state.id);
      if (_comments) {
        setComments(_comments?.map((comment) => comment.data) as any);
        console.log("Comments", _comments);
      }
    }
    fetchData();
  }, []);

    const goLeaveReview = () => {
    window.location.href = '/protected/student/Comments/add-course-comment';
    localStorage.setItem("add-course-comment", JSON.stringify(data));
  }

  async function getUserCourses(id: string) {
    var userCourses = await Api.GET_CoursesByUserId(id);

    console.log("Author courses", userCourses?.data);
    setUserCourses(userCourses?.data);
  }

  const [selectedVideo, setSelectedVideo] = useState(sections[0]);

  const handleVideoSelect = (video:any) => {
    setSelectedVideo(video);
  };


  return (
    <div className="main">
      <CoursePreview previewVideoUrl={selectedVideo} course={state}/>
      <VideoSidebar sections={sections} onVideoSelect={handleVideoSelect} />
    </div>
  )


  







//   }


//   function _SetOpenSections(i: number) {

//     if (openSections.includes(i)) { setOpenSections(openSections.filter(x => x != i)) }
//     else { setOpenSections([...openSections, i]) }
//   }

//   console.log("open", openSections)
//   return (

//     <>
//       <div
//         className="mdk-box bg-primary js-mdk-box mb-0"
//         data-effects="blend-background"
//         data-domfactory-upgraded="mdk-box"
//       >
//         <div className="mdk-box__bg">
//           <div
//             className="mdk-box__bg-front"
//             style={{
//               transform: "translateZ(0px)",
//               willChange: "opacity",
//               opacity: 1
//             }}
//           />
//           <div
//             className="mdk-box__bg-rear"
//             style={{
//               transform: "translateZ(0px)",
//               willChange: "opacity",
//               opacity: 0
//             }}
//           />
//         </div>
//         <div className="mdk-box__content">
//           <div className="hero py-64pt text-center text-sm-left">
//             <div className="page__container">
//               <h1 className="text-white">{data ? data.title ?? "" : ""}
//               </h1>
//               <p className="lead text-white-50 measure-hero-lead">
//                 {data?.description}
//               </p>
//               <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start">
//                 <a
//                   href="student-lesson.html"
//                   className="btn btn-outline-white mb-16pt mb-sm-0 mr-sm-16pt"
//                 >
//                   Watch trailer{" "}
//                   <i className="material-icons icon--right">
//                     play_circle_outline
//                   </i>
//                 </a>
//                 <a href="pricing.html" className="btn btn-white mb-16pt mb-sm-0 mr-sm-16pt">
//                   Start your free trial
//                 </a>
//                 <a
//                   onClick={() => courseEnrollment(data)}
//                   href="#" className="btn btn-outline-white">
//                   Enroll
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
     
//       <div className="page-section bg-white border-bottom-2">
//         <div className=" page__container">
//           <div className="row ">
//             <div className="col-md-7">
//               <div className="page-separator">
//                 <div className="page-separator__text">About this course</div>
//               </div>
//               <p className="text-70">
//                 {data?.description}
//               </p>
            
//             </div>
//             <div className="col-md-5">
//               <div className="page-separator">
//                 <div className="page-separator__text bg-white">
//                   What you’ll learn
//                 </div>
//               </div>
//               <ul className="list-unstyled">
//                 {
//                   sections.map((section) => (

//                     <li className="d-flex align-items-center">
//                       <span className="material-icons text-50 mr-8pt">check</span>
//                       <span className="text-70">
//                         {section.title}
//                       </span>
//                     </li>))
//                 }
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CourseInfoPanel course={data} isLoading={isLoading} />
//       <div className="page-section border-bottom-2">
//         <div className="page__container video-container">
//           <div className="page-separator" >
//             {/* <div className="page-separator__text">Table of Contents</div> */}
//           </div>
//           <div className="row mb-0">
//             <div className="col-lg-12 video-container">
//               {sections.length > 0 && (

//                 <AccordionSidebar className="video-container" videos={sections} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="page-section bg-white border-bottom-2">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-7 mb-24pt mb-md-0">
//               <h4>About the author</h4>
//               <p className="text-70 mb-24pt">
//                 {author?.summary}
//               </p>
//               <div className="page-separator">
//                 <div className="page-separator__text bg-white">
//                   More from the author
//                 </div>
//               </div>
//               {
//                 userCourses?.map((course) => (
//                   <div className="card card-sm mb-8pt">
//                     <div className="card-body d-flex align-items-center">
//                       <a href="course.html" className="avatar avatar-4by3 mr-12pt">
//                         <img
//                           src={course.bannerImage}
//                           alt="Angular Routing In-Depth"
//                           className="avatar-img rounded"
//                         />
//                       </a>
//                       <div className="flex">
//                         <a className="card-title mb-4pt" href="course.html">
//                           {course.title}
//                         </a>
//                         <div className="d-flex align-items-center">
//                           <div className="rating mr-8pt">
//                             <span className="rating__item">
//                               <span className="material-icons">star</span>
//                             </span>
//                             <span className="rating__item">
//                               <span className="material-icons">star</span>
//                             </span>
//                             <span className="rating__item">
//                               <span className="material-icons">star</span>
//                             </span>
//                             <span className="rating__item">
//                               <span className="material-icons">star_border</span>
//                             </span>
//                             <span className="rating__item">
//                               <span className="material-icons">star_border</span>
//                             </span>
//                           </div>
//                           <small className="text-muted">3/5</small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               }

//               {/* <div className="card card-sm mb-16pt">
//               <div className="card-body d-flex align-items-center">
//                 <a href="course.html" className="avatar avatar-4by3 mr-12pt">
//                   <img
//                     src="public/images/paths/angular_testing_200x168.png"
//                     alt="Angular Unit Testing"
//                     className="avatar-img rounded"
//                   />
//                 </a>
//                 <div className="flex">
//                   <a className="card-title mb-4pt" href="course.html">
//                     Angular Unit Testing
//                   </a>
//                   <div className="d-flex align-items-center">
//                     <div className="rating mr-8pt">
//                       <span className="rating__item">
//                         <span className="material-icons">star</span>
//                       </span>
//                       <span className="rating__item">
//                         <span className="material-icons">star</span>
//                       </span>
//                       <span className="rating__item">
//                         <span className="material-icons">star</span>
//                       </span>
//                       <span className="rating__item">
//                         <span className="material-icons">star</span>
//                       </span>
//                       <span className="rating__item">
//                         <span className="material-icons">star_border</span>
//                       </span>
//                     </div>
//                     <small className="text-muted">4/5</small>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//               {/* <div className="list-group list-group-flush">
//               <div className="list-group-item px-0">
//                 <a href="" className="card-title mb-4pt">
//                   Angular Best Practices
//                 </a>
//                 <p className="lh-1 mb-0">
//                   <small className="text-muted mr-8pt">6h 40m</small>
//                   <small className="text-muted mr-8pt">13,876 Views</small>
//                   <small className="text-muted">13 May 2018</small>
//                 </p>
//               </div>
//               <div className="list-group-item px-0">
//                 <a href="" className="card-title mb-4pt">
//                   Unit Testing in Angular
//                 </a>
//                 <p className="lh-1 mb-0">
//                   <small className="text-muted mr-8pt">6h 40m</small>
//                   <small className="text-muted mr-8pt">13,876 Views</small>
//                   <small className="text-muted">13 May 2018</small>
//                 </p>
//               </div>
//               <div className="list-group-item px-0">
//                 <a href="" className="card-title mb-4pt">
//                   Migrating Applications from AngularJS to Angular
//                 </a>
//                 <p className="lh-1 mb-0">
//                   <small className="text-muted mr-8pt">6h 40m</small>
//                   <small className="text-muted mr-8pt">13,876 Views</small>
//                   <small className="text-muted">13 May 2018</small>
//                 </p>
//               </div>
//             </div> */}
//             </div>
//             <div className="col-md-5 pt-sm-32pt pt-md-0 d-flex flex-column align-items-center justify-content-start">
//               <div className="text-center">
//                 <p className="mb-16pt">
//                   <img
//                     src={author?.image}
//                     alt="guy-6"
//                     className="rounded-circle"
//                     width={64}
//                   />
//                 </p>
//                 <h4 className="m-0">{author?.name} {author?.surname}</h4>
//                 <p className="lh-1">
//                   <small className="text-muted">{author?.headLine}</small>
//                 </p>
//                 <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start">
//                   <a
//                     href="teacher-profile.html"
//                     className="btn btn-outline-primary mb-16pt mb-sm-0 mr-sm-16pt"
//                   >
//                     Follow
//                   </a>
//                   <a
//                     href="teacher-profile.html"
//                     className="btn btn-outline-secondary"
//                   >
//                     View Profile
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>



//       {/* // END drawer-layout__content */}
//     </>

//   )
}
