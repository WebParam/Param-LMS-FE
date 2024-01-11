export interface IChoice{
    questionId?:string;
    id:string;
    text:string;
    isCorrect:string;
}

export interface IQuestion{
    id:string;
    text:string;
    choices:IChoice[];
    points: number

}

export interface IQuiz{
    id:string;
    questions:IQuestion[];
    reference:string;
    createdByUserId:string;
    modifiedByUserId:string;
    createdDate:string;
    modifiedDate:string;
 
}


export interface IQuizState{
    quiz : IQuiz
}

export interface IUpdateQuizDetailState{
    reference: string;
    createdByUserId: string;
    modifiedByUserId: string;
    createdDate: string;
}


export interface IUpdateQuestionDetailState {
         
    questionId:string,   
    text : string;
    points: number

    

}
