import React , {useState, useEffect}from 'react';
import './course-preview.css';
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

const CoursePreview = ({ previewVideoUrl, course } : {previewVideoUrl:any, course:any}) => {
    const [open, setOpen] = useState(false);
    const [selectedVideo,setSelectedVideo] = useState(course?.sections[0]?.modules[0]?.videos[0]?.videoLink)
    useEffect(() => {
      console.log("course", course)
      if(previewVideoUrl?.videoLink === undefined){
       // setSelectedVideo(course?.modules[0]?.videos[0]?.videoLink)
      }
      if(previewVideoUrl?.videoLink){
        console.log("selected video", selectedVideo)
        setSelectedVideo(previewVideoUrl?.videoLink)
        console.log("after selected video", selectedVideo, previewVideoUrl.videoLink)
      }
    }, []);

    const handleVideoEnd = () => {
      // Video has ended, you can add your logic here
      console.log('Video has completed.');
      setOpen(!open)
    };

    const openQuiz = () => {
      setOpen(false);
      console.log("open quiz");
      goToQuiz()
     // onOpenModal();
    }

   

    const goToQuiz = () => {

      window.location.href = '/protected/student/course/quiz';
      
    
    }

  return (
<div className="course-detail">
    <div className="player-wrapper">
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
        {<h2>{course?.title}</h2>}
        { <p className="instructor">Instructor: {course?.instructor}</p> }
        { <p className="description">{course?.description}</p> }
      </div>
    </div>
  );
};

export default CoursePreview;