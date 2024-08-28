export interface Assessment {
    id? : string;
    title: string;
    courseId: string;
}

export interface Option {
    id: string ;
    label: string;
    questionId: string;
    isCorrect: boolean;
    description: string ;
  }
  
  export interface IRubric {
    id: string ;
    facilitatorScore: number;
    moderatorScore: number;
    label: number;
    description: string;
    questionId: string;
  }
  
  export interface Answer {
    questionId: string;
    description: string;
    questionType: string;
    options: Option[] | null;
    studentMultipleChoiceAnswer: Option[] | null;
    studentLongTextAnswer: string | null;
    rubrics: IRubric[];
    score: number;
  }
  
  export interface IAssessmentStudentAnswers {
    id: string;
    assessmentId: string;
    assessmentName: string | null;
    userId: string;
    answers: Answer[];
    submittedAt: string;
    fileUrl: string;
  }
  

  export interface ICourseAssessment{
    assessmentId:string;
    name: string;
    userId: string;
    datesubmitted: string;
    factilitatorMark: number;
    moderatorMark: number;
    totalMark: number;
  }

  export interface IMarkStudentAssessment {
    assessmentId: string;
    questionId: string;
    rubricId: string;
    userId: string;
    creatingUserId: string;
    mark: number;
    markType: number;
    label:number;
}

export interface ISubmitFacilitatorAssessment {
  assessmentId: string;
  studentId: string;
  facilitatorId: string;
}
