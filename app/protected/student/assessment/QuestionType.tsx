import { IAssessment, IAssessmentQuestion, IChoice } from '@/app/interfaces/assessment';
import { Dispatch, SetStateAction } from 'react';


interface QuestionTypeProps {
    question: IAssessmentQuestion;
    studentAnswer: any
    handleResponseChange: (questionId: string, e: React.ChangeEvent<HTMLInputElement> | any) => void;
    setStudentAnswer: Dispatch<SetStateAction<string | boolean | any[] | null>>;
    currentQuestion: number
    courseAssessment: IAssessment
    handleNextQuestion: () => void
    handleSubmit : () => void 
    

}

export const QuestionType = ({ question, handleResponseChange, studentAnswer, setStudentAnswer , currentQuestion, courseAssessment,handleNextQuestion,handleSubmit}: QuestionTypeProps) => {
    const QuestionType = {
        TEXT: 1,
        MULTIPLE_CHOICE: 0,
        DROPDOWN: 'dropdown',
        TEXTAREA: 'textarea',
        NUMBER_INPUT: 'number_input'
    };

    const handleSelectAnswer = (questionId: string, selectedChoices: IChoice[]) => {
        const updatedAnswers = [...studentAnswer.Answers];
        updatedAnswers.filter((answer) => answer?.questionId !== questionId);
        selectedChoices.forEach((choice) => {
            updatedAnswers.push({
                questionId,
                selectedAnswer: choice,
                userAnswer: null,
            });
        });
        setStudentAnswer({
            ...studentAnswer,
            Answers: updatedAnswers,
        });
        console.log("student", studentAnswer)
    };

    const handleCheckboxChange = (questionId: string, choice: IChoice, isChecked: boolean) => {
        const existingAnswers = studentAnswer.Answers.filter((answer: any) => answer.questionId === questionId);
        const selectedChoices = existingAnswers.length ? existingAnswers[0].selectedAnswer : null;
        let updatedChoices: IChoice[] = [];
        if (isChecked) {
            updatedChoices = selectedChoices ? [selectedChoices, choice] : [choice];
        } else {
            updatedChoices = selectedChoices ? [selectedChoices].filter((c) => c.choiceId !== choice.id) : [];
        }
        handleSelectAnswer(questionId, updatedChoices);
    };

    const renderQuestion = (question: any) => {
        switch (question.questionType) {
            case QuestionType.TEXT:
                return (
                    <div key={question.id}>
                        <div className="form-group">
                            <div className="">
                                <input
                                    id={`${question.id}`}
                                    type="text"
                                    className=""
                                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                />

                            </div>
                        </div>
                    </div>
                );
            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <div key={question.id}>
                        {question.choices.map((choice: any, ind: number) => (
                            <div className="form-group" key={ind}>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id={`customCheck${ind}`}
                                        type="checkbox"
                                        className="custom-control-input"
                                        onChange={(e) => handleCheckboxChange(question.id, choice, e.target.checked)}
                                    />
                                    <label htmlFor={`customCheck${ind}`} className="custom-control-label">
                                        {choice?.choiceDescription}
                                    </label>
                                </div>
                            </div>

                        ))}
                    </div>
                );

            case QuestionType.DROPDOWN:
                return (
                    <div key={question.id}>
                        {question.options.map((option: string, index: number) => (
                            <div className="form-group" key={index}>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="option.name"
                                        type="checkbox"
                                        className="custom-control-input"

                                    />
                                    <label htmlFor="customCheck01" className="custom-control-label">
                                        {option}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <div className="container page__container">
                <div className="page-section">
                    <div className="page-separator">
                        <div className="page-separator__text">Your Answer</div>
                    </div>
                    {currentQuestion < courseAssessment?.questions?.length ? (
                        <div>
                            {renderQuestion(question)}
                            <button onClick={handleNextQuestion} className="btn justify-content-center btn-outline-secondary w-10 w-sm-auto mb-16pt mb-sm-0">Submit</button>
                        </div>
                    ) : (
                        <div>

                            <h3> {status} </h3>
                            <form onSubmit={handleSubmit}>
                                {
                                    status === 'Submitted, successfully' ? "" : <button type="submit" className="btn justify-content-center btn-outline-secondary w-10 w-sm-auto mb-16pt mb-sm-0" >Finish</button>
                                }

                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuestionType
