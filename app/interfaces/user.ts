export interface IUser{
    id?: string,
    userid?: string,
    name : string,
    surname: string,
    email : string,
  
}

export interface IUserRegisterModel{
    id?: number,
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    Image : string,
    CreatedOn : Date,
    CreatedBy : number,
    ChangedBy? : number,
    ChangedOn? : Date,
 
}

export interface IUserRequestModel extends IUser{

}

export interface IUserResponseModel extends IUser{

}


export interface IUserLoginModel{
    Email:string, 
    Password:string
}


export interface IUserResetPasswordModel extends IUser{
    Email:string, 
}

