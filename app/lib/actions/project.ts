import { redirect } from "next/navigation";
import { del, get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";

export const createProject = async (formData: FormData) => {
  const payload = {
    adminId: formData.get("adminId") as string,
    programDescription: formData.get("description") as string,
    duration: formData.get("duration") as string,
    logo: formData.get("courseLogoUrl") as string,
    programTitle: formData.get("title") as string,
    state: 1,
  };
  Diagnostic("Payload", payload);
  try {
    const resp = await post(
      `${wUserUrl}/OrganizationProgram/AddOrganizationProgram`,
      payload
    );
    Diagnostic("RESP", resp.data);
    const data = await resp.data;
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

  redirect("/protected/home/projects");
};

export const getProjects = async () => {
    let userId;
    try {
        userId = localStorage.getItem("id");
        if (!userId) throw new Error("User ID not found in local storage.");
    } catch (err) {
        Diagnostic("ERROR ON LOCAL STORAGE ACCESS, returning", err);
        throw new Error("Local storage access failed. Make sure your browser supports local storage.");
    }

    try {
        const resp = await get(`${rUserUrl}/OrganizationProgram/GetOrganizationProgramsByAdmin/${userId}`);
        const data = resp.data;
        localStorage.setItem("number-of-projects", String(data.length));
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
    } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw new Error("Failed to fetch projects. Please try again later.");
    }
}
export const deleteProject = async (id:string) => {
    try {
        const resp = await del(`${wUserUrl}/OrganizationProgram/DeleteOrganizationProgram?id=${id}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON DELETE PROJECT BY ID, returning", data);
        return data;
    } catch (err) {
        Diagnostic("SUCCESS ON DELETE PROJECT BY ID, returning", err);
        throw err;
    }
}
