export interface IAssignment {
    id: string;
    knowledgeId: string;
    title: string;
    description: string;
    rubrics: IRubric[];
    scheduledDate: string;
    blobUrl?:string;
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


export interface IUpdateAssignment {
    id: string;
    title?: string;
    description?: string;
    scheduledDate?: string;
    isPublished?: boolean;
}

export interface IStudentSubmittedAssignments {
    id: string;
    knowledgeId: string;
    title: string;
    description: string;
    blobUrl: string;
    rubrics: {
      label: string;
      description: string;
      questionId: string;
      id: string;
      facilitatorScore: number;
      moderatorScore: number;
      facilitatorId: string;
      moderatorId: string;
      facilitatorMarkDate: string;
      moderatorMarkDate: string;
      moderatorFeedBack: string;
    }[];
    scheduledDate: string;
    isPublished: boolean;
  }
  