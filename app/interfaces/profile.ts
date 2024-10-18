export interface IProfile {
  userId: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  idNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  province?: string;
  city?: string;
  profilePicture?: string;
  coverPicture?: string;
  bio?: string;
  id?: string;
  signature?: any;
  dateCreated?: string;
  dateModified?: string;
}

export interface Details {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
  existingDetails: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  };
}