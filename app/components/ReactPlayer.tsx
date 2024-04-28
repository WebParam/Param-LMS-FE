"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactPlayer from "react-player";
import "./react-player.css";
import { ISection, IVideo } from "@/app/interfaces/courses";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { IoPersonSharp } from "react-icons/io5";
import Cookies from "universal-cookie";
import { Api } from "../lib/restapi/endpoints";
import { IResponseObject } from "../lib/restapi/response";
import IComment from "../interfaces/comment";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import VideoTranscript from "./transcript/VideoTranscript";

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

  const today = new Date();
  const year = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  let hours: number | string = today.getHours();
  let minutes: number | string = today.getMinutes();
  let seconds: number | string = today.getSeconds();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const todayDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const handleSubmit = async (e: any) => {
    setIsCommentCreated(false);
    e.preventDefault();
    const commentPayload = {
      title: "Sample Comment",
      message: comment,
      creatingUser: loogedInUser?.id,
      createdDate: todayDateTime,
      modifyingUser: loogedInUser?.id,
      modifiedDate: todayDateTime,
      referenceId: videoId,
      type: 1,
      state: 0,
      replies: [],
      creatingUserName: loogedInUser?.firstName + " " + loogedInUser?.lastName,
    };

    const postComment = await Api.POST_AddComment(commentPayload);
    if (postComment.data?.id) {
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
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });

    setComments(videoComments);
  };

  useEffect(() => {
    getVideoComments();
  }, [videoId, isCommentCreated]);

  function timeToSeconds(timestamp: any) {
    const timeParts = timestamp.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const handleTimestampClick = (time: any) => {
    const seconds = timeToSeconds(time);
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, "seconds");
    }
  };

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

        <div
          className={HideSidebar ? "details" : "full-screen"}
          style={{ fontSize: "large" }}
        >
          <h4>{video?.title}</h4>
          <Tabs style={{ width: "100%" }}>
            <TabList default={false}>
              <div className="tabs_header-container">
                <Tab>Overview</Tab>
                <Tab>Transcipt</Tab>
                <Tab>Comments</Tab>
              </div>
            </TabList>

            <TabPanel>{video?.description}</TabPanel>
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
              <div
                id="commentsContainer"
                className={`comment-container ${
                  !isCommenting && "hide-input-border"
                }`}
              >
                <div className="loogedInUser-comment">
                  <div className="person-container">
                    <IoPersonSharp />{" "}
                    <span className="username">{loggedInUserName}</span>
                  </div>

                  <div className="comment-box">
                    <textarea
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        if (e.target.value.length > 0) {
                          setIsCommenting(true);
                        } else {
                          setIsCommenting(false);
                        }
                      }}
                      className="comment-input"
                      placeholder={
                        comments.length > 0
                          ? "Add comments"
                          : "No comments yet, but your classmates might have questions too! Leave a comment to start a discussion and help each other out."
                      }
                    />
                    <hr
                      style={{
                        position: "relative",
                        bottom: "0.5em",
                      }}
                    />
                  </div>

                  <div
                    className={`btn-container_icons ${
                      !isCommenting && "hide-btn"
                    }`}
                  >
                    <button
                      onClick={handleSubmit}
                      style={{ cursor: "pointer" }}
                      type="button"
                      className="btn btn-accent "
                    >
                      {" "}
                      Comment
                    </button>
                  </div>
                </div>

                <div className="all-comments-section">
                  <ul>
                    {comments?.length > 0 &&
                      comments.map((c: IComment, index: number) => (
                        <div className="" key={c.id}>
                          <div
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#f5f7fa",
                              fontSize: "large",
                              borderBottom: "1px solid lightgrey",
                              height: "180px",
                            }}
                            className={`accordion__toggle  ${
                              c?.replies.length > 0
                                ? "show-replies"
                                : "videoComments"
                            }`}
                            data-target={`#course-toc-${c.id}`}
                            data-parent="#parent"
                          >
                            <div className="person-container">
                              <IoPersonSharp />{" "}
                              <span className="username">
                                {c?.creatingUserName}
                              </span>
                            </div>

                            <p
                              style={{ fontSize: "small", marginLeft: "20px" }}
                            >
                              {" "}
                              {c.message}
                            </p>

                            <div className="reaction-icons">
                              <p>
                                <FaRegThumbsUp />
                              </p>
                              <p>
                                <FaRegThumbsDown />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </ul>
                </div>

                <span className="description">
                  {sections[0]?.modules[0]?.videos[0].description}
                </span>
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
        Thank you for completing the video, We have attached a quiz to rate your
        understanding of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
    </div>
  );
}

export default VideoPlayer;
