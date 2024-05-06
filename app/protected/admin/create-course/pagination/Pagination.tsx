"use client";
import { ISection, IVideo } from "@/app/interfaces/courses";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import React, { useEffect, useState } from "react";
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
  setVideo : (video: IVideo) => void;
  setSectionId: (sectionId: string) => void;
  setVideoId: (videoId: string) => void;
  handleDeleteVideo: (videoId: string,moduleId?:string | null) => void;
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
  setVideo
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allowDeleteVideo, setAllowDeleteVideo] = useState<boolean>(false)

  const [deleteVideoId, setDeleteVideoId] = useState<string>("");
  const [deleteVideoModuleId, setDeleteVideoModuleId] = useState<string>("");
  const [sectionId, setSetSectionId] = useState<string>("")

  const totalPages = Math.ceil(sections.length / itemsPerPage);
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = sections.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
     {
      sections.length < 1 ? <p>0 Sections</p> : <>
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
                onClick={() => {
                  setOpenModal(true)
                  setAllowDeleteVideo(false)
                  setSectionId(section.id)
                  setSetSectionId(section?.id)
  
                }
                }
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
                        setAllowDeleteVideo(true);
                        setEditModuleModalOpen(true);
                        setVideoId(video.id);
                        setVideo(video);
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
                        onClick={() => {
                          setAllowDeleteVideo(true);

                          setOpenModal(true)

                          setModuleId(Module.id);
                          setDeleteVideoId(video.id);
                          setDeleteVideoModuleId(Module.id);
                          setVideoId(video.id);
                 
                        }}
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

      
      </>
     }
        <ConfirmationModal
        open={openModal}
        onConfirm={() => {
          if(allowDeleteVideo){
            handleDeleteVideo(deleteVideoId,
              deleteVideoModuleId)
              setAllowDeleteVideo(false);
              setOpenModal(false);
              
            }else{
              handleDeleteSection(sectionId)
              setOpenModal(false);
              setAllowDeleteVideo(false);

          }
        }}
        onCancel={() =>{
          setAllowDeleteVideo(false);
          setOpenModal(false)
        }}
        title={allowDeleteVideo ? 'Delete Video' : "Delete Section"}
        buttonText="Delete"
      >
       Are you sure you want to delete this {allowDeleteVideo ? 'video' : "section"}
      </ConfirmationModal>
    </div>
  );
};
