"use server";
import { post} from "../utils";
import { wAssessmentUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";
import { PUT } from "../restapi/client";

export const uploadAssignment = async (
    formData: FormData
  ) => {
    console.log("FormData", formData)
    try {
      const res = await fetch(
        "https://thooto-dev-be-assessment-write.azurewebsites.net/api/v1/Assignment/UploadAssignment",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
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
    } catch (err) {
      Diagnostic("ERROR ON POST, returning", err);
    }
  };