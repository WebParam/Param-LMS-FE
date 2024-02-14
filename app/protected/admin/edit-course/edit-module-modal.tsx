"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FaBullseye,
  FaPencilAlt,
  FaPlus,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import {
  addVideoToModule, deleteVideoFromModule, getSelectedCourseForEdit, editVideoDetails,
} from "@/app/redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ICourse,
  IModule,
  IUpdateModuleDetailState,
  IVideo,
} from "@/app/interfaces/courses";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import {
  IChoice,
  IDeleteQuestion,
  IQuestion,
  IQuiz,
  IQuizState,
  IUpdateQuestionDetailState,
  IUpdateQuizDetailState,
} from "@/app/interfaces/quiz";
import {
  addChoices,
  createQuestion,
  createQuizDetail,
  deleteChoiceFromQuestion,
  deleteQuestion,
  getSelectedQuizForEdit,
  updateChoiceDetail,
  updateQuestionDetails,
} from "@/app/redux/quizSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

interface EditCourseModalProps {
  onClose: () => any;
  sectionId: string;
  moduleId: any;
  videoId:string
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  onClose,
  sectionId,
  videoId,
  moduleId
}) => {

  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [toggler, setToggler] = useState<Number>(1);
  const [documentName, setDocumentName] = useState<string>();
  const [questionDescription, setQuestionDescription] = useState<string>("");
  const [choiceDescription, setChoiceDescription] = useState<string>("");
  const [choiceAnswer, setChoiceAnswer] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [video, setVideo] = useState<IVideo>()
  const [countChoice, setCountChoices] = useState<number>(0);
  const [questionId, setQuestionId] = useState<any>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [questions, setQuestions] = useState<any>([]);
  const [choiceId, setChoiceId] = useState<string>("");
  const userData = cookies.get("param-lms-user");
  const [quizId, setQuizId] = useState<string>("")
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [moduleReference, setModuleReference] = useState<any>("")
  const [hideSaveChangesBtn, setHideSaveChangesBtn] = useState(false)
  const [disableModuleInputs, setDisableModuleInputs] = useState<boolean>(false)  

  const _courseFromState: ICourse = useSelector(getSelectedCourseForEdit).course;
  const _quizzesFromState: any[] = useSelector(getSelectedQuizForEdit);

  console.log("Course from state", _courseFromState);
  console.log("Quizzes from state", _quizzesFromState);

  const [_quizFromState, set_QuizFromState] = useState<IQuiz>()  



  const [choices, setChoices] = useState<any>([]);

  const [modules, setModules] = useState<IModule[]>([]);




  const [enableEditQuestion, setEnableEditQuestion] = useState<boolean>(false);

  const [pointsError, setPointsError] = useState(false);

  const [includeQuiz, setIncludeQuiz] = useState<boolean>(false);

  const [expandedSection, setExpandedSection] = useState()

  const [includeDocument, setIncludeDocument] = useState<boolean>(false);
  const [choiceError, setChoiceError] = useState(false);

  const [questionError, setQuestionError] = useState(false);

  const [hasQuiz, setHasQuiz] = useState<boolean>(false)

  const [choiceAnswerError, setChoiceAnswerError] = useState(false);

  const [isQuestionCreated, setIsQuestionCreated] = useState<boolean>(false);

  const [openChoices, setOpenChoices] = useState(false);

  const [enableUpdateChoice, setEnableUpdateChoice] = useState(false);

  const [videoTitleError, setVideoTitleError] = useState(false);
  const [videoDescError, setVideoDescError] = useState(false);
  const [videoUrlError, setVideoUrlError] = useState(false);


  const [changeEditQuizQuestionContent, setChangeEditQuizQuestionContent] =
    useState(false);

  const [editQuizQuestion, setEditQuizQuestion] = useState<boolean>(false);
  const [viewCreatedQuestion, setViewCreatedQuestion] = useState(true);

  
  const onChange = (isChecked: boolean , id : string) => {

    const choiceDetails = choices.filter((choice:IChoice) => choice.id === id)[0];
  
      const payload = {
        quizId : quizId,
        questionId:questionId,
        choiceId: id,
        choiceDescription: choiceDetails.choiceDescription,
        isCorrect: isChecked
      };
      
  
      dispatch(updateChoiceDetail(payload));
    };

  const tabSelect = (id: Number, e: any) => {
    setToggler(id);
    e.preventDefault();
  };


  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    setDate(`${year}-${month}-${day}`);
  }

  //Quiz Functions starts here
  const addQuiz = (e: any) => {
    setIncludeQuiz(false);

    const hasQuiz = _quizzesFromState.filter((quiz:IQuiz) => quiz?.videoId === videoId);
    if(hasQuiz?.length === 1 ){
      setIncludeQuiz(e.target.checked);

      setIncludeQuiz(true);

      setToggler(2);

      return
    }
    if (!videoId) {
      let _id = toast.loading("Please add video first..", {
        //loader
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIncludeQuiz(false);

      toast.update(_id, {
        render: "Please add video first",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    } else {
      if (includeQuiz) {
        tabSelect(2, e);
      } else {
        e.preventDefault();
      }
      setIncludeQuiz(e.target.checked);
      setIncludeQuiz(true);
      handleCreateQuiz();
      setToggler(2);
    }
  };

  const selectQuestionForEdit = (id: string) => {

    setViewCreatedQuestion(true);
    setEnableEditQuestion(!enableEditQuestion);
    setChangeEditQuizQuestionContent(true)

    const hasQuestion:IQuestion[] = questions.filter(
      (question: IQuestion) => question.id === id
    );
    setQuestionDescription(hasQuestion[0].questionDescription);
    setPoints(hasQuestion[0].points);
    setQuestionId(hasQuestion[0].id);
  };


  const selectChoiceForEdit = (id: string) => {
    setEnableUpdateChoice(true);
    const hasChoice = choices.filter(
      (choice: IChoice) => choice.id === id
    );
    setChoiceDescription(hasChoice[0].choiceDescription);
    setChoiceId(hasChoice[0].id);
    setChoiceAnswer(hasChoice[0].choiceAnswer);
  };


  const handleCreateQuiz = () => {
    const payload = {
      reference: moduleReference,
      createdByUserId: userData?.id,
      modifiedByUserId: userData?.id,
      createdDate: date,
      videoId: videoId,
    } as IUpdateQuizDetailState;

    dispatch(createQuizDetail(payload));
  };

  const handleCreateQuestion = () => {
    setPointsError(false);
    setQuestionError(false);
    if (questionDescription.length === 0) {
      setQuestionError(true);

      return;
    }
    const plainDescription =
      questionDescription && questionDescription.replace(/<\/?p>/gi, "");
    if (isNaN(points) || points === 0) {
      setPointsError(true);
      return;
    }
    setEnableEditQuestion(true);
    const payload = {
      questionDescription: plainDescription,
      points: points,
    } as IQuestion;
    dispatch(createQuestion(payload));
    setIsQuestionCreated(true);
  };

  const deleteQuestionFromQuizState = (id:string) => {

    const payload:IDeleteQuestion = {
      quizId,
      questionId,
 
    } 
    if(payload.questionId &&  payload.quizId ){
        dispatch(deleteQuestion(payload))
        setQuestionDescription("");
        setIsQuestionCreated(false);
        setChangeEditQuizQuestionContent(false)
        setEditQuizQuestion(false);
        setEnableEditQuestion(false)
        
        setPoints(0);
    }
  }


  const updateQuizQuestion = function () {

    setEnableEditQuestion(true);
    const plainDescription =
      questionDescription && questionDescription.replace(/<\/?p>/gi, "");
    const payload = {
      quizId : quizId,
      questionId: questionId,
      questionDescription: plainDescription,
      points: points,
    } as IUpdateQuestionDetailState;

    dispatch(updateQuestionDetails(payload));
  };

  const editChoice = () => {

    setChoiceError(false);
    setChoiceAnswerError(false);

    if (choiceDescription.length === 0) {
      setChoiceError(true);
      return;
    }

    const payload = {
      quizId : quizId,
      questionId:questionId,
      choiceId: choiceId,
      choiceDescription: choiceDescription,
      isCorrect: choiceAnswer === "true" ? true : false,
    };
   dispatch(updateChoiceDetail(payload));
    setEnableUpdateChoice(false);
    setChoiceAnswer("");
    setChoiceDescription("");
    setCountChoices(countChoice);
  };


  const handleCreateChoice = () => {
    setChoiceError(false);
    setCountChoices(countChoice + 1);
    setChoiceAnswerError(false);
    if (choiceDescription.length === 0) {
      setChoiceError(true);
      return;
    }
 

    const payload  = {
      quizId: quizId!,
      questionId: questionId!,
      choiceDescription: choiceDescription!,
      isCorrect: choiceAnswer === "true" ? true : false,
    } 
    dispatch(addChoices(payload));

    setChoiceAnswer("");
    setChoiceDescription("");
  };

  const deleteChoiceAnswer = (id:string) => {

    const payload = {
      quizId,
      questionId,
      choiceId:id
    }

    dispatch(deleteChoiceFromQuestion(payload));
    setEnableUpdateChoice(false);

    setChoiceDescription("");

    setChoiceAnswer("");
  }

  const newQuestion = () => {
    if(choices.length === 0){
      let _id = toast.loading("Please add choices first..", {
        //loader
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIncludeQuiz(false);

      toast.update(_id, {
        render: "Please add choices first",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
      return;
    }
 
if(changeEditQuizQuestionContent){
  setEditQuizQuestion(false)
  setChangeEditQuizQuestionContent(false);
}
setChangeEditQuizQuestionContent(false);
    setIsQuestionCreated(false);
    setEnableEditQuestion(!enableEditQuestion);
    setViewCreatedQuestion(false);
    setChoices([]);
    setQuestionDescription("");
    setPoints(0);
    setChoiceDescription("");
    setChoiceAnswer("");

  };
  const nextQuestion = () => {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  }

  const prevQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };
  //Quiz Functions ends here

  //Dcoument functions start here

  const handleDocument = (e: any) => { 
     const formData = new FormData();
    const file = e.target.files[0];

    if (file) {
      formData.append("document", file);
      setDocumentName(file.name);
    }
  };
  const addDocument = (e: any) => {
    setIncludeDocument(false);
    if (!videoId) {
      let _id = toast.loading("Please add video first..", {
        //loader
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIncludeDocument(false);

      toast.update(_id, {
        render: "Please add video first",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
    } else {
      if (includeDocument) {
        tabSelect(3, e);
      } else {
        e.preventDefault();
      }
      setIncludeDocument(true);
      setToggler(3);
    }
  };
  //Document functions ends here


  const moduleToolbar = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "link", "blockquote", "code", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };



  const editVideo = () => {
    setVideoDescError(false);
    setVideoTitleError(false);
    setVideoUrlError(false);
    if (
      videoTitle &&
      videoDescription && videoUrl 
     
    ) {
      const plainDescription = videoDescription
        && videoDescription.replace(/<\/?p>/gi, "")
        
      const payload = {
        moduleId,
        videoId: videoId,
        sectionId: sectionId,
        videoLink: videoUrl,
        videoTitle: videoTitle,
        videoDescription: plainDescription,
      };

      dispatch(editVideoDetails(payload));


     setDisableModuleInputs(true);
   //  setUpdateVideo(true)
     setHideSaveChangesBtn(true)
    }else{
      if(videoDescription.length < 1){
        setVideoDescError(true);
      }
      if(videoTitle.length < 1){
        setVideoTitleError(true);

      }
      if(videoUrl.length < 1){
        setVideoUrlError(true);

      }
    }
  };


  const exitModal = () => {
    setVideoDescError(false);
    setVideoTitleError(false);
    setVideoUrlError(false);
    if(videoUrl && videoTitle && videoDescription) {
      
      onClose();
    }else{
      if(videoDescription.length < 1){
        setVideoDescError(true);
      }
      if(videoTitle.length < 1){
        setVideoTitleError(true);

      }
      if(videoUrl.length < 1){
        setVideoUrlError(true);

      }
    }
  };


  useEffect(() => {
    const quiz:IQuiz[] = _quizzesFromState.filter((quiz:IQuiz) => quiz?.videoId === videoId);
    if(quiz.length > 0){
      setHasQuiz(true);
      setIncludeQuiz(true)
      setIncludeDocument(true)
      set_QuizFromState(quiz[0])
      const addQuestions =quiz[0]?.questions.filter(question => question.choices.length > 0 );
      setQuestions(addQuestions)
      setQuizId(quiz[0].id);
      setViewCreatedQuestion(false)
    }
    console.log("My Quiz", quiz[0]);
  })

  useEffect(() => {
    //each time we add a question we need a questionId of that question
    const quizQuestions = _quizFromState?.questions.map(
      (questions) => questions
    );
    if (quizQuestions && quizQuestions?.length > 0) {
      const lastQuestionId = quizQuestions?.map((question) => question.id);
      setQuestionId(lastQuestionId[quizQuestions?.length - 1]);
    }
  }, [_quizFromState?.questions]);

  useEffect(() => {
    const choices = _quizFromState?.questions.map(
      (question) => question.choices
    );

    const hasQuestion = _quizFromState?.questions?.filter(
      (question: IQuestion) => question.id === questionId
    )!;
    setChoices(hasQuestion?.length > 0 && hasQuestion[0]?.choices);
  });

  useEffect(() => {
    getTodaysDate();
    const section = _courseFromState.sections.filter(
      (section) => section.id === sectionId
    )!;

    const Module = section[0].modules.filter((Module:IModule) => Module.id === moduleId);

    const video = Module[0]?.videos.filter((video:IVideo) => video.id === videoId)!;
      if(video && video.length > 0) {
        setVideoTitle(video[0]?.title);
        setVideoDescription(video[0]?.description);
        
        setVideoUrl(video[0]?.videoLink);
        setDisableModuleInputs(true);
      }

  },[]);

  return (
  <></>
  );
};
