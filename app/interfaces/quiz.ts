export interface IChoice{
    text:string;
    isCorrect:boolean;
}

export interface IQuestion{
    id:string;
    text:string;
    choices:IChoice[];
    points: 0

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