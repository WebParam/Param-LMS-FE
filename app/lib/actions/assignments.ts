"use server";
import { Diagnostic } from "../logger/logger"; 
import { rAssessmentUrl, wAssessmentUrl } from "./endpoints";
import { get } from "./utils";

export const uploadAssignment = async (formData: any) => {
  try {
    const res = await fetch(
      `${wAssessmentUrl}/Assignment/UploadAssignment`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Client-Key': process.env.NEXT_PUBLIC_CLIENTKEY || '', 
        },
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${res.statusText}`);
    }

    let data;
    try {
      data = await res.json(); 
    } catch (jsonError) {
      if (jsonError instanceof SyntaxError) {
        Diagnostic("ERROR ON POST, returning", "Unexpected end of JSON input");
        return;
      }
      throw jsonError;
    }

    Diagnostic("SUCCESS ON POST, returning", data);
    return data; 
  } catch (err) {
    Diagnostic("ERROR ON POST, error details:", err); 
    throw err; 
  }
};


export const getAssignments = async (id: string) => {
  
    try {
      const resp = await get(
        `${rAssessmentUrl}/Assignment/GetAssignments/${id}`
      );
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
  
      console.error(err);
    }
  };
  


