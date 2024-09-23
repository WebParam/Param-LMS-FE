"use server"
import { del, get, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";
import { IProjectAnalytics } from "@/app/interfaces/project";

export const createProject = async (formData: any) => {
  try {
    const res = await fetch(
      `${wUserUrl}/OrganizationProgram/AddOrganizationProgram`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("SUCCESS ON POST, returning", data);
    return data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateProjectLogo = async (formData: FormData) => {
  const id = formData.get("programId");
  try {
    const res = await fetch(
      `${wUserUrl}/OrganizationProgram/UpdsteOrganizationProgramLogo/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("SUCCESS ON POST, returning", data);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const resp = await del(
      `${wUserUrl}/OrganizationProgram/DeleteOrganizationProgram?id=${id}`
    );
    const data = resp.message;
    Diagnostic("SUCCESS ON DELETE PROJECT BY ID, returning", data);
    return data;
  } catch (err) {
    Diagnostic("SUCCESS ON DELETE PROJECT BY ID, returning", err);
    throw err;
  }
};

export const getProject = async (id: string) => {
  try {
    const resp = await get(
      `${rUserUrl}/OrganizationProgram/GetOrganizationProgram/${id}`
    );

    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const getProjectAnalytics = async (id: string, value: boolean): Promise<IProjectAnalytics> => {
  try {
    const resp = await get(`${rUserUrl}/UserOrganisationProgramEnrollment/GetStudentInfoSummary/${id}?enrolled=${value}`);
    const data: IProjectAnalytics = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const updateProject = async (payload: any) => {
  try {
    const resp = await put(
      `${wUserUrl}/OrganizationProgram/UpdateOrganizationProgram`,
      payload
    );

    const data = await resp.data;
    Diagnostic("SUCCESS ON PUT, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON PUT, returning", err);
    throw err;
  }
};
