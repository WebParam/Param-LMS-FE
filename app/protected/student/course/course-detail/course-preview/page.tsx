"use client"
import React , {useState, useEffect}from 'react';
import './course-preview.css';
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import { ISection } from '@/app/interfaces/courses';

// interface CoursePreviewProps {
//   section : ISection
// }
const CoursePreview = () => {
    // const [open, setOpen] = useState(false);
    // const [selectedVideoLink,setSelectedVideoLink] = useState(section?.modules[0]?.videos[0]?.videoLink)
    // useEffect(() => {
    //   setSelectedVideoLink(section?.modules[0]?.videos[0]?.videoLink)
    // }, []);

    // const handleVideoEnd = () => {
    //   // Video has ended, you can add your logic here
    //   console.log('Video has completed.');
    //   setOpen(!open)
    // };

    // const openQuiz = () => {
    //   setOpen(false);
    //   console.log("open quiz");
    //   goToQuiz()
    //  // onOpenModal();
    // }

   

    // const goToQuiz = () => {

    //   window.location.href = '/protected/student/course/quiz';
      
    
    // }

  return (
<div className="course-detail">
    {/* <div className="player-wrapper">
       <ReactPlayer
        url={previewVideoUrl?.videoLink}
        controls={true}
        autoPlay={true}
        className="react-player"
        onEnded={() => handleVideoEnd()}
        />
        </div>
         <ConfirmationModal
        open={open}
        onConfirm={() => openQuiz()}
        onCancel={() => setOpen(false)}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the module, We have attached a quiz to rate your understading of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
      <div className="details">
        {<h2>{section?.competency}</h2>}
        { <p className="instructor">Instructor:John Smith</p> }
        { <p className="description">{section.modules[0]?.videos[0].description}</p> }
      </div> */}
    </div>
  );
};

export default CoursePreview;