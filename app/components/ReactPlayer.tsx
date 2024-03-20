"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactPlayer from "react-player";
import "./react-player.css";
import { ISection } from "@/app/interfaces/courses";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getSelectedCourseForEdit } from "../redux/courseSlice";
import Cookies from "universal-cookie";
import { Api } from "../lib/restapi/endpoints";
import { IResponseObject } from "../lib/restapi/response";
import IComment, { ICommentReply } from "../interfaces/comment";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { BsReply } from "react-icons/bs";

interface ReactPlayerProps {
  selectedVideo: string;
  sections: ISection[];
  cancelQuiz: () => void;
  openQuiz: () => void;
  open: boolean;
  videoId: string;
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
  const [replyCommentId, setReplyCommentId] = useState<string>("");
  const [selectedComment, setselectedComment] = useState<IComment>();
  const [commentReply, setCommentReply] = useState<string>("");
  const [commentReplies, setCommentReplies] = useState<IComment[]>([])   
  const [enableComment, setEnableComment] = useState<boolean>(false) ;

  const selectCommentForReply = (comment: IComment) => {
    setReplyCommentId(comment?.id!);
    setselectedComment(comment);
    setEnableComment(true)
  };

  const today = new Date();
  const year = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  const todayDate = `${year}-${month}-${day}`;

  const handleSubmit = async (e: any) => {
    setIsCommentCreated(false);
    e.preventDefault();
    const commentPayload = {
      title: "Sample Comment",
      message: comment,
      creatingUser: loogedInUser?.id,
      createdDate: todayDate,
      modifyingUser: loogedInUser?.id,
      modifiedDate: todayDate,
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

  const getCommentReplies = async (commentId:string) => {

    setReplyCommentId("")
    setCommentReplies([])
    setEnableComment(false)
    var _comment: IResponseObject<IComment>[] =
      await Api.GET_CommentsByReference(commentId);
    var data: IComment[] = _comment.map(
      (comment) => comment.data
    ) as IComment[];
    const commentReplies = data.filter(
      (comment) => comment.referenceId === commentId
    );
    setCommentReplies(commentReplies)
    setReplyCommentId(commentReplies[0]?.referenceId)
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
    setComments(videoComments);
  };


  const PostCommentReply = async () => {
    const commentPayload: ICommentReply = {
      comment: selectedComment!,
      reply: {
        title: "Sample Comment",
        message: commentReply,
        creatingUser: loogedInUser?.id,
        createdDate: todayDate,
        modifyingUser: loogedInUser?.id,
        modifiedDate: todayDate,
        referenceId: selectedComment?.id!,
        type: 1,
        state: 0,
        replies: [],
        creatingUserName:
          loogedInUser?.firstName + " " + loogedInUser?.lastName,
      },
    };

    const postComment = await Api.POST_AddCommentReply(commentPayload);
    if (postComment.data?.id) {
      setCommentReply("");
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

        <div className="details" style={{ fontSize: "large" }}>
          <h2>{sections[0]?.modules[0]?.videos[0].title}</h2>

          <Tabs style={{ width: "100%" }}>
            <TabList default={false}>
              <div className="tabs_header-container">
                <Tab>Overview</Tab>
                <Tab>Transcipt</Tab>
                <Tab>Notes</Tab>
                <Tab>Comments</Tab>
              </div>
            </TabList>

            <TabPanel className="instructor">
              <p className="instructor">
                {sections[0]?.modules[0]?.videos[0].description &&
                  "Instructor: John Smith"}
              </p>
              <p className="description">
                {sections[0]?.modules[0]?.videos[0].description}
              </p>
            </TabPanel>
            <TabPanel>
              <p className="instructor">
                {sections[0]?.modules[0]?.videos[0].description &&
                  "Instructor: John Smith"}
              </p>
              <p className="description">
                {sections[0]?.modules[0]?.videos[0].description}
              </p>
            </TabPanel>
            <TabPanel>
              <p className="instructor">
                {sections[0]?.modules[0]?.videos[0].description &&
                  "Instructor: John Smith"}
              </p>
              <p className="description">
                {sections[0]?.modules[0]?.videos[0].description}
              </p>
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


{
  comments?.length > 0 &&
  comments.map((c: IComment, index: number) => (
  <div className="" key={c.id}>
  <div
    style={{
      cursor: "pointer",
      backgroundColor: "#f5f7fa",
      fontSize: "large",
      borderBottom: "1px solid lightgrey",
        height:"180px"
    }}

    className={`accordion__toggle  ${
      c?.replies.length > 0 ? "show-replies" : "videoComments"
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

                          <p style={{ fontSize: "small", marginLeft: "20px" }}>
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
                            <p
                              onClick={() => selectCommentForReply(c)}
                              className="reply-text"
                            >
                              <BsReply style={{ fontSize: "x-large" }} />
                            </p>

                          </div>
  </div>

  <div
  style={{marginTop:"3em"}}
    className={`accordion__menu collapse ${
      replyCommentId === c?.id && enableComment ? "show" : ""
    }`}
    id={`course-toc-${c.id}`}
  >
  {replyCommentId === c?.id && (
                            <div className="reply-container">
                              <div>
                                <IoPersonSharp />
                              </div>
                              <div>
                                <textarea
                                  value={commentReply}
                                  onChange={(e) => {
                                    setCommentReply(e.target.value);
                                  }}
                                  className="reply-comment-input"
                                  placeholder="Add comments"
                                />
                              </div>
                            </div>
                          )}

                          {replyCommentId === c?.id && (
                            <div className="reply-btn">
                              <button
                                onClick={() => setReplyCommentId("")}
                                style={{ cursor: "pointer" }}
                                type="button"
                                className="btn btn-accent cancel-btn"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={PostCommentReply}
                                style={{ cursor: "pointer" }}
                                type="button"
                                className="btn btn-accent"
                              >
                                Reply
                              </button>
                            </div>
                          )}

</div>


  <div
    className={`accordion__menu collapse ${
      replyCommentId === c?.id  ? "show" : ""
    }`}
    id={`course-toc-${c.id}`}
  >
    {commentReplies?.length > 0 && commentReplies[0].referenceId === c?.id &&
                      commentReplies.map((comment: IComment, index: number) => (
                        <li
                          className={`storage-comments ${
                            replyCommentId === c?.id && ""
                          }`}
                          key={index}
                        >
                          <div className="person-container">
                            <IoPersonSharp />{" "}
                            <span className="username">
                              {comment?.creatingUserName}
                            </span>
                          </div>

                          <p style={{ fontSize: "small", marginLeft: "20px" }}>
                            {" "}
                            {comment.message}
                          </p>

                          <div className="reaction-icons">
                            <p>
                              <FaRegThumbsUp />
                            </p>
                            <p>
                              <FaRegThumbsDown />
                            </p>
                         
                          </div>
                          
                          <p className="reply-count" onClick={() => getCommentReplies(c?.id!)}>
                               {comment.replies.length > 0 && `${comment.replies.length} replies` }
                            </p>
                      
                        </li>
                      ))}
  </div>


  <p className="reply-count" onClick={() => getCommentReplies(c?.id!)}>  {c.replies.length > 0 && `${c.replies.length} replies` }</p>

  </div>
  ))
}
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

