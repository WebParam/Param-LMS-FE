"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlus } from "react-icons/fa";
import { addModuleToSection, addVideoToModule, getSelectedCourseForEdit, updateModuleDetail } from "@/app/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { ICourse, IModule, IUpdateModuleDetailState } from "@/app/interfaces/courses";
import { Api } from "@/app/lib/restapi/endpoints";

interface EditCourseModalProps {
  onClose: () => any;
  sectionId : string 
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  onClose,sectionId
}) => {
  const [showVideoInputs, setShowVideoInputs] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([])
  const [courses, setCourses] = useState<any>([])
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const [viewVideo, setViewVideo] = useState<boolean>(false);
  const [moduleId, setModuleId] = useState("");
  const dispatch = useDispatch();
  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;


  const moduleToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  
  // async function ListAllCourses(){
  //   const data = await Api.GET_Courses();
  //   console.log("Response",data)
  //   setCourses(data.data??[]);
 
  //  }


  const createModule = () => {

    const plainDescription = moduleDescription ? moduleDescription.replace(/<\/?p>/gi, '') : _courseFromState.description;


    const payload = {
      sectionId:sectionId, 
      moduleTitle:moduleTitle,
    
       moduleDescription:plainDescription
    }

    
  console.log("payload: ", payload);

  dispatch(addModuleToSection(payload));
  
  console.log("COURSE", _courseFromState); 
  console.log(sectionId)
  }

  useEffect(() => {
    const sectionIds = _courseFromState.sections.map(section => {
      if(section.id == sectionId){
        const moduleid = section.modules.map(module => module.id
          
      )[0];
   
      setModuleId(moduleid)
      }
    })
 
  })
  

  const AddVideo = () => {
    const payload = {
      moduleId: moduleId,
      title :videoTitle,
      videoLink: videoUrl,
    
    }

    dispatch(addVideoToModule(payload));

    setVideos([...videos,payload]);
    setShowVideoInputs(!showVideoInputs)
    setVideoTitle("")
    setVideoUrl("");
    console.log("COURSE", _courseFromState); 
    console.log(moduleId)
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

        <div style = {{width:"100%"}}className="page-section border-bottom-2">
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
                    value = {moduleTitle}
                    onChange={(e) =>  setModuleTitle(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Please see our <a href="">module title guideline</a>
                  </small>
                </div>
                <label className="form-label">Module Description</label>
                <div style={{ height: '200px', overflow: 'auto' }}>
  <ReactQuill
    style={{ height: '100px' }}
    value={moduleDescription}
    onChange={(value) => {
      setModuleDescription(value); // Pass the new description
    }}
    placeholder="Module description..."
    modules={moduleToolbar}
  />
</div>

                <div className="page-separator">
                  <div className="page-separator__text">
                    Videos                
                  </div>

                </div>
              <div >
          {showVideoInputs ? null :  <FaPlus  onClick = {() => setShowVideoInputs(!showVideoInputs)} />}
                </div>

                <div
  style={{
    display: 'flex',
    flexDirection: 'column',
  }}
  className="accordion js-accordion accordion--boxed mb-24pt"
  id="parent"
  data-domfactory-upgraded="accordion"
>
  {videos.length > 0 && (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: "wrap",
          width: "150%"
        }}
      >
        {videos.map((video: any, index: number) => (
             <>

<div style={{marginLeft: "10px",flexBasis: "30%", maxWidth: "100% !important" }}  className="card">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                //   allowFullScreen=""
                />
              </div>
              <div className="card-body">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                  placeholder="Enter Video URL"
                  value = {video.title}
                />
                <small className="form-text text-muted">
                  Enter a valid video title.
                </small>
              </div>
              <div className="card-body">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="https://player.vimeo.com/video/97243285?title=0&byline=0&portrait=0"
                  placeholder="Enter Video URL"
                  value={video.url}
                />
                <small className="form-text text-muted">
                  Enter a valid video URL.
                </small>
              </div>
</div>
        </>
        ))}
      </div>
    </>
  )}
</div>


                <div>
                  {
                    showVideoInputs && <>
                    
                    <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <label className="form-label">Title</label>
                  </div>

                  <input
                    onChange={(e) => setVideoTitle(e.target.value)}
                    id="flatpickrSample04"
                    type="text"
                    className="form-control"
                    placeholder="video title"
                    data-toggle="flatpickr"
                    data-flatpickr-enable-time="true"
                    data-flatpickr-alt-format="F j, Y at H:i"
                    data-flatpickr-date-format="Y-m-d H:i"
                  />
                
         
          
              
                  <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <label className="form-label">URL</label>
                  </div>

                  <input
              
                    onChange={(e) => setVideoUrl(e.target.value)}
                    id="flatpickrSample04"
                    type="text"
                    className="form-control"
                    placeholder="video url"
                    data-toggle="flatpickr"
                    data-flatpickr-enable-time="true"
                    data-flatpickr-alt-format="F j, Y at H:i"
                    data-flatpickr-date-format="Y-m-d H:i"
                  />
          
                    </>
                  }
                </div>

               {showVideoInputs &&  <a     style ={{marginTop: "10px"}}
                onClick = {AddVideo}
                  href="#"
                  className="btn btn-outline-secondary mb-24pt mb-sm-0"
                >
                  save Video
                </a>}

               
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header text-center">
                    <a
                    onClick={createModule}
                      href="#" className="btn btn-accent">
                      Save Module
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
               
         
              </div>
            </div>
          </div>
        </div>
        {/* // END Page Content */}
      </div>
    </div>
  );
};
