"use client";
import { ISection, IVideo } from "@/app/interfaces/courses";
import React, { useState } from "react";
import { FaTrash, FaVideo } from "react-icons/fa";

interface PaginationProps {
  sections: ISection[];
  itemsPerPage: number;
  expandedSection:string | null
  handleSectionClick: (section: ISection) => void;
  selectSection: (sectionId: string) => any;
  handleDeleteSection: (sectionId: string) => void;
  setModuleId: (moduleId: string) => void;
  setEditModuleModalOpen: (isOpen: boolean) => void;
  setSectionId: (sectionId: string) => void;
  setVideoId: (videoId: string) => void;
  handleDeleteVideo: (videoId: string) => void;
}

export const Pagination = ({
  sections,
  itemsPerPage,
  expandedSection,
  handleSectionClick,
  selectSection,
  handleDeleteSection,
  setModuleId,
  setEditModuleModalOpen,
  setSectionId,
  setVideoId,
  handleDeleteVideo,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sections.length / itemsPerPage);

  // Calculate the index of the first and last section to display on the current page
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;

  // Get the current page of sections
  const currentSections = sections.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  // Function to handle page navigation
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Render the current page of sections */}
      <div
        className="accordion js-accordion accordion--boxed mb-24pt"
        id="parent"
      >
        {currentSections.map((section: ISection) => (
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
                  selectSection(section.id);
                }}
                style={{ cursor: "pointer" }}
                className="flex"
              >
                {section.title}
              </span>
              <button
                onClick={() => handleDeleteSection(section.id)}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  outline: "none",
                }}
              >
                <FaTrash />
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
                      onClick={() => {
                        setModuleId(Module.id);
                        setEditModuleModalOpen(true);
                        setSectionId(section.id);
                        setVideoId(video.id);
                      }}
                      className="video-icon"
                    />
                    <a
                      style={{ marginLeft: "8px" }}
                      className="flex"
                      onClick={() => {
                        setModuleId(Module.id);
                        setEditModuleModalOpen(true);
                        setSectionId(section.id);
                        setVideoId(video.id);
                      }}
                    >
                      {video.title}
                    </a>
                    <span className="text-muted">
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        style={{
                          backgroundColor: "white",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Render pagination controls */}


      <ul className="pagination justify-content-start pagination-xsm m-0">
      <li className="page-item">
              <a className="page-link"  aria-label="Next">
                <span>
                <button
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor:"transparent",
                      cursor: "pointer"
                     }}
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
        >
          Prev
        </button>
                </span>
                <span aria-hidden="true" className="material-icons">
                  chevron_left
                </span>
              </a>
            </li>
      
            {Array.from({ length: totalPages }, (_, i) => (
      
      <li className="page-item"
      key={i}
   
      >
      <a className="page-link"  aria-label="Page 1">
    <button
       onClick={() => handlePageChange(i + 1)}
       disabled={currentPage === i + 1}
       style={{
        outline: "none",
        border: "none",
        backgroundColor:"transparent",
        cursor: "pointer"
       }}
    >
    <span> {i + 1}</span>
    </button>
      </a>
    </li>


 
        ))}
         
      
            <li className="page-item">
              <a className="page-link"  aria-label="Next">
                <span>
                <button
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor:"transparent"
                     }}
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
        >
          Next
        </button>
                </span>
                <span aria-hidden="true" className="material-icons">
                  chevron_right
                </span>
              </a>
            </li>
          </ul>

  
    </div>
  );
};
