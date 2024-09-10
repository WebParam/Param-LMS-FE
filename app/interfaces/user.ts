export interface IUser{
    id?: string,
    userid?: string,
    name : string,
    surname: string,
    email : string,
    image:string,
    summary:string,
    headLine:string
}

export interface IUserRegisterModel{
    id?: string,
    firstName : string,
    lastName : string,
    email : string,
    headLine:string,
    summary:string,
    password : string,
    image : string,
    createdOn : Date,
    createdBy? : string,
    changedBy? : string,
    changedOn? : Date,
  //  Status: string,
    Otp: string,
    role: string,
    LoginType: number,
 
}


export interface IAdminPasswordChangeReset {
    userId: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  export interface IAdminUpdateUser {
    userId: string;
    email: string;
    lastName: string;
    firstName: string;
  }
  

export interface IUserLoginModel{
    Email:string, 
    Password:string
}

export interface IUserRegisterModel{
  Email:string, 
  Password:string
}

export interface IUserRegisterFreeMiumModel{
  firstName: string,  
  lastName: string,
  username: string,
  email: string,
  password: string,
  image: string,
  role: string,
  loginType: number
}


export interface IUserResetPasswordModel {
    email:string, 
}

export interface IUserResetPasswordRequest {
  otp: string;
  email: string;
  password: string;
}
