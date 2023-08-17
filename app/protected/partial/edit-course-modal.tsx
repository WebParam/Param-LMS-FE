"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlus } from "react-icons/fa";

interface EditCourseModalProps {
  onClose: () => any;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  onClose,
}) => {
  const [content, setContent] = useState("");
  const [showVideoInputUrl, setShowVideoInputUrl] = useState(false);
  const [showVideoInputTitle, setShowVideoInputTitle] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([])
  const [viewVideo, setViewVideo] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");


  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const selectedVideo = (url:string) => {
    setCurrentVideoUrl("")
    setViewVideo(true)
    setCurrentVideoUrl(url)
  }

  const AddVideo = () => {
    const video = {
      title :videoTitle,
      url : videoUrl
    }

    setVideos([...videos,video]);
    setShowVideoInputUrl(false)
    setVideoTitle("")
    setVideoUrl("");
  }

  return (
    <div
      className="mdk-drawer-layout js-mdk-drawer-layout"
      data-push=""
      data-responsive-width="992px"
      data-domfactory-upgraded="mdk-drawer-layout"
    >
      <div
        className="mdk-drawer-layout__content page-content"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">Edit Module</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Module</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section border-bottom-2">
          <div className="container page__container">
            <div className="row">
              <div className="col-md-8">
                <div className="page-separator">
                  <div className="page-separator__text">Basic information</div>
                </div>
                <label className="form-label">Module title</label>
                <div className="form-group mb-24pt">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Module Title"
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">module title guideline</a>
                  </small>
                </div>
                <label className="form-label">Module Description</label>
                <div style={{ height: "150px" }}>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="description...."
                    modules={modules}
                  />
                </div>

                <div className="page-separator">
                  <div className="page-separator__text">Videos</div>
                </div>
                <div
                
                      className="accordion js-accordion accordion--boxed mb-24pt"
                      id="parent"
                      data-domfactory-upgraded="accordion"
                    >{videos.length >  0 && <>
                {videos.map((video:any, index:number )=>
           

                <p style = {{cursor: "pointer", borderBottom: "1px solid lightgray"}}onClick = {() => selectedVideo(video.url)}>{video.title}</p>

                  
                    )}
                </>}
                </div>

                <div>
                <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <label className="form-label">Title</label>
                    <FaPlus onClick = {() => setShowVideoInputTitle(!showVideoInputTitle)}/>
                  </div>

                  {showVideoInputTitle && <>        <input
       onChange={(e) => setVideoTitle(e.target.value)}
                    id="flatpickrSample04"
                    type="text"
                    className="form-control"
                    placeholder="video title"
                    data-toggle="flatpickr"
                    data-flatpickr-enable-time="true"
                    data-flatpickr-alt-format="F j, Y at H:i"
                    data-flatpickr-date-format="Y-m-d H:i"
                  /></>}
                </div>
         
          
                <div className="form-group pt-2">
                  <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <label className="form-label">URL</label>
                    <FaPlus onClick = {() => setShowVideoInputUrl(!showVideoInputUrl)}/>
                  </div>

{showVideoInputUrl && <>        <input
       onChange={(e) => setVideoUrl(e.target.value)}
                    id="flatpickrSample04"
                    type="text"
                    className="form-control"
                    placeholder="video url"
                    data-toggle="flatpickr"
                    data-flatpickr-enable-time="true"
                    data-flatpickr-alt-format="F j, Y at H:i"
                    data-flatpickr-date-format="Y-m-d H:i"
                  /></>}
          
                </div>

                <a
                onClick = {AddVideo}
                  href="#"
                  className="btn btn-outline-secondary mb-24pt mb-sm-0"
                >
                  save Video
                </a>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header text-center">
                    <a onClick = {() => onClose()} href="#" className="btn btn-accent">
                      Save changes
                    </a>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex">
                      <a className="flex" href="#">
                        <strong>Save Draft</strong>
                      </a>
                      <i className="material-icons text-muted">check</i>
                    </div>
                    <div className="list-group-item">
                      <a href="#" className="text-danger">
                        <strong>Delete Course</strong>
                      </a>
                    </div>
                  </div>
                </div>
                {viewVideo &&   <div className="page-separator">
                  <div className="page-separator__text">Video</div>
                </div>}
             { viewVideo &&   <div className="card">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      src="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                      //   allowFullScreen=""
                    />
                  </div>
                  <div className="card-body">
                    <label className="form-label">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentVideoUrl}
                      placeholder="Enter Video URL"
                    />
                    <small className="form-text text-muted">
                      Enter a valid video URL.
                    </small>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
        {/* // END Page Content */}
      </div>
    </div>
  );
};
