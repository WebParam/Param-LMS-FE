"use client";
import IComment, { ICommentReply } from "@/app/interfaces/comment";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getTop5Commenters } from "../topContributors";
import { formatTimeDifference } from "@/app/lib/formatTimeDifference";
import { Api } from "@/app/lib/restapi/endpoints";
import { IResponseObject } from "@/app/lib/restapi/response";
import { IUser, IUserRegisterModel } from "@/app/interfaces/user";
const cookies = new Cookies();
export default function commentDetails(){

    const [comment,setComment]=useState<IComment>();
    const [replies,setReplies]=useState<IComment[]>();
    const [topCommenters,setTopCommeters]=useState<[string,number][]>();
    const [newComment,setNewComment] = useState<string>();
    const [user,setUser]=useState<IUserRegisterModel>();

    useEffect(() => {
        var _comment:IComment=JSON.parse(localStorage.getItem("comment")as any) || null ;
        var _comments=JSON.parse(localStorage.getItem("comments")as any) || null ;
        setTopCommeters(getTop5Commenters(_comments));
        setComment(_comment);
        setUser(cookies.get("param-lms-user"));
        getReplies(_comment?.id);
       }, []);

const handleAddNewComment=(e:any)=>{
  setNewComment(e.target.value);
}

const handlePostNewComment=async ()=>{
  if(comment){
    const reply: IComment = {
      id: '',
      title: `Reply to ${comment?.creatingUserName}'s comment on the ${new Date().toUTCString()}`,
      message: newComment??'',
      creatingUser: user?.id??'',
      createdDate: new Date().toISOString(),
      modifyingUser: '',
      modifiedDate: new Date().toISOString(),
      referenceId: comment?.id??'',
      type: 0,
      state: 0,
      replies: [],
      creatingUserName: comment?.creatingUserName??"commenter's name",
    };
    const CommentReply:ICommentReply={
      reply:reply,
      comment:comment
     }
     var response:IResponseObject<IComment>= await Api.POST_AddCommentReply(CommentReply);
     debugger;
     setComment(response?.data);
     window.location.reload();
  }

  }

const getReplies=async(reference:string)=>{
  var response:IResponseObject<IComment>[] =await Api.GET_CommentsByReference(reference);
  var data:any=response.map((data)=>data.data);
  if(data)
  {
    setReplies(data);
  }
 
}
    return (
        <div>
          <div className="border-bottom-2 py-32pt position-relative z-1">
            <div className="container-fluid page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
              <div className="flex d-flex flex-column flex-sm-row align-items-center">
                <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                  <h2 className="mb-0">Discussion</h2>
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
              <div className="row">
                <div className="col-md-8">
                  <h1 className="h3 mb-2">{comment?.title}</h1>
                  <p className="text-muted d-flex align-items-center mb-lg-32pt">
                    <a href="/protected/student/Comments/all-comments" className="mr-3">Back to Community</a>
                    <a href="#" className="mr-2 text-50">Mute</a>
                    <a href="#" className="mr-2 text-50">Report</a>
                    <a href="#" className="text-50" style={{textDecoration: 'underline'}}>Edit</a>
                  </p>
                  <div className="card card-body">
                    <div className="d-flex">
                      <a href="" className="avatar avatar-32pt avatar-online mr-12pt">
                        <img src="assets/images/people/256/256_rsz_nicolas-horn-689011-unsplash.jpg" alt="people" className="avatar-img rounded-circle" />
                      </a>
                      <div className="flex">
                        <p className="d-flex align-items-center mb-2">
                          <a href="" className="text-body mr-2"><strong>{comment?.creatingUserName}</strong></a>
                          {comment&&(
                              <small className="text-muted">{formatTimeDifference(comment.createdDate)}</small>
                          )}
                        
                        </p>
                        <p>{comment?.message}</p>
                      
                        <div className="d-flex align-items-center">
                          <a href="" className="text-50 d-flex align-items-center text-decoration-0"><i className="material-icons mr-1" style={{fontSize: 'inherit'}}>favorite_border</i> 30</a>
                          <a href="" className="text-50 d-flex align-items-center text-decoration-0 ml-3"><i className="material-icons mr-1" style={{fontSize: 'inherit'}}>thumb_up</i> 130</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-4">
                    <a href="" className="avatar avatar-32pt mr-8pt">
                      <img src="assets/images/people/50/guy-6.jpg" alt="people" className="avatar-img rounded-circle" />
                    </a>
                    <div className="flex">
                      <div className="form-group">
                        <label htmlFor="comment" className="form-label">Your reply</label>
                        <textarea 
                        onChange={handleAddNewComment}
                        value={newComment}
                        className="form-control" name="comment" id="comment" rows={3} placeholder="Type here to reply to Matney ..." defaultValue={""} />
                      </div>
                      <button onClick={handlePostNewComment} className="btn btn-accent">Post comment</button>
                    </div>
                  </div>
                 {replies&&replies.length>0&&(
                  <div className="pt-3">
                    <h4>{replies.length} Comments</h4>
                    {/* <div className="d-flex mb-3">
                      <a href="" className="avatar avatar-32pt mr-8pt">
                        <img src="assets/images/people/256/256_rsz_karl-s-973833-unsplash.jpg" alt="people" className="avatar-img rounded-circle" />
                      </a>
                      <div className="flex">
                        <a href="" className="text-body"><strong>Joseph S. Ferland</strong></a>
                        <span className="text-70">How can I load Charts on a page?</span><br />
                        <span className="text-50">on <a href="" className="text-50" style={{textDecoration: 'underline'}}>Data Visualization With Chart.js</a></span><br />
                        <div className="d-flex align-items-center">
                          <small className="text-50 mr-2">27 min ago</small>
                          <a href="" className="text-50"><small>Liked</small></a>
                        </div>
                      </div>
                    </div> */}
                    {replies.map((reply)=>(
                    <div className="ml-sm-32pt mt-3 card p-3">
                      <div className="d-flex">
                        <a href="#" className="avatar avatar-32pt mr-8pt">
                          <img src="assets/images/people/110/guy-6.jpg" alt="Guy" className="avatar-img rounded-circle" />
                        </a>
                        <div className="flex">
                          <div className="d-flex align-items-center">
                            <a href="" className="text-body"><strong>{reply.creatingUserName}</strong></a>
                            <small className="ml-auto text-muted">{formatTimeDifference(reply.createdDate)}</small>
                          </div>
                          <p className="mt-1 text-70">{reply.message}</p>
                          <div className="d-flex align-items-center">
                            <a href="" className="text-50 d-flex align-items-center text-decoration-0"><i className="material-icons mr-1" style={{fontSize: 'inherit'}}>favorite_border</i> 3</a>
                            <a href="" className="text-50 d-flex align-items-center text-decoration-0 ml-3"><i className="material-icons mr-1" style={{fontSize: 'inherit'}}>thumb_up</i> 13</a>
                          </div>
                        </div>
                      </div>
                    </div>))}
                  </div>
                 )}  
                </div>
                <div className="col-md-4">
                  <h5 className="text-70">Top Contributors</h5>
                  <p className="text-70 mb-24pt">People who started the most discussions on Huma.</p>
                  <div className="mb-4">
                   {topCommenters?.map((commenter)=>(
                     <div className="d-flex align-items-center mb-2">
                     <a href="" className="avatar avatar-xs mr-8pt">
                       <img src="assets/images/people/50/guy-1.jpg" alt="course" className="avatar-img rounded-circle" />
                     </a>
                     <a href="" className="flex mr-2 text-body"><strong>{commenter[0]}</strong></a>
                     <span className="text-70 mr-2">{commenter[1]}</span>
                     <i className="text-muted material-icons font-size-16pt">forum</i>
                   </div>
                   ))}
                    {/* <div className="d-flex align-items-center mb-2">
                      <a href="" className="avatar avatar-xs mr-8pt">
                        <img src="assets/images/people/50/guy-2.jpg" alt="course" className="avatar-img rounded-circle" />
                      </a>
                      <a href="" className="flex mr-2 text-body"><strong>Magnus Goldsmith</strong></a>
                      <span className="text-70 mr-2">93</span>
                      <i className="text-muted material-icons font-size-16pt">forum</i>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <a href="" className="avatar avatar-xs mr-8pt">
                        <img src="assets/images/people/50/woman-1.jpg" alt="course" className="avatar-img rounded-circle" />
                      </a>
                      <a href="" className="flex mr-2 text-body"><strong>Katelyn Rankin</strong></a>
                      <span className="text-70 mr-2">55</span>
                      <i className="text-muted material-icons font-size-16pt">forum</i>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <a href="" className="avatar avatar-xs mr-8pt">
                        <img src="assets/images/people/256/256_rsz_nicolas-horn-689011-unsplash.jpg" alt="course" className="avatar-img rounded-circle" />
                      </a>
                      <a href="" className="flex mr-2 text-body"><strong>Jenell D. Matney</strong></a>
                      <span className="text-70 mr-2">32</span>
                      <i className="text-muted material-icons font-size-16pt">forum</i>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <a href="" className="avatar avatar-xs mr-8pt">
                        <img src="assets/images/people/256/256_rsz_sharina-mae-agellon-377466-unsplash.jpg" alt="course" className="avatar-img rounded-circle" />
                      </a>
                      <a href="" className="flex mr-2 text-body"><strong>Sherri J. Cardenas</strong></a>
                      <span className="text-70 mr-2">21</span>
                      <i className="text-muted material-icons font-size-16pt">forum</i>
                    </div>
                    <div className="d-flex align-items-center mb-2"> 
                      <a href="" className="avatar avatar-xs mr-8pt">
                        <img src="assets/images/people/256/256_rsz_karl-s-973833-unsplash.jpg" alt="course" className="avatar-img rounded-circle" />
                      </a>
                      <a href="" className="flex mr-2 text-body"><strong>Joseph S. Ferland</strong></a>
                      <span className="text-70 mr-2">16</span>
                      <i className="text-muted material-icons font-size-16pt">forum</i>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}