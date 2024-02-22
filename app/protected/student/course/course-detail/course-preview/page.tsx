"use client"
import React , {useState, useEffect}from 'react';
import './course-preview.css';
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import { ICourse, IVideo } from '@/app/interfaces/courses';
import { Api } from '@/app/lib/restapi/endpoints';
import { IQuiz } from '@/app/interfaces/quiz';

const CoursePreview = ({ previewVideoUrl, course } : {previewVideoUrl:any, course:ICourse}) => {
    const [open, setOpen] = useState(false);
    const [selectedVideo,setSelectedVideo] = useState(course?.sections[0]?.modules[0]?.videos[0]?.videoLink)
    useEffect(() => {
      console.log("course", previewVideoUrl)
      setSelectedVideo(course?.sections[0]?.modules[0]?.videos[0]?.videoLink)
      if(previewVideoUrl?.videoLink === undefined){
       // setSelectedVideo(course?.modules[0]?.videos[0]?.videoLink)
      }
      if(previewVideoUrl?.videoLink){
        console.log("selected video", selectedVideo)
        setSelectedVideo(previewVideoUrl?.videoLink)
        console.log("after selected video", selectedVideo, previewVideoUrl.videoLink)
      }
      getAllQuizzes()
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

    async function getAllQuizzes() {
      try {
        const getQuizzes = await Api.GET_AllQuizzes();
    
        if (getQuizzes && getQuizzes.length > 0) {
          const mappedQuizzes = getQuizzes.map((quiz: any) => quiz.data);
          console.log("quizes",mappedQuizzes)
          const quizByVideoId = mappedQuizzes.filter((quiz:IQuiz) => quiz.videoId === course?.sections[0]?.modules[0]?.videos[0]?.id)//videoId here
          console.log("quiz", quizByVideoId)
          localStorage.setItem("quiz", JSON.stringify(quizByVideoId))
    ;     
        } else {
          console.log("No quizzes found");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }




    const goToQuiz = () => {
      window.location.href = '/protected/student/course/quiz';
    }

  return (
<div className="course-detail">
    <div className="player-wrapper">
       <ReactPlayer
        url={previewVideoUrl?.videoLink === undefined ? course?.sections[0]?.modules[0]?.videos[0]?.videoLink : previewVideoUrl?.videoLink}
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