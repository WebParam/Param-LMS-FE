"use client"

import IComment from "@/app/interfaces/comment";
import { IVideo } from "@/app/interfaces/courses";
import { formatTimeDifference } from "@/app/lib/formatTimeDifference";
import { getInitials } from "@/app/lib/getInitials";
import { Api } from "@/app/lib/restapi/endpoints";
import { IResponseObject } from "@/app/lib/restapi/response";
import { useState,useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function AllComments(){
const [comments,setComments]=useState<IComment[]>();
const [video,setVideo]=useState<IVideo>();


useEffect(() => {
   const fetchData=async()=>{
    await getComments();
   };
   fetchData();
 }, []);

 const getComments=async ()=>{
  const _video=JSON.parse(localStorage.getItem("comment-video")as any) || null ;
  console.log(_video.id);
  var _comment:IResponseObject<IComment>[]= await Api.GET_CommentsByReference(_video?.id);
  var data:IComment[]=_comment.map((comment) => comment.data) as IComment[];
  setComments(data);
  localStorage.setItem("comments",JSON.stringify(data));
}

 const goToCommentDetails=(Comment:IComment)=> {
  localStorage.setItem("comment",JSON.stringify(Comment));
  //window.location.href="/protected/student/Comments/comment-details";
 }
    return (
        <div>
          <div className="border-bottom-2 py-32pt position-relative z-1">
            <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
              <div className="flex d-flex flex-column flex-sm-row align-items-center">
                <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                  <h2 className="mb-0">Discussions</h2>
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
          <div className="container-fluid page__container">
            <div className="page-section">
              <div className="page-separator">
                <div className="page-separator__text">Discussions</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center" style={{whiteSpace: 'nowrap'}}>
                    <div className="col-lg-auto">
                      <form className="search-form search-form--dark d-lg-inline-flex mb-8pt mb-lg-0" action="discussions.html">
                        <input type="text" className="form-control w-lg-auto" placeholder="Search discussions" />
                        <button className="btn" type="submit" role="button"><i className="material-icons">search</i></button>
                      </form>
                    </div>
                    <div className="col-lg d-flex flex-wrap align-items-center">
                      <div className="ml-lg-auto dropdown">
                        {/* <a href="#" className="btn btn-link dropdown-toggle text-70" data-toggle="dropdown">All Topics</a> */}
                        {/* <div className="dropdown-menu dropdown-menu-right">
                          <a href="" className="dropdown-item active">All Topics</a>
                          <a href="" className="dropdown-item">My Topics</a>
                        </div> */}
                      </div>
                      {/* <div className="dropdown mr-8pt">
                        <a href="#" className="btn btn-link dropdown-toggle text-70" data-toggle="dropdown">Newest</a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a href="" className="dropdown-item active">Newest</a>
                          <a href="" className="dropdown-item">Unanswered</a>
                        </div>
                      </div> */}
                      <a href="/protected/student/Comments/add-comment" className="btn btn-accent">Ask a question</a>
                    </div>
                  </div>
                </div>
                <div className="list-group list-group-flush">
                 {comments?.map((comment)=>(
                   <div className="list-group-item p-3">
                   <div className="row align-items-start">
                     <div className="col-md-3 mb-8pt mb-md-0">
                       <div className="media align-items-center">
                         <div className="media-left mr-8pt">
                           <a href="" className="avatar avatar-32pt">
                            {/* <img src="assets/images/people/110/guy-1.jpg" alt="avatar" className="avatar-img rounded-circle" /> */}
                            <span className="avatar-title rounded-circle">{getInitials(comment?.creatingUserName)}</span>
                            </a>
                         </div>
                         <div className="d-flex flex-column media-body media-middle">
                           <a href="" className="text-body"><strong>{comment.creatingUserName}</strong></a>
                           <small className="text-muted">{formatTimeDifference(comment.createdDate)}</small>
                         </div>
                       </div>
                     </div>
                     <div className="col mb-8pt mb-md-0">
                       <p className="mb-8pt"><a href="/protected/student/Comments/comment-details" onClick={()=>goToCommentDetails(comment)} className="text-body"><strong>{comment.title}</strong></a></p>
                       {cookies.get(comment.referenceId)&&(
                        <a href="discussion.html" className="chip chip-outline-secondary">{cookies.get(comment.referenceId).title}</a>
                       )}
                     </div>
                     <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                       <h5 className="m-0">{comment?.replies?.length??0}</h5>
                       <p className="lh-1 mb-0"><small className="text-70">answers</small></p>
                     </div>
                   </div>
                 </div>
                 ))}
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
                  </div> */}
                  {/* <div className="list-group-item p-3">
                    <div className="row align-items-start">
                      <div className="col-md-3 mb-8pt mb-md-0">
                        <div className="media align-items-center">
                          <div className="media-left mr-8pt">
                            <a href="" className="avatar avatar-32pt"><img src="assets/images/people/110/woman-1.jpg" alt="avatar" className="avatar-img rounded-circle" /></a>
                          </div>
                          <div className="d-flex flex-column media-body media-middle">
                            <a href="" className="text-body"><strong>Emilie Howard</strong></a>
                            <small className="text-muted">4 days ago</small>
                          </div>
                        </div>
                      </div>
                      <div className="col mb-8pt mb-md-0">
                        <p className="mb-0"><a href="discussion.html" className="text-body"><strong>Using Angular HttpClientModule instead of HttpModule</strong></a></p>
                      </div>
                      <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                        <h5 className="m-0">1</h5>
                        <p className="lh-1 mb-0"><small className="text-70">answers</small></p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="list-group-item p-3">
                    <div className="row align-items-start">
                      <div className="col-md-3 mb-8pt mb-md-0">
                        <div className="media align-items-center">
                          <div className="media-left mr-8pt">
                            <a href="" className="avatar avatar-32pt"><img src="assets/images/people/110/guy-3.jpg" alt="avatar" className="avatar-img rounded-circle" /></a>
                          </div>
                          <div className="d-flex flex-column media-body media-middle">
                            <a href="" className="text-body"><strong>Jason Klein</strong></a>
                            <small className="text-muted">6 days ago</small>
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
                <div className="card-body text-center">
                  {/* <a href="" className="text-70 text-underline">View more discussions</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}