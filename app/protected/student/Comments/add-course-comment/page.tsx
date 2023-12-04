"use client"
import { ToastContainer, toast } from 'react-toastify';
import IComment from "@/app/interfaces/comment";
import { ICourse, IVideo } from "@/app/interfaces/courses";
import { IUser, IUserRegisterModel } from "@/app/interfaces/user";
import { getAuthor } from "@/app/lib/getAuthor";
import { Api } from "@/app/lib/restapi/endpoints";
import { useState,useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AddCourseComment(){
  const [description,setDescription]=useState<string>();
  const [user,setUser]=useState<IUserRegisterModel>();
  const [author,setAuthor]=useState<IUser>();
  const [course,setCourse]=useState<any>();

  useEffect(()=>{
    const _user=cookies.get("param-lms-user");
    setUser(_user);
    console.log("user", _user)
    const localCourse =JSON.parse(localStorage.getItem("add-course-comment")as any) || null;
    setCourse(localCourse);
    var _author:any =getAuthor(localCourse.creatingUser);
    setAuthor(_author);
  },[]);


const handleNewComment=async ()=>{
    const localCourse =JSON.parse(localStorage.getItem("add-course-comment")as any) || null;
    console.log(localCourse);
  if(user&&course){
    debugger;
    const newComment: IComment = {
      id: '',
      title: `${user.firstName} ${user.lastName}'s feedback on ${course?.title}`,
      message:description??"" ,
      creatingUser:user?.id??"" ,
      createdDate: new Date().toISOString(),
      modifyingUser: '',
      modifiedDate: new Date().toISOString(),
      referenceId: course?.id??"",
      type: 0,
      state: 0,
      replies: [],
      creatingUserName: user?.firstName + " " + user?.lastName
    };
    debugger;  
    var response =await Api.POST_AddComment(newComment);
    if(response.data)
    {
      window.location.href="/protected/student/course/course-detail";
    }
    
  }
}
  
    return (
        <div>
          <div className="border-bottom-2 py-32pt position-relative z-1">
            <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
              <div className="flex d-flex flex-column flex-sm-row align-items-center">
                <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                  <h2 className="mb-0">Happy Customer Stories</h2>
                  <ol className="breadcrumb p-0 m-0">
                    <li className="breadcrumb-item"><a href="/protected/student/course/all-courses">Home</a></li>
                    <li className="breadcrumb-item active">
                      Community
                    </li>
                  </ol>
                </div>
                {/* <div className="dropdown">
                  <a href="" className="border rounded d-flex align-items-center p-16pt" data-toggle="dropdown" data-caret="false">
                    <div className="avatar avatar-sm mr-8pt">
                      <span className="avatar-title rounded bg-primary">FM</span>
                    </div>
                    <small className="ml-4pt flex">
                      <span className="d-flex align-items-center">
                        <span className="flex d-flex flex-column">
                          <strong className="text-100">FrontendMatter Inc.</strong>
                          <span className="text-50">Select company</span>
                        </span>
                        <i className="material-icons icon-16pt text-50 ml-4pt">arrow_drop_down</i>
                      </span>
                    </small>
                  </a>
                  <div className="dropdown-menu w-100">
                    <div className="dropdown-header"><strong>Select company</strong></div>
                    <a href="" className="dropdown-item active d-flex align-items-center">
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
                    <a href="" className="dropdown-item d-flex align-items-center">
                      <div className="avatar avatar-sm mr-8pt">
                        <span className="avatar-title rounded bg-accent">HH</span>
                      </div>
                      <small className="ml-4pt flex">
                        <span className="d-flex flex-column">
                          <strong className="text-black-100">HumaHuma Inc.</strong>
                          <span className="text-black-50">Publisher</span>
                        </span>
                      </small>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <nav className="navbar navbar-expand-sm navbar-list border-bottom-2  py-sm-16pt">
            <div className="container-fluid page__container">
              <ul className="nav navbar-nav w-100">
                <li className="nav-item navbar-list__item py-16pt py-sm-0">
                  <a href="/protected/student/course/video" className="nav-link"><i className="material-icons icon--left">keyboard_backspace</i> Back to Course</a>
                </li>
                <li className="nav-item navbar-list__item py-16pt py-sm-0">
                  <div className="media">
                    <div className="media-left mr-16pt">
                      <a href="/protected/student/course/course-details"><span className="material-icons">play_circle_outline</span></a>
                    </div>
                    <div className="media-body">
                      <a href="" className="card-title text-body mb-0">{course?.title}</a>
                      <p className="lh-1 d-flex align-items-center mb-0">
                        <span className="text-50 small font-weight-bold mr-8pt">{author?.name} {author?.surname}</span>
                        <span className="text-50 small">{author?.headLine}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid page__container">
            <form action="discussions.html">
              <div className="row">
                <div className="col-lg-9">
                  <div className="page-section">
                    <h4>Spread the Positivity</h4>
                    <div className="card--connect pb-32pt pb-lg-64pt">
                      <div className="card o-hidden mb-0">
                        <div className="card-body table--elevated">
                          <div className="form-group m-0" role="group" aria-labelledby="label-title">
                            <div className="form-row align-items-center">
                              <label id="label-title" htmlFor="title" className="col-md-3 col-form-label form-label">Leave a Star Rating</label>
                              <div className="col-md-9">
                                <input id="title" type="number" placeholder="Your Rating (out of 5)" max={5} min={1} className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                       {/* {comments&&(
                         <div className="card-header bg-transparent">
                         <h5 className="text-uppercase mb-0">Similar questions</h5>
                       </div>
                       )} */}
                        {/* <div className="list-group list-group-flush">
                          {
                            comments?.slice(0,2).map((comment)=>(
                              <div className="list-group-item p-3">
                            <div className="row align-items-start">
                              <div className="col-md-3 mb-8pt mb-md-0">
                                <div className="media align-items-center">
                                  <div className="media-left mr-8pt">
                                    <a href="" className="avatar avatar-32pt"><img src="assets/images/people/110/guy-1.jpg" alt="avatar" className="avatar-img rounded-circle" /></a>
                                  </div>
                                  <div className="d-flex flex-column media-body media-middle">
                                    <a href="" className="text-body"><strong>{comment.creatingUserName}</strong></a>
                                    <small className="text-muted">{formatTimeDifference(comment.createdDate)}</small>
                                  </div>
                                </div>
                              </div>
                              <div className="col mb-8pt mb-md-0">
                                <p className="mb-8pt"><a href="discussion.html" className="text-body"><strong>{comment.title}</strong></a></p>
                                <a href="discussion.html" className="chip chip-outline-secondary">{video?.title}</a>
                              </div>
                              <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                                <h5 className="m-0">{comment.replies.length}</h5>
                                <p className="lh-1 mb-0"><small className="text-70">answers</small></p>
                              </div>
                            </div>
                          </div>
                            )
                          )}
                          {/* <div className="list-group-item p-3">
                            <div className="row align-items-start">
                              <div className="col-md-3 mb-8pt mb-md-0">
                                <div className="media align-items-center">
                                  <div className="media-left mr-8pt">
                                    <a href="" className="avatar avatar-32pt"><img src="assets/images/people/110/guy-2.jpg" alt="avatar" className="avatar-img rounded-circle" /></a>
                                  </div>
                                  <div className="d-flex flex-column media-body media-middle">
                                    <a href="" className="text-body"><strong>Adam Curtis</strong></a>
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
                          </div> 
                        </div> */}
                      </div>
                    </div>
                    <div className="list-group">
                      <div className="list-group-item">
                        <div role="group" aria-labelledby="label-question" className="m-0 form-group">
                          <div className="form-row">
                            <label id="label-question" htmlFor="question" className="col-md-3 col-form-label form-label">EXPERIENCE DETAILS</label>
                            <div className="col-md-9">
                              <textarea
                               onChange={(e)=>{
                                setDescription(e.target.value);
                                console.log(description);
                               }
                                }
                               id="question" placeholder="Share more about your experience..." rows={6} className="form-control" defaultValue={""} />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="list-group-item">
                        <div className="form-group m-0" role="group" aria-labelledby="label-topic">
                          <div className="form-row align-items-center">
                            <label id="label-topic" htmlFor="topic" className="col-md-3 col-form-label form-label">Topic</label>
                            <div className="col-md-9">
                              <select id="topic" className="form-control custom-select w-auto">
                                <option value="JavaScript">JavaScript</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="list-group-item">
                        <div className="custom-control custom-checkbox custom-control-inline">
                          <input id="notify" type="checkbox" className="custom-control-input" defaultChecked />
                          <label htmlFor="notify" className="custom-control-label">Notify me on email when someone replies to my question</label>
                        </div>
                        <small id="description-notify" className="form-text text-muted">If unchecked, you'll still recieve notifications on our website.</small>
                      </div> */}
                      <div className="list-group-item">
                        <button type="button" onClick={handleNewComment} className="btn btn-accent">Share Feedback</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 page-nav">
                  <div data-perfect-scrollbar data-perfect-scrollbar-wheel-propagation="true">
                    <div className="page-section pt-lg-112pt">
                      <div className="nav page-nav__menu">
                        <a href="javascript:void(0)" className="nav-link active">Before you submit</a>
                      </div>
                      <div className="page-nav__content">
                        <p className="text-70">Please take a moment to ensure your feedback is constructive and helpful. Your insights contribute to our continuous improvement.</p>
                        <p className="text-70">Thank you for sharing your thoughts!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
}