import { redirect } from "next/navigation";
import { del, get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";

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
        localStorage.setItem("len", String(data.length));
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
    } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw new Error("Failed to fetch projects. Please try again later.");
    }
}