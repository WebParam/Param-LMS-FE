export interface IChoice{
    quizId?: string;
    questionId?:string;
    id:string;
    order:number;
    choiceDescription:string;
    isCorrect:boolean;
}

export interface IQuestion{
    id:string;
    questionDescription:string;
    choices:IChoice[];
    points: number
    order:number;

}

export interface IDeleteQuestion {
 quizId?:string;
 questionId?:string;

}
export interface IDeleteChoice {
 quizId?:string;
 questionId?:string;
 choiceId?:string   
}

export interface IUpdateQuestionDetail{
    questionId:string;
    questionDescription:string;
    points:number
}

export interface IQuiz{
    id:string;
    questions:IQuestion[];
    reference?:string;
    createdByUserId:string;
    modifiedByUserId:string;
    createdDate:string;
    modifiedDate:string;
    moduleId?:string;
}


export interface IQuizState{
    quizzes : IQuiz[]
}

export interface IUpdateQuizDetailState{
    reference?: string;
    createdByUserId: string;
    modifiedByUserId: string;
    createdDate: string;
    moduleId?: string;
    modifiedDate:string;    
}

export interface IUpdateQuizReference{
    quizId: string;
    moduleId?: string;
}

export interface IUpdateQuestionDetailState {
    quizId : string;     
    questionId:string,   
    questionDescription : string;
    points: number

    

}
