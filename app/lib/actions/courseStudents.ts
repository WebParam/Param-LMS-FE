import { IUpdateEnrollment } from "@/app/interfaces/Enrollment";
import { Diagnostic } from "../logger/logger";
import { get, post, put } from "../utils";
import { rAggregatorUrl, rUserUrl, wCourseUrl, wUserUrl } from "./endpoints";
import { z } from "zod";

export const getCourseStudents = async (courseId: string) => {
  try {
    const resp = await get(
      `${rAggregatorUrl}/StudentCourse/GetCourseStudents/${courseId}`
    );
    console.log(resp);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

export const updateEnrollmentStatus = async (payload: IUpdateEnrollment) => {
  try {
    const resp = await put(
      `${wCourseUrl}/Enrollments/UpdateEnrollmentStatus`,
      payload
    );
    console.log(resp);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

export const getStudentProfile = async (studentId: string) => {
  const resp = await get(`${rUserUrl}/Profile/GetUserProfile/${studentId}`);
  return resp.data;
};

export const getStudentData = async (studentId: string) => {
  const resp = await get(
    `${rUserUrl}/Student/GetStudentInformation/${studentId} `
  );
  return resp.data;
};

export const getStudentDocuments = async (studentId: string) => {
  const resp = await get(`${rUserUrl}/Documents/GetDocuments/${studentId} `);
  return resp.data;
};

export const changeDocumentStatus = async (payload: any) => {
  const resp = await put(
    `${wUserUrl}/Documents/UpdateDocumentStatus `,
    payload
  );
  return resp.data;
};

export const sendDocRejectionEmail = async (userId: string) => {
  try {
    const data = await post(
      `${wUserUrl}/Documents/SendDocumentRejectionEmail/${userId}`,
      {
        userId,
      }
    );
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }
};

const StudentInfo = z.object({
  hostEmployer: z.string().min(1, "Please Enter Host Employer Comppany Name"),
  hostPhysicalAddress: z
    .string()
    .min(1, "Please Enter Host Employer Comppany Address"),
  supervisorName: z.string().min(1, "Please Enter Host Supervisor Name"),
  supervisorSurname: z.string().min(1, "Please Enter Host Supervisor Surname"),
  supervisorCellphone: z
    .string()
    .min(1, "Please Enter Host Supervisor CellPhone"),
  supervisorEmail: z.string().min(1, "Please Enter Host Supervisor Email"),
  deploymentDate: z.string().min(1, "Please select Student Deployment Date"),
});

export type State = {
  errors?: {
    hostEmployer?: string[];
    hostPhysicalAddress?: string[];
    supervisorName?: string[];
    supervisorSurname?: string[];
    supervisorCellphone?: string[];
    supervisorEmail?: string[];
    deploymentDate?: string[];
  };
  message?: string | null;
};

export async function updateInternshipDetails(
  userId: string,
  prevState: State | undefined,
  formData: FormData
) {
  // Validate Inputs
  const validatedFields = StudentInfo.safeParse({
    hostEmployer: formData.get("hostEmployer"),
    hostPhysicalAddress: formData.get("hostPhysicalAddress"),
    supervisorName: formData.get("supervisorName"),
    supervisorSurname: formData.get("supervisorSurname"),
    supervisorCellphone: formData.get("supervisorCellphone"),
    supervisorEmail: formData.get("supervisorEmail"),
    deploymentDate: formData.get("deploymentDate"),
  });

  // Handle Validation Errors
  if (!validatedFields.success) {
    const state: State = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const {
    hostEmployer,
    hostPhysicalAddress,
    supervisorName,
    supervisorSurname,
    supervisorCellphone,
    supervisorEmail,
    deploymentDate,
  } = validatedFields.data;

  console.log("Data:",{
    userId,
    hostEmployer,
    hostPhysicalAddress,
    supervisorName,
    supervisorSurname,
    supervisorCellphone,
    supervisorEmail,
    deploymentDate,
  });
  try {
    const resp = await put(
      `${wUserUrl}/Student/UpdateStudentDeploymentInformation`,
      {
        userId,
        hostEmployer,
        hostPhysicalAddress,
        supervisorName,
        supervisorSurname,
        supervisorCellphone,
        supervisorEmail,
        deploymentDate,
      }
    );
    console.log(resp);
    const data = resp.data;
    Diagnostic("SUCCESS ON PUT, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON PUT, returning", err);
    console.error(err);
  }
}
