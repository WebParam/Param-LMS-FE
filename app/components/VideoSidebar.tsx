"use client";
import { IModule, ISection, IVideo } from "@/app/interfaces/courses";
import React, { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getSelectedCourseForEdit } from "../redux/courseSlice";

interface VideoSidebarProps {
  sections: ISection[];
  duration: any;
  HideSidebar: () => void;
  handleVideoSelect: (video: IVideo) => void;
}

function VideoSibar({
  sections,
  handleVideoSelect,
  duration,
  HideSidebar,
}: VideoSidebarProps) {
  const [expandedSection, setExpandedSection] = useState(null);
  const _courseFromState = useSelector(getSelectedCourseForEdit).course;
  const [height, setHeight] = useState<any>();

  const findSection = (id: string) => {
    const section = _courseFromState.sections.find(
      (section: ISection) => section.id === id
    );

    const foundSection = _courseFromState.sections.find(
      (section: ISection) => section.id === id
    );

    if (foundSection) {
      const videosCount = foundSection.modules.reduce(
        (acc: any, Module: IModule) => {
          return (
            acc +
            Module.videos.filter((video: IVideo) => parseInt(video.length) > 0)
              .length
          );
        },
        0
      );
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
      findSection(section?.id);
    }
  };

  return (
    <div className="section">
      <div className="video-sidebar">
        <h3 style={{ backgroundColor: "white", padding: "10px 0px 10px 20px" }}>
          Course Content{" "}
          <span
            onClick={HideSidebar}
            style={{
              fontSize: "medium",
              paddingLeft: "80px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            X
          </span>
        </h3>
        {sections.map((section: ISection, index: number) => (
          <div className="accordion js-accordion accordion--boxed " id="parent">
            {_courseFromState.sections.map(
              (section: ISection, index: number) => (
                <div className="" key={section.id}>
                  <a
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f5f7fa",
                      fontSize: "large",
                      borderBottom: "1px solid lightgrey",
                      borderTop: "1px solid gray",
                    }}
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
                      Section {index + 1} : {section.title}
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
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderBottom: "1px solid lightgrey",
                            padding: "10px 0px 0px 10px",
                          }}
                          key={video.id}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "0.5em",
                                position: "relative",
                                top: "5px",
                                fontSize: "large",
                              }}
                            >
                              <input
                                type="checkbox"
                                style={{ marginRight: "0.5em" }}
                              />
                              <FaVideo className="video-icon ml-6" />
                            </label>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                              }}
                            >
                              <a
                                style={{
                                  fontSize: "medium",
                                  marginLeft: "0.5em",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "wrap",
                                }}
                              >
                                {video.title}
                              </a>
                            </div>
                          </div>

                          <p style={{ display: "block" }}>
                            <span
                              style={{ fontSize: "small", paddingLeft: "5px" }}
                            >
                              {duration} min
                            </span>
                          </p>

                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSibar;
