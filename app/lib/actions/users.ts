"use server";
import { redirect } from "next/navigation";
import { post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { wUserUrl } from "./endpoints";

export const createUser = async (adminId: string, formData: FormData) => {
  const body = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    role: parseInt(formData.get("role") as string),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    adminId,
  };

  let url = "";
  try {
    const resp = await post(
      `${wUserUrl}/RoleManagement/AddRoleManagement`,
      body
    );
    const { data, message } = await resp;

    if (data) {
      const date = new Date().toString();
      url = `/protected/home/users?refreshId=${date}`;
    } else url = `/protected/home/users?error=${message}`;

    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

  redirect(url);
};

export const updateUser = async (userId: string, formData: FormData) => {
  const body = {
    userId,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: parseInt(formData.get("role") as string),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
  };

  let url = "";
  try {
    const resp = await put(
      `${wUserUrl}/RoleManagement/UpdateUserDetails`,
      body
    );
    const data = await resp;

    url = `/protected/home/users/${userId}?pageTitle=Edit User Info&role=${body.role}`;
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

  redirect(url);
};

export const updateUserCourses = async (
  userId: string,
  role: number,
  courseId: string,
  isAssign: boolean
) => {
  const body = {
    userId,
    role,
    courseId,
    isAssign,
  };

  let url = "";
  try {
    const resp = await put(`${wUserUrl}/RoleManagement/UpdateCourses`, body);
    const data = await resp.data;

    url = `/protected/home/users/${userId}/manage-courses?pageTitle=Manage Courses&role=${role}`;
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

  redirect(url);
};
