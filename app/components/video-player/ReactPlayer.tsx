"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactPlayer from "react-player";
import "./react-player.css";
import { ISection, IVideo } from "@/app/interfaces/courses";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cookies from "universal-cookie";
import { Api } from "../../lib/restapi/endpoints";
import { IResponseObject } from "../../lib/restapi/response";
import IComment from "../../interfaces/comment";
import VideoComments from "./VideoComments";
import VideoTranscript from "../transcript/VideoTranscript";

interface ReactPlayerProps {
  selectedVideo: string;
  sections: ISection[];
  cancelQuiz: () => void;
  openQuiz: () => void;
  open: boolean;
  videoId: string;
  video: IVideo;
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
  video,
  viewSidebar,
}: ReactPlayerProps) {

  const cookies = new Cookies();
  const loogedInUser = cookies.get("param-lms-user");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [isCommentCreated, setIsCommentCreated] = useState<boolean>(false);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [loggedInUserName, setLoggedInUserName] = useState<string>(
    `${loogedInUser?.firstName} ${loogedInUser?.lastName}`
  );

  
  const handleSubmit = async () => {
    setIsCommentCreated(false);
    const commentPayload = {
      title: video.title,
      message: comment,
      creatingUser: loogedInUser?.id,
      createdDate: new Date().toISOString(),
      modifyingUser: loogedInUser?.id,
      modifiedDate: new Date().toISOString(),
      referenceId: videoId,
      type: 1,
      state: 0,
      replies: [],
      creatingUserName: loogedInUser?.firstName + " " + loogedInUser?.lastName,
    };

    const postComment = await Api.POST_AddComment(commentPayload);
    if (postComment?.data?.id) {
      const updatedComments = [...comments, postComment.data];
      setComments(updatedComments);
      setIsCommentCreated(true);
      setComment("");
    }
  };

  const getVideoComments = async () => {
    setComments([]);
    setComment("");
    var _comment: IResponseObject<IComment>[] =
      await Api.GET_CommentsByReference(videoId);
    var data: IComment[] = _comment.map(
      (comment) => comment.data
    ) as IComment[];
    const videoComments = data.filter(
      (comment) => comment.referenceId === videoId
    );
    videoComments.sort((a, b) => {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    }); 
    setComments(videoComments);
  };

  function timeToSeconds(timestamp:any) {
    const timeParts = timestamp.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
  
    return hours * 3600 + minutes * 60 + seconds;
  }
const handleTimestampClick = (time:any) => {
  if (playerRef.current) {
    playerRef.current.seekTo(timeToSeconds(time), 'seconds');
  }
};

  useEffect(() => {
    getVideoComments();
  }, [videoId, isCommentCreated]);

  return (
    <div style={{ marginBottom: "5em" }}>
      <div className="player-wrapper" style={{ width: "100%" }}>
        <div className="arrow">
          <FaArrowLeft
            onClick={viewSidebar}
            style={
              !HideSidebar
                ? { fontSize: "25px", cursor: "pointer" }
                : { display: "none" }
            }
          />
        </div>
        <ReactPlayer
          url={selectedVideo}
          playing={true}
          controls={true}
          onEnded={handleVideoEnd}
          className="react-player"
          width="100%"
          onDuration={handleDuration}
          height="100%"
          ref={playerRef}
        />
        <span className="description">
          {sections[0]?.modules[0]?.videos[0].description}
        </span>

        <div className={HideSidebar ? "details" : "full-screen"} style={{ fontSize: "large" }}>
          <h4>{video?.title}</h4>
        <Tabs style={{ width: "100%" }}>
            <TabList default={false}>
              <div className="tabs_header-container">
                <Tab>Overview</Tab>
                <Tab>Transcipt</Tab>
                <Tab>Comments</Tab>
              </div>
            </TabList>

       
            <TabPanel>
             {video?.description}
            </TabPanel>
            <TabPanel>
       <VideoTranscript handleTimestampClick={handleTimestampClick} />
            </TabPanel>
            <TabPanel
              className="comments-scroll"
              style={{
                overflowY: "scroll",
                maxHeight: "500px",
                scrollbarColor: "transparent",
                scrollbarWidth: "none",
              }}
            >
             <VideoComments setComment = {setComment} isCommenting={isCommenting} loggedInUserName={loggedInUserName} setIsCommenting={setIsCommenting} sections={sections} comment={comment} comments={comments} handleSubmit={handleSubmit}/>
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
        Thank you for completing the video, We have attached a quiz to rate your
        understanding of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
    </div>
  );
}

export default VideoPlayer;
