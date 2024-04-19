"use client"
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { Api } from '@/app/lib/restapi/endpoints';
import { ICourse, ISection, IModule, IVideo } from '@/app/interfaces/courses';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '@/app/interfaces/user';
import { getSelectedCourseForEdit } from '@/app/redux/courseSlice';
import { getAuthor } from '@/app/lib/getAuthor';
import IComment from '@/app/interfaces/comment';
import "../../../../components/videoSidebar.css";
import './main.css'
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import { useRouter } from "next/navigation";
import { IQuiz } from '@/app/interfaces/quiz';
import { getSelectedQuizForEdit } from '@/app/redux/quizSlice';
import { FaVideo } from 'react-icons/fa';
import VideoSibar from '../../../../components/VideoSidebar';
import VideoPlayer from '../../../../components/ReactPlayer';
import { createWatchedDetail } from '@/app/redux/watcheVideosSlice';
import { IEnrollment } from '@/app/interfaces/Enrollment';
import { IActivity, IActivityType } from '@/app/interfaces/analytics';

export default function CourseDetail() {
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const _courseFromState = useSelector(getSelectedCourseForEdit).course;
  const [data, setData] = useState<ICourse>();
  const [sections, setSection] = useState<ISection[]>([])
  const [videos, setVideos] = useState<IVideo[]>([])
  const [author, setAuthor] = useState<IUser>();
  const [sectionId, setSectionId] = useState<string>(_courseFromState.sections[0].id)
  const [comments, setComments] = useState<IComment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [allVideos, setAllVideos] = useState<IVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [quizId, setQuizId] = useState<string>("")
  const _quizzesFromState: IQuiz[] = useSelector(getSelectedQuizForEdit).quizzes;
  const [videoId, setVideoId] = useState<string>(_courseFromState.sections[0]?.modules[0]?.videos[0]?.id)
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState<IVideo>(_courseFromState.sections[0]?.modules[0]?.videos[0])
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<any>(null);
  const [hideSidebar, setHideSidebar] = useState<boolean>(true)
  const [enrollment, setEnrollment] = useState<IEnrollment | any>()
  const [seconds, setSeconds] = useState(0);
  const userData = cookies.get("param-lms-user");
  const [loginTime, setLoginTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState<any>(null);
  const [numberOfVideos, setNumberOfVideos] = useState<number>(0)
  const [videoEnded, setVideoEnded] = useState<boolean>(false)
  const [duration, setDuration] = useState(0);
  const date = new Date();
  const dispatch = useDispatch();
  const handleDuration = (duration: any) => {
    setDuration(duration);
  };
  const formatDurationToMinutes = (durationInSeconds: any) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const HideSidebar = () => {
    setHideSidebar((prev) => !prev)
  }
  const playerRef = useRef(null);
  const router = useRouter();
  const cancelQuiz = () => {
    setOpen(false);
    if (currentVideoIndex < allVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setQuizId("");
    }
  }

  const getEnrolledCourses = async () => {
    var student = cookies.get('param-lms-user');
    const res = await Api.GET_EnrolledCoursesByStudentId(student.id);
    if (res) {
      const getEnrollment = res?.map((enroll: any) => enroll?.data)[0]
      setEnrollment(getEnrollment);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = Math.floor((currentTime - loginTime) / 1000);
      setSeconds(timeDifference);
    }, 1000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, [loginTime]);
  useEffect(() => {
    getEnrolledCourses();
    if (allVideos.length > 0) {
      const foundSection = sections.find(section =>
        section.modules.some(module =>
          module.videos.some((v: IVideo) => v.id === allVideos[currentVideoIndex].id)
        )
      );
      setSectionId(foundSection?.id!)
      setSelectedVideo(allVideos[currentVideoIndex].videoLink);
    }
  }, [allVideos, currentVideoIndex]);

  const handleVideoEnd = async () => {
    setLoginTime(Date.now()); 
    setSeconds(0);
    setVideoEnded(true)
    clearInterval(intervalId)

    const courseProgress = {
      sectionId: sectionId,
      enrollmentId: enrollment?.id,
      userId: userData?.id,
      courseId: _courseFromState?.id,
      videoId: allVideos[currentVideoIndex].id,
      videoLength: duration.toString(),
      timeSpent: seconds.toString(),
      progress: numberOfVideos / 100

    }
    const createProgress = await Api.POST_CourseProgress(courseProgress);
    const watchedVideo = {
      courseId: _courseFromState.id,
      videoId: allVideos[currentVideoIndex].id,
      creatingUserName: _courseFromState.creatingUserName,
      watched: true
    }

    dispatch(createWatchedDetail(watchedVideo))
    setOpen(false);
    setSeconds(0)
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
  function countVideosInCourse(course: ICourse) {
    let videoCount = 0;
    course?.sections.forEach((section: ISection) => {
      section?.modules.forEach((Module: IModule) => {
        videoCount += Module?.videos.length;
      });
    });
    setNumberOfVideos(videoCount)
  }
  useEffect(() => {
    countVideosInCourse(_courseFromState)
    setSection(state?.sections);
    state.sections.forEach((section: ISection) => {
      section.modules.forEach((Module: IModule) => {
        if (Module.videos.length > 0) {
          videos.push(...Module.videos);
        }
      });
    });
    setAllVideos(videos);
    setData(state);
    if (state) {
      setIsLoading(false);
    }
    getUserCourses(state?.creatingUser!);
    const fetchData = async () => {
      setAuthor(await getAuthor(state?.creatingUser!));
      var _comments = await Api.GET_CommentsByReference(state.id);
      if (_comments) {
        setComments(_comments?.map((comment) => comment.data) as any);
      }
    }
    fetchData();
  }, []);

  async function getUserCourses(id: string) {
    var userCourses = await Api.GET_CoursesByUserId(id);
  }
  const handleVideoSelect = (video: IVideo) => {
    clearInterval(intervalId); 
    setVideoEnded(true)
    setLoginTime(Date.now());
    setSeconds(0);
    const foundSection = sections.find(section =>
      section.modules.some(module =>
        module.videos.some((v: IVideo) => v.id === video.id)
      )
    );
    setSectionId(foundSection?.id!)
    const index = allVideos.findIndex((v: IVideo) => v.id === video.id);
    setSelectedVideo(_courseFromState.sections[0]?.modules[0]?.videos[index]?.videoLink);
    setCurrentVideoIndex(index);
    setVideoId(_courseFromState.sections[0]?.modules[0]?.videos[index].id);
    setVideo(_courseFromState.sections[0]?.modules[0]?.videos[index])
  };
  const openQuiz = async () => {
    const targetId = localStorage.getItem("targetId")!
    const activity: IActivity = {
      UserId: user?.id,
      ActivityType: IActivityType.QuizStart,
      Duration: 0,
      TargetId: targetId,
    }
    const createActivity = await Api.POST_Activity(activity);
    if (createActivity.data?.UserId) {
      setOpen(false);
      goToQuiz()
    }

  }
  const goToQuiz = () => {
    router.push(`/protected/student/course/quiz?id=${quizId}`);
  }

  const goToCourse = () => {
    setEnrollOpen(false);
  }

  const courseEnrollment = async (course: any) => {
    setIsLoading(true)
    const payload: IEnrollment = {
      userId: userData?.id,
      creatingUser: "65d74882251362b65ed82c2c",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      modifyingUser: _courseFromState?.modifyingUser,
      state: 0,
      courses: [course?.id],
      courseProgress: [
        {
          studentId: userData?.reference,
          courseId: _courseFromState.id,
          progress: 0,
          isCompleted: false,
          watchedVideos: []
        },
      ]

    }
    const enroll = await Api.POST_CourseEnrollment(payload);
    if (enroll) {
      setIsLoading(false);
      setEnrollOpen(true);
    }
  }

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  } else

    return (
      <div className="main">

        <div className='react-player-container'>
          <VideoPlayer
            selectedVideo={selectedVideo}
            sections={sections}
            cancelQuiz={cancelQuiz}
            openQuiz={openQuiz}
            handleVideoEnd={handleVideoEnd}
            open={open}
            handleDuration={handleDuration}
            HideSidebar={hideSidebar}
            viewSidebar={HideSidebar}
            playerRef={playerRef}
            video={video}
            videoId={videoId}

          />

          <ConfirmationModal
            open={enrollOpen}
            onConfirm={() => goToCourse()}
            onCancel={close}
            title="Congratulations"
            buttonText="Get Started"
          >
            Thank you for enrolling for the course. click get started to complete the course
          </ConfirmationModal>

          <div>
            {
              !isEnrolled ?
                <button className="btn btn-primary" onClick={() => courseEnrollment(state)}>Enroll</button>
                :
                ''
            }

          </div>
        </div>




        <div style={hideSidebar ? { width: "30%", } : { display: "none" }}>

          <VideoSibar HideSidebar={HideSidebar} duration={formatDurationToMinutes(duration)} sections={sections} handleVideoSelect={handleVideoSelect} />
        </div>

      </div>



    )
}