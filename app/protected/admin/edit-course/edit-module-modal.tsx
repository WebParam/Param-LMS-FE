"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaBullseye, FaPencilAlt, FaPlus, FaTrash, FaVideo } from "react-icons/fa";
import { addModuleToSection, addVideoToModule, deleteVideoFromModule, editVideoDetails, getSelectedCourseForEdit, updateModuleDetail } from "@/app/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { ICourse, IModule, IUpdateModuleDetailState } from "@/app/interfaces/courses";


interface EditCourseModalProps {
  onClose: () => any;
  sectionId : string 
  ModuleId: any
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  onClose,sectionId, ModuleId
}) => {
  const [showVideoInputs, setShowVideoInputs] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([])
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const dispatch = useDispatch();
  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;
  const [changeModulBtn, setChangeModulBtn] = useState<boolean>(false)
  const [disableSaveChanges, setDisableSaveChanges] = useState<boolean>(true)
  const [selectedModule , setSelectedModule] = useState<any>([])
  const [selectedVideos , setSelectedVideo] = useState<any>([])
  const [changeVidBtn, setChangeVidBtn] = useState<boolean>(true);
  const [videoId, setVideoId] = useState<string>("");


  const moduleToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };


 
  const deleteVideoHandler = (moduleId:any, videoId:any) => {
    dispatch(deleteVideoFromModule({ moduleId, videoId }));
  };

  const editModule = () => {

    const plainDescription = moduleDescription ? moduleDescription.replace(/<\/?p>/gi, '') : _courseFromState.description;


    const payload = {
        moduleId :ModuleId,
      sectionId:sectionId, 
      title:moduleTitle,
    
      description:plainDescription
    }

 
    
  console.log("payload: ", payload);

  dispatch(updateModuleDetail(payload));
  
  console.log("COURSE", _courseFromState); 
  console.log(sectionId)
  onClose()
  }

  useEffect(() => {
    const section = _courseFromState.sections.find(section => section.id === sectionId);
  
    if (section) {
      const module = section.modules.find(module => module.id === ModuleId);
  
      if (module) {
        setSelectedModule(module);
        setModuleTitle(module.title);
        setModuleDescription(module.description);
        setSelectedVideo(module.videos);
      }
    }
  }, [sectionId, ModuleId, _courseFromState.sections]);
  
  useEffect(() => {
    // This effect will run whenever selectedModule.title changes
    // and update the moduleTitle state with the latest selectedModule.title
    setModuleTitle(selectedModule.title);
    setModuleDescription(selectedModule.description);
  }, [selectedModule.title,selectedModule.description]);
  
  
  

  const AddVideo = () => {
    const payload = {
      moduleId: ModuleId,
      videoTitle :videoTitle,
      videoLink: videoUrl,
    
    }

    dispatch(addVideoToModule(payload));

    setVideos([...videos,payload]);
    setShowVideoInputs(!showVideoInputs)
    setVideoTitle("")
    setVideoUrl("");
    console.log("COURSE", _courseFromState); 
    setChangeModulBtn(true)
  }
  const editVideo = (id:string) => {
    const payload = {
      moduleId:ModuleId,
      videoId:id,
      videoTitle:videoTitle,
      videoUrl :videoUrl,
    }
    dispatch(editVideoDetails(payload));
    setShowVideoInputs(false)
    setVideoTitle("")
    setVideoUrl("")
    setChangeVidBtn(true)
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

        <div style = {{width:"100%"}} className="page-section border-bottom-2">
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
                    onChange={(e) => {
                      
                     
                      setModuleTitle(e.target.value)}}
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


                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}  className="page-separator">
                  <div className="page-separator__text">
                    Videos                
                  </div>
                  <div >
          {showVideoInputs ? null :  <FaPlus  style={{cursor:"pointer"}} onClick = {() => setShowVideoInputs(!showVideoInputs)} />}
                </div>
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: "wrap",
          width: "150%"
        }}
      >
        {selectedVideos.map((video: any, index: number) => (
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
                  placeholder="Enter Video Title"
                  value = {video.title}
                  onChange={(e) => setVideoTitle(e.target.value)}
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
                <div style = {{display:"flex", flexDirection:'row', justifyContent:"flex-end", alignItems:"center"}}>
             
             <FaTrash onClick = {() => deleteVideoHandler(ModuleId, video.id)} style = {{cursor:"pointer"}}/>
             <FaPencilAlt  onClick = {() =>
                  
                  {  
                    setVideoId(video.id)
                    setChangeVidBtn(false)
                    setShowVideoInputs(!showVideoInputs)}} style = {{cursor:"pointer", marginRight:"5px" }}/>
               </div>  
                
              </div>
</div>
        </>
        ))}
      </div>
    
  
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
                    value = {videoTitle}
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
                    value={videoUrl}
                  />
          
                    </>
                  }
                </div>

               {showVideoInputs &&   <>
               
               
               { changeVidBtn ?  <a     style ={{marginTop: "10px"}}
                 onClick = {AddVideo}
                   href="#"
                   className="btn btn-outline-secondary mb-24pt mb-sm-0"
                 >
                   save Video
                 </a> :  <a     style ={{marginTop: "10px"}}
                 onClick = {() => editVideo(videoId)}
                   href="#"
                   className="btn btn-outline-secondary mb-24pt mb-sm-0"
                 >
                   update Video
                 </a>
 }
 
                </>}

               
              </div>
              <div className="col-md-4">
                <div className="card" style={{width : "auto"}}>
                  <div  className="card-header text-center">

              
                  <button   style={{backgroundColor: "transparent", border:"none", outline:"none", width:"150px"}}>
 <a
                    onClick={editModule}
                      href="#" className="btn btn-accent">
                       save changes
                    </a>
                      </button>  
          
          

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
