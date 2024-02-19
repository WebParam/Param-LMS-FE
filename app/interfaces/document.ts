export interface IDocument {
    creatingUser: string;
    createdDate: string;
    modifyingUser: string;
    reference: string;
    title: string;
    url: string;
    state: number;
    document:any
}

export interface IDocumentState{
    document : IDocument
}

export interface IUpdateDocumentDetailState {
    title: string, 
    createdDate: string;
    modifyingUser: string;
    reference: string;
    url: string;
    document : any
}
