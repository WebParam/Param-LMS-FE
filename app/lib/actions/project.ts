'use server'
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";
import Cookies from "universal-cookie";

export const createProject = async (formData: FormData) => {
    const payload = {
        adminId: "1",
        programDescription: formData.get("description") as string,
        duration: formData.get("duration") as string,
        logo: formData.get("courseLogoUrl") as string,
        programTitle: formData.get("title") as string,
        state:1
    };
    Diagnostic("Payload", payload);
    let url = "";
    try {
        const resp = await post(`${wUserUrl}/OrganizationProgram/AddOrganizationProgram`, payload);
        Diagnostic("RESP", resp.data);
         const data = await resp.data;
        // const { id, title } = data;
       // url = `/protected/admin/courses/${id}?title=${title}`;
        Diagnostic("SUCCESS ON POST, returning", data);
    } catch (err) {
        Diagnostic("ERROR ON POST, returning", err);
        throw err;
    }
    
    redirect(url);
}

export const getProjects = async (adminId:string) => {
    try {
        const resp = await get(`${rUserUrl}/OrganizationProgram/GetOrganizationProgramsByAdmin/${adminId}`);
        const data = resp.data.length > 0 ? resp.data: [];
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
    } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw err;
    }
}