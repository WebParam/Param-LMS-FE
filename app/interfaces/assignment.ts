export interface IAssignment {
    id: string;
    knowledgeId: string;
    title: string;
    description: string;
    rubrics: IRubric[];
    scheduledDate: string;
    isPublished: boolean;
}

export interface IRubric {
    label: string;
    description: string;
    questionId: string;
    id: string;
    facilitatorScore: number;
    moderatorScore: number;
}
