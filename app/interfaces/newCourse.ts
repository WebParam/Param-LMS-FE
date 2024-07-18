export interface INewCourse {
    id: string;
    title: string;
    description: string;
    unitsStandards: IUnitStandard[];
    createdDate: string,
    creatingUser?: string,
    creatingUserName: string,
    state: number,
    logo: string,
    instructorId: string,
    instructorName: string,
    modifyingUser: string
}

export interface INewCourseState {
    course: INewCourse
}
export interface IUpdateNewCourseDetailState {
    title: string,
    description: string,
    logo : string;
    instructorId:string;
    instructorName:string;
}

export interface IUnitStandard {
    id: string;
    title: string;
    courseId: string;
    order: number;
    state: number,
    creatingUser: string,
    modifiedDate: string,
    modifyingUser: string,
    createdDate: string,
    documents: IDocument[];
}


export interface IDocument {
    id: string;
    title: string;
    unitStandardId: string;
    paraphased: boolean;
    order: number,
    state: number;
    subdocuments: ISubDocument[];
    creatingDate: string;
    creatingUser: string;
    modifyingUser: string,
    modifiedDate: string,
    
}

export interface ISubDocument {
    id: string;
    title: string;
    documentId: string;
    edited: boolean;
    order: number,
    state: number;
    videos: IVideo[];
    audios : IAudio[]
    creatingDate: string;
    creatingUser: string;
    modifyingUser: string,
    modifiedDate: string,
}


export interface IVideo {
    id: string;
    title: string;
    subDocumentId: string,
    videoLink: string;
    duration: string;
    order: number,
    state: number,
    createdDate: string,
    creatingUser: string,
    modifiedDate: string,
    modifyingUser: string,
    size: string,
    viewed?: boolean;
}

export interface IAudio {
    id: string;
    title: string;
    subDocumentId: string,
    audioLink: string;
    duration: string;
    order: number,
    state: number,
    createdDate: string,
    creatingUser: string,
    modifiedDate: string,
    modifyingUser: string,
    size: string,
    confirmAudio : boolean;
    viewed?: boolean;
}