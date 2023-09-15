"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaBullseye, FaEdit, FaPencilAlt, FaPlus, FaTrash, FaVideo } from "react-icons/fa";
import { addModuleToSection, addVideoToModule, deleteVideoFromModule, editVideoDetails, getSelectedCourseForEdit, updateModuleDetail } from "@/app/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { ICourse, IModule, IUpdateModuleDetailState } from "@/app/interfaces/courses";


interface CreateCourseModalProps {
  onClose: () => any;
  sectionId : string 
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  onClose,sectionId
}) => {
  const [showVideoInputs, setShowVideoInputs] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<any>([])
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const [moduleId, setModuleId] = useState("");
  const dispatch = useDispatch();
  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;
  const [modules, setModules] = useState<string[]>([])
  const [isModuleSaved, setIsModuleSaved] = useState<boolean>(false)
  const [viewModuleList, setViewModuleList] = useState<boolean>(false)
  const [changeModulBtn, setChangeModulBtn] = useState<boolean>(false)
  const [disableSaveChanges, setDisableSaveChanges] = useState<boolean>(true)
  const [lastSection, setLastSection] = useState<number>(-1)
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


 
  const saveChangeBtn = () => {
    if(moduleDescription.length > 0 && moduleTitle.length > 0 ){
      setDisableSaveChanges(false);
    }
   
  }

  

  const deleteVideoHandler = (moduleId:any, videoId:any) => {
    dispatch(deleteVideoFromModule({ moduleId, videoId }));
  };
  const createModule = () => {

if(moduleDescription.length > 0 && moduleTitle.length > 0){
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
setIsModuleSaved(true)
setModules([...modules, moduleTitle])

setDisableSaveChanges(true);
}
  }

  useEffect(() => {
    const sectionIds = _courseFromState.sections.map((section) => {
      if (section.id === sectionId) {
        const moduleIds = section.modules.map((module) => module.id);
        const lastModuleId = moduleIds[moduleIds.length - 1];
        
        setModuleId(lastModuleId);
      }
    });
  }, [sectionId, _courseFromState.sections]);
  

  const AddVideo = () => {
   if(videoTitle && videoUrl){
    const payload = {
      moduleId: moduleId,
      videoTitle :videoTitle,
      videoLink: videoUrl,
    
    }

    dispatch(addVideoToModule(payload));

    setVideos([...videos,payload]);
    setShowVideoInputs(!showVideoInputs)
    setVideoTitle("")
    setVideoUrl("");
    console.log("COURSE", _courseFromState); 
    console.log(moduleId)
    setChangeModulBtn(true)
   }
  }


  const clearInputs = () => {
    setModuleTitle("")
    setModuleDescription("")
    setVideoUrl("")
    setVideoTitle("")
    setViewModuleList(true)
    setIsModuleSaved(false)
    setChangeModulBtn(false)
    setVideos([])
  }

  const selectedCourse = useSelector(getSelectedCourseForEdit).course;
  const [expandedModule, setExpandedModule] = useState(null);

  const handleModuleClick = (module:any) => {
    if (expandedModule === module.id) {
      setExpandedModule(null);
    } else {
      setExpandedModule(module.id);
    }
  };

  useEffect(() => {
    const sections = _courseFromState.sections
    const lastSection = sections.length - 1;
    setLastSection(lastSection)

  }, []);


  useEffect(() => {
    const section = _courseFromState.sections.find(section => section.id === sectionId);
  
    if (section) {
      const module = section.modules.find(module => module.id === moduleId);
  
      if (module) {
      
        setSelectedVideo(module.videos);
      }
    }
  }, [sectionId, moduleId, _courseFromState.sections]);
  
  const editVideo = (id:string) => {
    const payload = {
      moduleId:moduleId,
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
    style = {{width:"100%"}}
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
                <div>
  
{viewModuleList && <>
  <div style={{backgroundColor: "#f5f7fa" , marginBottom: "10px"}} className = "accordion__item open">
      <h1>{selectedCourse.title}</h1>
      {selectedCourse.sections[lastSection].modules.map((module) => (
        <div className={`accordion__item ${expandedModule === module.id ? 'open' : ''}`} key={module.id}>
 <a
            href="#"
            className={`accordion__toggle ${expandedModule === module.id ? '' : 'collapsed'}`}
            data-toggle="collapse"
            data-target={`#course-toc-${module.id}`}
            data-parent="#parent"
            onClick={() => handleModuleClick(module)}
          >
            <span className="flex">{module.title}</span>
            <span className="accordion__toggle-icon material-icons">
              {expandedModule === module.id ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </a>
          <div className={`accordion__menu collapse ${expandedModule === module.id ? 'show' : ''}`} id={`course-toc-${module.id}`}>
            {module.videos.map((video) => (
              <div className="accordion__menu-link" key={video.id}>
                <FaVideo   className="video-icon" /> {/* Video icon */}
                <a style={{marginLeft:"10px"}} className="flex" href={video.videoLink}>
                  {video.title}
                </a>
                <span className="text-muted">{video.duration}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
</>}
</div>
                <label className="form-label">Module title</label>
                <div className="form-group mb-24pt">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Module Title"
                    value = {moduleTitle}
                    onChange={(e) => {
                      
                      saveChangeBtn()
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
      saveChangeBtn()

    }}
    placeholder="Module description..."
    modules={moduleToolbar}
  />
</div>
{

isModuleSaved && <>

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
        {selectedVideos.map((video: any, index: number) => (
             <>

<div style={{marginLeft: "10px",flexBasis: "30%", maxWidth: "100% !important" }}  className="card">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={video.videoLink}
                //   allowFullScreen=""
                />
              </div>
              <div className="card-body">
                <label className="form-label">Title</label>
                <input
                  disabled={true}
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
                  disabled={true}
                  type="text"
                  className="form-control"
                  placeholder="Enter Video URL"
                  value={video.videoLink}
                />
                   <small className="form-text text-muted">
                  Enter a valid video URL.
                </small>
             
                <div style = {{display:"flex", flexDirection:'row', justifyContent:"flex-end", alignItems:"center"}}>
             
                <FaTrash onClick = {() => deleteVideoHandler(moduleId, video.id)} style = {{cursor:"pointer", marginRight:"5px"}}/>
                <FaPencilAlt  onClick = {() =>
                  
                {  
                  setVideoId(video.id)
                  setChangeVidBtn(false)
                  setShowVideoInputs(!showVideoInputs)}} style = {{cursor:"pointer"}}/>
                  </div>      
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

               {showVideoInputs && <>
               
               
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

               </>
}
</>}
               
              </div>
              <div className="col-md-4">
                <div className="card" style={{width : "auto"}}>
                  <div  className="card-header text-center">

              
                    {
                      changeModulBtn ?       <button  style={{backgroundColor: "transparent", border:"none", outline:"none",width:"150px"}}>
<a
                      onClick={clearInputs}
                        href="#" className="btn btn-accent">
                       save module 
                      </a> 
                      </button>   :   
                      <button  disabled={disableSaveChanges} style={{backgroundColor: "transparent", border:"none", outline:"none", width:"150px"}}>
 <a
                    onClick={createModule}
                      href="#" className="btn btn-accent">
                       save changes
                    </a>
                      </button>  
                    }
               
          
            
              



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
