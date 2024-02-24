 "use client"
import { Suspense, useState } from 'react';
import Cookies from 'universal-cookie';
import { Api } from '@/app/lib/restapi/endpoints';
import { ICourse, ISection, IModule, IVideo } from '@/app/interfaces/courses';
import { useEffect,useRef  } from 'react'
import {  useSelector } from "react-redux";
import { IUser } from '@/app/interfaces/user';
import { getSelectedCourseForEdit } from '@/app/redux/courseSlice';
import { getAuthor } from '@/app/lib/getAuthor';
import IComment from '@/app/interfaces/comment';
import './videoSidebar.css';
import './main.css'
import ReactPlayer from 'react-player';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import {useRouter} from "next/navigation";
import { IQuiz } from '@/app/interfaces/quiz';
import { getSelectedQuizForEdit } from '@/app/redux/quizSlice';


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
  const _quizzesFromState: IQuiz[] = useSelector(getSelectedQuizForEdit);
  const [videoId, setVideoId] = useState<string>("")
  console.log("Quizzes from state",_quizzesFromState)
  const [open, setOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const playerRef = useRef(null);

  const router = useRouter();


const cancelQuiz = () => {
  setOpen(false);
  if (currentVideoIndex < allVideos.length - 1) {
    setCurrentVideoIndex(currentVideoIndex + 1);
    setQuizId("");
  }
}

  useEffect(() => {
    // Set the initial video when the component mounts
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
        console.log("ID",currentVideoId)
        const getQuiz: IQuiz = quizzes.find((quiz: IQuiz) => quiz.videoId === currentVideoId);
        console.log("Opened Quiz", getQuiz);
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
  
    console.log("Link",sections[0]?.modules[0]?.videos[0].videoLink)
    state.sections.forEach((section:ISection) => {
        section.modules.forEach((Module:IModule) => {
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
      console.log("sections", sections)
      setAuthor(await getAuthor(state?.creatingUser!));

      // Fetch comments
      var _comments = await Api.GET_CommentsByReference(state.id);
      if (_comments) {
        setComments(_comments?.map((comment) => comment.data) as any);
        console.log("Comments", _comments);
      }
    }
    fetchData();
  }, []);
console.log("Vidoes",allVideos)

  async function getUserCourses(id: string) {
    var userCourses = await Api.GET_CoursesByUserId(id);

    console.log("Author courses", userCourses?.data);
  }

  const handleVideoSelect = (video: IVideo) => {
    const index = allVideos.findIndex((v: IVideo) => v.id === video.id);
    setSelectedVideo(video.videoLink);
    setCurrentVideoIndex(index);
  };
  

  const openQuiz = () => {
    setOpen(false);
    console.log("open quiz");
    goToQuiz()
  }

  console.log("VideoId", videoId);

  const goToQuiz = () => {

    router.push(`/protected/student/course/quiz?id=${quizId}`);
    
  
  }

    return (
      <Suspense>
    <div className="main"
    >
      
{/*IFrame start here*/}
   <div className="course-detail">
    <div className="player-wrapper" >
    <ReactPlayer
            ref={playerRef}
            url={selectedVideo}
            controls={true}
            autoPlay={true}
            
            className="react-player"
            onEnded={handleVideoEnd}
          />
        </div>
         <ConfirmationModal
        open={open}
        onConfirm={() => openQuiz()}
        onCancel={cancelQuiz}
        title="Congratulations"
        buttonText="Take Quiz"
      >
        Thank you for completing the module, We have attached a quiz to rate your understading of the module. Please click Take Quiz or cancel.
      </ConfirmationModal>
      <div className="details">
        {<h2>{sections[0]?.competency}</h2>}
        { <p className="instructor">Instructor:{state.instructor}</p> }
        { <p className="description">{sections[0]?.modules[0]?.videos[0].description}</p> }
      </div>
    </div>
{/*IFrame ends here*/}

{/*sidebar start here*/}
    <div className="video-sidebar">
    
       
          <div  className="section">
            {
              sections?.map((section:ISection,ind:number) => {
                return (
                  <div className = "sidebar-content" key={ind}>
                    <h3>{section?.title}</h3>
                    <ul>
                      {section.modules?.map((Module:IModule, moduleIndex:number) => (
                        <>
                        {
                          Module?.videos.map((video:IVideo, videoIndex:number) => (
                            <li key={moduleIndex}>
                            <div className="video-item" >
                              <i className="material-icons">format_indent_increase</i>
                              <div className="video-info">
                                <a onClick={()=>
                                {handleVideoSelect(video)}
                                }>{video?.title}</a>
                              </div>
                            </div>
                          </li>
                          ))
                        }
                        </>
                      ))}
                    </ul>
                  </div>
                )
              })
            }

          </div>
        
      
    
    </div>
{/*sidebar ends here*/}

    </div>
    </Suspense>
  )
}
