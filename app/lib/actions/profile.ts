import { GET, POST, PUT } from "../restapi/client";
import { rUserUrl, wUserUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";
import { IProfile } from "@/app/interfaces/profile";

// Fetch User Profile
export const getUserProfile = async (userId: string): Promise<{ data: IProfile | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rUserUrl}/Profile/GetUserProfile/${userId}`);
    Diagnostic("SUCCESS ON GET USER PROFILE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET USER PROFILE, returning", err);
    throw err;
  }
};

// Update User Profile
export const updateUserProfile = async (userId: string, formData: FormData) => {
  try {
    // Ensure userId is included in the formData
    formData.append('id', userId);
    const resp = await PUT(
      `${wUserUrl}/Profile/UpdateProfile`,
      formData
    );
    Diagnostic("SUCCESS ON UPDATE USER PROFILE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON UPDATE USER PROFILE, returning", err);
    throw err;
  }
};

// Create User Profile
export const createUserProfile = async (formData: FormData) => {
  try {
    const resp = await POST(
      `${wUserUrl}/Profile/AddProfile`,
      formData
    );
    Diagnostic("SUCCESS ON CREATE USER PROFILE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON CREATE USER PROFILE, returning", err);
    throw err;
  }
};
