'use server'
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";

export const createProject = async (formData: FormData) => {
    const payload = {
        adminId: formData.get("adminId") as string,
        programDescription: formData.get("description") as string,
        duration: formData.get("duration") as string,
        logo: formData.get("projectLogoUrl") as string,
        programTitle: formData.get("title") as string,
        state:1
    };
    Diagnostic("Payload", payload);
    let url = "";
    try {
        const resp = await post(`${wUserUrl}/OrganizationProgram/AddOrganizationProgram`, payload);
        Diagnostic("RESP", resp.data);
         const data = await resp.data;
        url = `/protected/admin/projects/${data.id}?title=${data.programTitle}`;
        Diagnostic("SUCCESS ON POST, returning", data);
    } catch (err) {
        Diagnostic("ERROR ON POST, returning", err);
        throw err;
    }
    
    redirect(url);
}

export const updateProject = async (id: string,formData: FormData) => {
    const payload = {
        id:id,
        adminId: formData.get("adminId") as string,
        programDescription: formData.get("description") as string,
        duration: formData.get("duration") as string,
        logo: formData.get("projectLogoUrl") as string,
        programTitle: formData.get("title") as string,
        state:1
    };
    Diagnostic("Payload", payload);
    let url = "";
    try {
        const resp = await put(`${wUserUrl}/OrganizationProgram/UpdateOrganizationProgram`, payload);
        Diagnostic("RESP", resp.data);
         const data = await resp.data;
        url = `/protected/admin/projects/${data.id}?title=${data.programTitle}`;
        Diagnostic("SUCCESS ON PUT, returning", data);
    } catch (err) {
        Diagnostic("ERROR ON PUT, returning", err);
        throw err;
    }
    
    redirect(url);
}

export const getProjects = async (adminId:string) => {
    try {
        const resp = await get(`${rUserUrl}/OrganizationProgram/GetOrganizationProgramsByAdmin/${adminId}`);
        const data = resp.data.length > 0 ? resp.data: [];
        Diagnostic("SUCCESS ON GET ADMIN PROJECTS, returning", data);
        return data;
    } catch (err) {
        Diagnostic("ERROR ON GET ADMIN PROJECTS, returning", err);
        throw err;
    }
}

export const getProject = async (id:string) => {
    try {
        const resp = await get(`${rUserUrl}/OrganizationProgram/GetOrganizationProgram/${id}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON GET PROJECT BY ID, returning", data);
        return data;
    } catch (err) {
        Diagnostic("SUCCESS ON GET PROJECT BY ID, returning", err);
        throw err;
    }
}