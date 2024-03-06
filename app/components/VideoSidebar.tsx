"use client"
import { IModule, ISection, IVideo } from '@/app/interfaces/courses'
import React, { useState } from 'react'
import { FaVideo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getSelectedCourseForEdit } from '../redux/courseSlice'


interface VideoSidebarProps {
    sections:ISection[]
    duration:any
    HideSidebar:  () => void
    handleVideoSelect: (video:IVideo) => void
}

function VideoSibar({sections,handleVideoSelect,duration,HideSidebar}: VideoSidebarProps) {
    const [expandedSection, setExpandedSection] = useState(null)
    const _courseFromState= useSelector(getSelectedCourseForEdit).course;
    const [height, setHeight] = useState<any>()

    const findSection = (id: string) => {
      const section = _courseFromState.sections.find((section: ISection) => section.id === id);
    
      const foundSection = _courseFromState.sections.find((section: ISection) => section.id === id);
    
      if (foundSection) {
        const videosCount = foundSection.modules.reduce((acc:any, Module:IModule) => {
          return acc + Module.videos.filter((video:IVideo) => parseInt(video.length) > 0).length;
        }, 0);
        const height = videosCount * 100;
        setHeight(height);
      }
    };
    
    const handleSectionClick = (section: any) => {
      setExpandedSection(null);
        if (expandedSection === section.id) {
          setExpandedSection(null);
        } else {
          setExpandedSection(section.id);
          findSection(section?.id)
        }
      };
  
  
    return (
    <div  className="section">
<div className='video-sidebar'>
    <h3 style={{ backgroundColor:"white", padding:"10px 0px 10px 20px"}}>Course Content <span onClick={HideSidebar} style={{fontSize:"medium", paddingLeft:"80px", fontWeight:"600", cursor:"pointer"}}>X</span></h3>
    {sections.map((section: ISection, index:number) => (
<div
                className={`accordion__item sidebar-content ${
                  expandedSection === section.id ? "open" : ""
                }`}
                key={section.id}
             style={ expandedSection === section.id ? {minHeight: `${height}px`, overflowY:'scroll', scrollbarWidth: 'none',position:"relative" }:{minHeight: "100px", overflowY:'scroll', scrollbarWidth: 'none', }}
              >
                <a
                  style={{ cursor: "pointer", fontSize: '1px' }}
                  className="accordion__toggle"
                  data-toggle="collapse"
                  data-target={`#course-toc-${section.id}`}
                  data-parent="#parent"
              
                >
                  <span
           
                    style={{ cursor: "pointer", width:"100vh", fontSize: "large", fontWeight:"600"}}
                    
                  >
                    Section {index+1} : {section.title}
                  </span>
                

                  <span className="accordion__toggle-icon material-icons"        onClick={() => handleSectionClick(section)}>
                    keyboard_arrow_down
                  </span>
                </a>
                <div
                  style={{position:"relative", zIndex:"10", marginBottom:"3em"}}
className={`accordion__menu collapse ${
                    expandedSection === section.id ? "show" : ""
                  }`}
                  id={`course-toc-${section.id}`}
                >
                  {section.modules?.map((Module) =>
                    Module.videos.map((video: IVideo) => (
                      <div
                        style={{ cursor: "pointer",backgroundColor:"white" }}
                        className="accordion__menu-link video-item"
                        key={video.id}
                      >

                       
                   
                       <div className='video-info'>
                       
                    
                       <a
                       onClick={() => handleVideoSelect(video)}
                         
                    
                      
                        >
                                        <input type="checkbox"   
                         style={{paddingLeft:"5px"}}
                        width="100px"
                        height="100px"
 />
                
                     <span
                     style={{paddingLeft:"5px", fontWeight:"600"}}
                     >

                     {video.title} 
                     </span>
                        </a>
                        <div>
                    
                    <FaVideo/><span style={{fontSize:'small',paddingLeft:"5px"}}>{duration} min</span>
                  
                </div>
                       </div>
                  
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

</div>
    </div>
  
  )
}

export default VideoSibar