import React , {useState, useEffect}from 'react';
import './course-preview.css';
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

const CoursePreview = ({ video, previewVideoUrl } : {video:any, previewVideoUrl:any}) => {
    const [open, setOpen] = useState(false);
    const [selectedVideo,setSelectedVideo] = useState(video?.modules[0]?.videos[0]?.videoLink)
    useEffect(() => {
      console.log("videourl", previewVideoUrl?.videoLink)
      if(previewVideoUrl?.videoLink === undefined){
        setSelectedVideo(video?.modules[0]?.videos[0]?.videoLink)
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
     
       <ReactPlayer
        width='100%'
        height='100%'
        url={previewVideoUrl?.videoLink}
        controls={true}
        autoPlay={true}
        config={{
          vimeo: {
            playerOptions: {
              width: '100%',
              height: '100%',
              byline: false,
              portrait: false,
              title: false,
            },
          },
        }}
        onEnded={() => handleVideoEnd()}
        />
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
        {<h2>{video?.competency}</h2>}
        { <p className="instructor">Instructor: {video?.instructor}</p> }
        { <p className="description">{video?.description}</p> }
      </div>
    </div>
  );
};

export default CoursePreview;