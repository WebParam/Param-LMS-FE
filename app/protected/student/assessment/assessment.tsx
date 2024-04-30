"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './assessment.css'
import { useSearchParams } from 'next/navigation';
import { IActivity, IActivityType } from '@/app/interfaces/analytics';
import QuestionType from './QuestionType';
import Header from './Header';
import { AssessmentApi } from '@/app/lib/restapi/endpoints/assessments.api';
import { CourseApi } from '@/app/lib/restapi/endpoints/courses.api';
import { AnalyticsApi } from '@/app/lib/restapi/endpoints/analytics.api';

const CourseAssessment = (props: any) => {
    const cookies = new Cookies();
    const searchParams = useSearchParams();
    const user = cookies.get('param-lms-user');
    const assessmentId = searchParams.get("id")
    const [courseAssessment, setAssessment] = useState<any>();
    const assessmentStartTime = Date.now();
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState<any>(true);
    const [targetId, setTargetId] = useState<string>("")
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [status, setStatus] = useState<any>('All questions answered. Submit the assessment.')
    const [courseInfo, setCourse] = useState<any>();
    const [studentAnswer, setStudentAnswer] = useState<any>({
        AssessmentId: assessmentId,
        StudentId: user?.reference,
        Answers: [],
        SubmittedAt: new Date().toISOString(),
    });


    async function getSelectedCourse(id: string) {
        try {
            const course = await CourseApi.GET_CourseById(id);
            setCourse(course.data);
        }
        catch (error) {
            console.error("Error fetching course:", error);
        }
    }

    async function getCourseAssessment(id: string) {
        
        try {
            const assessment = await AssessmentApi.GET_CourseAssessment(id);
            debugger;
            if (assessment) {
                setLoading(false)
                setAssessment(assessment);
                setStudentAnswer({
                    AssessmentId: assessment.id,
                    StudentId: user?.id,
                    Answers: [],
                    SubmittedAt: new Date().toISOString(),
                })
                getSelectedCourse(`${assessment?.courseId}`)

            } else {
                console.log("No assessment found");
            }
        } catch (error) {
            console.error("Error fetching assessments:", error);
        }
    }

    const handleResponseChange = (questionId: string, value: any) => {
        const updatedAnswers = [...studentAnswer.Answers];
        const filteredAnswers = updatedAnswers.filter(answer => answer?.questionId !== questionId);
        filteredAnswers.push({
            questionId,
            userAnswer: value,
            selectedAnswer: {},
        });
        setStudentAnswer({
            ...studentAnswer,
            Answers: filteredAnswers,
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion !== courseAssessment?.questions.length) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1)
        }
    };

    const handleSubmit = async () => {
        console.log('Submitted Responses:', studentAnswer);
        setLoading(true)
        const submitAssessment = await AssessmentApi.POST_StudentAnswers(studentAnswer);
        if (submitAssessment) {
                      
            const activity = {
                UserId: user?.id,
                from:  localStorage.getItem("assessmentStartTime")!,
                to: new Date().toISOString(),
                ActivityType: IActivityType.AssessmentEnd,
                Duration: 0,
                TargetId: localStorage.getItem("targetId")!
              };
            const createActivity = await AnalyticsApi.POST_Activity(activity);
            if (createActivity.data?.id) {
                setLoading(false);
                setStatus("Submitted, successfully")
            }

        }
    };

    useEffect(() => {
        localStorage.setItem("assessmentStartTime",new Date().toISOString() )
        getCourseAssessment(`${assessmentId}`);
    }, []);

    useEffect(() => {
        let timer : any;
        const updateDuration = () => {
          const currentTime = Date.now();
          const timeDifference = Math.floor((currentTime - assessmentStartTime) / 1000);
          setDuration(timeDifference);
           timer = setTimeout(updateDuration, 1000);
        };
            updateDuration();
            return () => clearTimeout(timer);
      }, [assessmentStartTime]);
    


    return (

        <div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div
                    className="mdk-drawer-layout__content page-content" style={{ order: 0 }}
                >
                    <Header courseAssessment={courseAssessment}
                        currentQuestion={currentQuestion}
                        courseInfo={courseInfo} />

                    <QuestionType currentQuestion={currentQuestion}
                        courseAssessment={courseAssessment}
                        handleNextQuestion={handleNextQuestion}
                        handleSubmit={handleSubmit} setStudentAnswer={setStudentAnswer}
                        handleResponseChange={handleResponseChange}
                        studentAnswer={studentAnswer}
                        question={courseAssessment?.questions[currentQuestion]} />

                </div>
            )}
        </div>

    );
};

export default CourseAssessment;
