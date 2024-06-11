export interface IDocument {
    id: string,
    name: string,
    fileBlobUrl: string,
    moduleId: string,
    status: string,
    isSystemGenerated: boolean
    noOfConfirmedParapharases: number;
    noOfParapharases: number;
    noOfAudios: number;
    noOfVideoLinks: number;
}

export interface IUpdateDocumentName{
    documentId : string;
    documentName : string;
    noOfQuizzes?: number;
}