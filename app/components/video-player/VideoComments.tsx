import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { Dispatch, SetStateAction } from 'react';
import { ISection } from '../../interfaces/courses';
import IComment from '../../interfaces/comment';


interface VideoCommentsProps {
    isCommenting : boolean 
loggedInUserName : string
comment : string
setComment : Dispatch<SetStateAction<string>>
setIsCommenting : Dispatch<SetStateAction<boolean>>
handleSubmit : () => void 
sections : ISection[]
comments : IComment[]
}

const VideoComments = ({isCommenting,
    loggedInUserName,
    comment,
    setComment,
    setIsCommenting,
    handleSubmit,
    comments,
    sections}:VideoCommentsProps) => {
  return (
    <>
    <div  id="commentsContainer" className={`comment-container ${!isCommenting && "hide-input-border"}`}>

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
    </>
  )
}

export default VideoComments
