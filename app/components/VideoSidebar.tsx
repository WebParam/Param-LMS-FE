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
    <div
                  className="accordion js-accordion accordion--boxed mb-24pt"
                  id="parent"
                >
                  {_courseFromState.sections.map((section: ISection) => (
                    <div
                      className={`accordion__item ${
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
                        onClick={() => handleSectionClick(section)}
                      >
                        <span
                          onClick={() => {
                            // selectSection(section.id);
                          }}
                          style={{ cursor: "pointer" }}
                          className="flex"
                        >
                          {section.title}
                        </span>
                        <button
                          // onClick={() => handleDeleteSection(section.id)}
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            outline: "none",
                          }}
                        >
        
                        </button>

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
                              style={{ cursor: "pointer" }}
                              className="accordion__menu-link"
                              key={video.id}
                            >
                              <FaVideo
                               
                              
                                className="video-icon"
                              />
                              <a
                                style={{ marginLeft: "8px" }}
                                className="flex"
                             
                              >
                                {video.title}
                              </a>
                              <span className="text-muted">
                                <button
                                  style={{
                                    backgroundColor: "white",
                                    border: "none",
                                    outline: "none",
                                  }}
                                >
                               
                                </button>
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>

</div>
    </div>
  
  )
}

export default VideoSibar