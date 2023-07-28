export interface IUser{
    id?: string,
    userid?: string,
    name : string,
    surname: string,
    email : string,
  
}

export interface IUserRegisterModel{
    id?: string,
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    Image : string,
    CreatedOn : Date,
    CreatedBy? : string,
    ChangedBy? : string,
    ChangedOn? : Date,
  //  Status: string,
    Otp: string,
    Role: string,
    LoginType: number,
 
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

