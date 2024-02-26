"use client"
import { ISection, IVideo } from '@/app/interfaces/courses'
import React, { useState } from 'react'
import { FaVideo } from 'react-icons/fa'


interface VideoSidebarProps {
    sections:ISection[]
    duration:any
    handleVideoSelect: (video:IVideo) => void
}

function VideoSibar({sections,handleVideoSelect,duration}: VideoSidebarProps) {
    const [expandedSection, setExpandedSection] = useState(null)
  
    const handleSectionClick = (section: any) => {
        if (expandedSection === section.id) {
          setExpandedSection(null);
        } else {
          setExpandedSection(section.id);
        }
      };
  
  
    return (
    <div  className="section">
<div className='video-sidebar'>
    <h3 style={{ backgroundColor:"white", padding:"10px 0px 10px 20px"}}>Course Content <span style={{fontSize:"medium", paddingLeft:"80px", fontWeight:"600", cursor:"pointer"}}>X</span></h3>
    {sections.map((section: ISection, index:number) => (
<div
                className={`accordion__item sidebar-content ${
                  expandedSection === section.id ? "open" : ""
                }`}
                key={section.id}
              >
                <a
                  style={{ cursor: "pointer" }}
                  className="accordion__toggle"
                  data-toggle="collapse"
                  data-target={`#course-toc-${section.id}`}
                  data-parent="#parent"
              
                >
                  <span
                  onClick={() => handleSectionClick(section)}
                    style={{ cursor: "pointer", width:"100vh", fontSize: "large", fontWeight:"600"}}
                    
                  >
                    Section {index+1} : {section.title}
                  </span>
                

                  <span className="accordion__toggle-icon material-icons">
                    keyboard_arrow_down
                  </span>
                </a>
                <div
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