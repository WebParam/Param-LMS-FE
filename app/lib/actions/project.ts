import { redirect } from "next/navigation";
import { del, get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";

export const createProject = async (formData:any) => {
    Diagnostic("Payload", formData);
    let url = "";
    try {
        const resp = await post(`${wUserUrl}/OrganizationProgram/AddOrganizationProgram`, formData);
        Diagnostic("RESP", resp.data);
         const data = await resp.data;
         console.log("data",resp)
        //  const { id, programTitle } = data;
        // url = `/protected/home/projects/${id}?title=${programTitle}`;
        Diagnostic("SUCCESS ON POST, returning", data);
    } catch (err) {
        Diagnostic("ERROR ON POST, returning", err);
        throw err;
    }
    
    redirect(url);
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

export const getProject = async (id: string) => {
    try {
      const resp = await get(`${rUserUrl}/OrganizationProgram/GetOrganizationProgram/${id}`);
  
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
      throw err;
    }
  };

  export const updateProject = async (formData: FormData) => {
    const id = formData.get("id") as string
    let url = "";
    try {
      const resp = await put(`${wUserUrl}/OrganizationProgram/UpdateOrganizationProgram`, formData);
  
      const data = await resp.data;
      const { title } = data;
      url = `/protected/home/projects/${id}?title=${title}`;
      Diagnostic("SUCCESS ON PUT, returning", data);
    } catch (err) {
      Diagnostic("ERROR ON PUT, returning", err);
      throw err;
    }
  
    redirect(url);
  };