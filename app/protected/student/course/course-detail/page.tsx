"use client"
import React, { Suspense, useState } from 'react';
import Cookies from 'universal-cookie';
import { Api } from '@/app/lib/restapi/endpoints';
import { ICourse, ISection, IModule, IVideo } from '@/app/interfaces/courses';
import { useEffect,useRef  } from 'react'
import {  useSelector } from "react-redux";
import { IUser } from '@/app/interfaces/user';
import { getSelectedCourseForEdit } from '@/app/redux/courseSlice';
import { getAuthor } from '@/app/lib/getAuthor';
import IComment from '@/app/interfaces/comment';
import "../../../../components/videoSidebar.css";
import './main.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import {useRouter} from "next/navigation";
import { IQuiz } from '@/app/interfaces/quiz';
import { FaVideo } from 'react-icons/fa';
import VideoSibar from '../../../../components/VideoSidebar';
import VideoPlayer from '../../../../components/ReactPlayer';

export default function CourseDetail() {

  const [data, setData] = useState<ICourse>();
  const [sections, setSection] = useState<ISection[]>([])
  const [videos, setVideos] = useState<IVideo[]>([])
  const [author, setAuthor] = useState<IUser>();
  const [comments, setComments] = useState<IComment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [allVideos, setAllVideos] = useState<IVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [quizId, setQuizId] = useState<string>("")
  const [videoId, setVideoId] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hideSidebar, setHideSidebar] = useState<boolean>(true)
  const [videoDurations, setVideoDurations] = useState<(number | null)[]>([]);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const router = useRouter();


  const handleDuration = (duration:any) => {
    // Handle the duration only if it's a valid number
    if (!isNaN(duration)) {
      setDuration(duration);
    }
  };
  


  const formatDurationToMinutes = (durationInSeconds:any) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const HideSidebar = () => {
    setHideSidebar((prev) => !prev)
  }



const cancelQuiz = () => {
  setOpen(false);
  if (currentVideoIndex < allVideos.length - 1) {
    setCurrentVideoIndex(currentVideoIndex + 1);
    setQuizId("");
  }
}

  useEffect(() => {
    if (allVideos.length > 0) {
      setSelectedVideo(allVideos[currentVideoIndex].videoLink);
    }
  }, [allVideos, currentVideoIndex]);

  const handleVideoEnd = () => {
    setOpen(false);
    const quizFromStorage = localStorage.getItem("student-quizzes");
  
    if (quizFromStorage) {
      try {
        const quizzes = JSON.parse(quizFromStorage)
        .filter((quiz: IQuiz) => quiz.questions.length > 0);
      
        const currentVideoId = allVideos[currentVideoIndex].id;
   
        const getQuiz: IQuiz = quizzes.find((quiz: IQuiz) => quiz.videoId === currentVideoId);
        if (getQuiz?.id) {
          setQuizId(getQuiz.id);
          setOpen(!open);
        } else {
          if (currentVideoIndex < allVideos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
          }
        }
      } catch (error) {
        console.error("Error parsing quizzes from localStorage:", error);
      }
    }
  };
  
  const state: ICourse = useSelector(getSelectedCourseForEdit).course;
  useEffect(() => {
    setSection(state?.sections);
    setVideoId(sections[0]?.modules[0]?.videos[0]?.id)
  
 
    state.sections.forEach((section:ISection) => {
        section.modules.forEach((Module:IModule) => {
            if (Module.videos.length > 0) {
                videos.push(...Module.videos);
            }
        });
    });

    setAllVideos(videos);


    console.log("Durations",videoDurations)

    setData(state);
    if (state) {
      setIsLoading(false);
    }
    getUserCourses(state?.creatingUser!);
    const fetchData = async () => {

      setAuthor(await getAuthor(state?.creatingUser!));

      // Fetch comments
      var _comments = await Api.GET_CommentsByReference(state.id);
      if (_comments) {
        setComments(_comments?.map((comment) => comment.data) as any);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    const fetchDurations = async () => {
      const durations = await Promise.all(
        allVideos.map(async (video:IVideo) => {
          try {
            const response = await fetch(video.videoLink);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);

            return new Promise<number>((resolve) => {
              const player = React.createElement(ReactPlayer, {
                url: objectURL,
                controls: false, // Disable controls to prevent UI appearance
                playing: false, // Not playing the video to avoid unnecessary network traffic
                onDuration: (duration: number) => {
                  resolve(duration);
                },
              });
            });
          } catch (error) {
            console.error('Error fetching video duration:', error);
            return null;
          }
        })
      );
      setVideoDurations(durations as (number | null)[]);
      console.log("Durations", durations);
    };

    fetchDurations();
  }, [allVideos]);

  async function getUserCourses(id: string) {
    var userCourses = await Api.GET_CoursesByUserId(id);

  
  }

  const handleVideoSelect = (video: IVideo) => {

    const index = allVideos.findIndex((v: IVideo) => v.id === video.id);
    setSelectedVideo(video.videoLink);
    setCurrentVideoIndex(index);
  };


  const openQuiz = () => {
    setOpen(false);
    goToQuiz()
  }

 
  const goToQuiz = () => {

    router.push(`/protected/student/course/quiz?id=${quizId}`);
    
  
  }

    return (
   
<div className="main">
  <div className='react-player-container'>
  <VideoPlayer
      selectedVideo = {selectedVideo}
      sections = {sections}
      cancelQuiz = {cancelQuiz}
      openQuiz = {openQuiz}
      handleVideoEnd= {handleVideoEnd}
      open= {open}
      handleDuration={handleDuration}
      HideSidebar = {hideSidebar}
      viewSidebar ={HideSidebar}
      playerRef={playerRef}

      />
  </div>
    
       
<div  style={hideSidebar ? { width: "300px" , } : {display:"none"}}>
<VideoSibar HideSidebar = {HideSidebar} duration = {formatDurationToMinutes(duration)} sections={sections} handleVideoSelect={handleVideoSelect}/>
</div>

 </div>


   
  )
}