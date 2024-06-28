export interface IQuestion {
    id? : string;
    title: string;
    description: string;
    questionType: string;
    score: string;
}

export interface IOption {
    id? : string;
    label: string;
    description: string;
    questionId: string;
    isCorrect: string;
}