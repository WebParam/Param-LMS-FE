"use server";
import { IUpdateAssignment } from "@/app/interfaces/assignment";
import { Diagnostic } from "../logger/logger"; 
import { rAssessmentUrl, wAssessmentUrl } from "./endpoints";
import { del, get, put } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

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


export const updateAssignmentFile = async (formData: any,id:string) => {
    try {
      const res = await fetch(
        `${wAssessmentUrl}/Assignment/UploadAssignmentDocument/${id}`,
        {
          method: "PUT",
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
          Diagnostic("ERROR ON PUT, returning", "Unexpected end of JSON input");
          return;
        }
        throw jsonError;
      }
  
      Diagnostic("SUCCESS ON PUT, returning", data);
      return data; 
    } catch (err) {
      Diagnostic("ERROR ON PUT, error details:", err); 
      throw err; 
    }
  };


export const getAssignments = async (id: string) => {
  noStore();
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

  export const getStudentSubmittedAssignments = async (id: string) => {
  
    try {
      const resp = await get(
        `${rAssessmentUrl}/StudentAssignment/GetSubmittedAssignments/${id}`
      );
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
  
      console.error(err);
    }
  };

  export const deleteAssignment = async (id: string) => {
  
    try {
      const resp = await del(
        `${wAssessmentUrl}/Assignment/DeleteAssignment/${id}`
      );
      const data = resp.message;
      Diagnostic("SUCCESS ON DELETE, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON DELETE, returning", err);
  
      console.error(err);
    }
  };
  
  export const updateAssignment = async (payload:IUpdateAssignment) => {
  
    try {
      const resp = await put(
        `${wAssessmentUrl}/Assignment/UpdateAssignment`,payload
      );
      const data = resp.data;
      Diagnostic("SUCCESS ON PUT, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON PUT, returning", err);
  
      console.error(err);
    }
  };
  