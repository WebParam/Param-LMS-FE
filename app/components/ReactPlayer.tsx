"use client"
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import "./react-player.css";
import { ISection } from '@/app/interfaces/courses';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { getSelectedCourseForEdit } from '../redux/courseSlice';
import Cookies from "universal-cookie"
import { Api } from '../lib/restapi/endpoints';
import { IResponseObject } from '../lib/restapi/response';
import IComment from '../interfaces/comment';


interface ReactPlayerProps {
  selectedVideo: string;
  sections: ISection[];
  cancelQuiz: () => void;
  openQuiz: () => void;
  open: boolean;
  videoId:string;
  handleVideoEnd: () => void;
  handleDuration: (duration: number) => void;
  HideSidebar: boolean;
  viewSidebar: () => void;
  playerRef: React.MutableRefObject<ReactPlayer | null>;
}

function VideoPlayer({
  playerRef,
  selectedVideo,
  sections,
  cancelQuiz,
  openQuiz,
  open,
  handleVideoEnd,
  videoId,
  handleDuration,
  HideSidebar,
  viewSidebar
}: ReactPlayerProps) {

  const cookies = new Cookies();

  const loogedInUser = cookies.get("param-lms-user")
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any>([]);
const [isCommentCreated, setIsCommentCreated] = useState<boolean>(false)

const today = new Date();
const year = today.getFullYear();
let month: number | string = today.getMonth() + 1;
let day: number | string = today.getDate();
month = month < 10 ? `0${month}` : month;
day = day < 10 ? `0${day}` : day;
const todayDate = (`${year}-${month}-${day}`);


  const handleSubmit = async (e: any) => {

    setIsCommentCreated(false)
    e.preventDefault();
    const commentPayload = {
      title:"Sample Comment",
      message:comment,
      creatingUser:loogedInUser?.id,
      createdDate:todayDate,
      modifyingUser:loogedInUser?.id,
      modifiedDate:todayDate,
      referenceId:videoId,
      type:1,
      state:0,
      replies:[],
      creatingUserName:loogedInUser?.firstName + " " + loogedInUser?.lastName,
    }

    const postComment = await Api.POST_AddComment(commentPayload);
    if(postComment.data?.id){
      const updatedComments = [...comments, postComment.data];
      setComments(updatedComments);
      setIsCommentCreated(true)
      setComment("");
    }
  };
  
  const getVideoComments = async () => {
    setComments([])
    setComment("");
    
    var _comment:IResponseObject<IComment>[]= await Api.GET_CommentsByReference(videoId);
    var data:IComment[]=_comment.map((comment) => comment.data) as IComment[];
    const videoComments = data.filter(comment => comment.referenceId === videoId);
    setComments(videoComments);
  }

  useEffect( () => {
    getVideoComments()
}, [videoId, isCommentCreated]);
 
  
  return (
    <div style={{marginBottom:"5em"}}>
      <div className="player-wrapper" style={{ width: '100%' }}>
        <div className='arrow'>
          <FaArrowLeft onClick={viewSidebar} style={!HideSidebar ? { fontSize: "25px", cursor: "pointer" } : { display: "none" }} />
        </div>
        <ReactPlayer
          url={selectedVideo}
          playing={true}
          controls={true}
          onEnded={handleVideoEnd}
          className="react-player"
          width='100%'
          onDuration={handleDuration}
          height='100%'
          ref={playerRef}
        />
          <span  className="description">{sections[0]?.modules[0]?.videos[0].description}</span>

        <div className="details" style={{ fontSize: "large" }}>
        <h2 >{sections[0]?.modules[0]?.videos[0].title}</h2>



        <Tabs
        
        style={{width: "100%"}}
        >
    <TabList default={false}>
   <div className = "tabs_header-container">
   <Tab>Overview</Tab>
      <Tab 

      >Transcipt</Tab>
      <Tab>Notes</Tab>
      <Tab

      >Comments</Tab>
   </div>
    </TabList>

    <TabPanel
   className="instructor"
    >
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel>
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel>
    <p className="instructor">{sections[0]?.modules[0]?.videos[0].description && "Instructor: John Smith"}</p>
          <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p>
    </TabPanel>
    <TabPanel className="comments-scroll"
    style={{
      overflowY: "scroll",
      maxHeight: "500px", 
      scrollbarColor:"transparent",
      scrollbarWidth:"none",
      
    }}
    >
      <div className='comment-container'>
    

        <div className='loogedInUser-comment'>
        <div className='person-container'>
          
          <IoPersonSharp/> <span style={{fontSize:"small", marginLeft:"5px"}}>Kwanele Ndaba</span>
          </div>

      <div className="comment-box">
      <textarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  className="comment-input"
  placeholder="No comments yet, but your classmates might have questions too! Leave a comment to start a discussion and help each other out."
/>      
<hr

style={{
  position: "relative",
  bottom: "0.5em"
}}
/>
  </div>

        <div className= "btn-container_icons">
    
          <button style={{cursor:"pointer"}} onClick={handleSubmit}>
            Comment
          </button>
        </div>

        </div>



        <div className='all-comments-section'>
        <ul >
          {comments?.length > 0 && comments.map((c:any, index:number) => (
            <li className='storage-comments' key={index}>
               <div className='person-container'>
               <IoPersonSharp/> <span style={{fontSize:"small", marginLeft:"5px"}}>{c?.creatingUserName}</span>
          </div>

              <p style={{fontSize:"small", marginLeft:"20px"}}> {c.message}</p>
            </li>
          ))}
        </ul>
      </div>


      <span  className="description">{sections[0]?.modules[0]?.videos[0].description}</span>

          </div>
    </TabPanel>




  </Tabs>
          
        </div>
      </div>
      <ConfirmationModal
        open={open}
        onConfirm={openQuiz}
        onCancel={cancelQuiz}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the video, We have attached a quiz to rate your understanding of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
    </div>
  )
}

export default VideoPlayer;