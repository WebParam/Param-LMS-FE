"use client";
import Table from "@/components/course/[id]/course-applicants/profiles/Table";
import { useEffect, useState } from "react";
import data from "@/components/course/[id]/course-applicants/profiles/data";
import { getStudentProfile } from "@/app/lib/actions/courseStudents";
import { useParams } from "next/navigation";
import { getCodes } from "@/app/lib/actions/course";
interface Code {
  code: string;
  description: string;
}

export interface codeStructure {
  id: string;
  type: number;
  codes: Code[];
}

const Body = () => {
  const [data, setData] = useState<any>();
  const [codes, setCodes] = useState<codeStructure[]>([]);
  let studentName = "";
  if (data && data.firstName && data.surname)
    studentName = data.firstName + " " + data.surname;
  else studentName = "N/A";

  const { studentId } = useParams<{ studentId: string }>();

  const studentInformation = async () => {
    const response = await getStudentProfile(studentId);
    setData(response);
    localStorage.setItem("email", response.email);
  };

  const fetchCodes = async () => {
    try {
      const response = await getCodes();
      setCodes(response);
      console.log("Fetched codes:", response);
    } catch (error) {
      console.error("Error fetching codes:", error);
    }
  };

  const getDescription = (codeType: number, code: string) => {
    console.log(`Getting description for type: ${codeType}, code: ${code}`);
    const codeCategory = codes.find((c: any) => c.type === codeType);
    if (!codeCategory) {
      console.log(`No category found for type: ${codeType}`);
      return "N/A";
    }
    const codeObj = codeCategory.codes.find((c) => c.code === code);
    if (!codeObj) {
      console.log(
        `No code object found for code: ${code} in type: ${codeType}`
      );
    }
    return codeObj ? codeObj.description : "N/A";
  };

  useEffect(() => {
    studentInformation();
    fetchCodes();
  }, []);

  return (
    <div className="row w-100 py-4 px-5">
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Full Name:</h6>
        <div>{studentName}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Email:</h6>
        <div>{data?.email ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>ID Number:</h6>
        <div>{data?.idNumber ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Gender:</h6>
        <div>{getDescription(4, data?.gender) ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Country:</h6>
        <div>{getDescription(2, data?.country) ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>City:</h6>
        <div>{data?.city ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Province:</h6>
        <div>{getDescription(5, data?.province) ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Date of Birth:</h6>
        <div>{data?.dateOfBirth?.split("T")[0] ?? "N/A"}</div>
      </div>
      <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
        <h6>Mobile Number:</h6>
        <div>{data?.phoneNumber ?? "N/A"}</div>
      </div>
      <div className="col-12 p-3">
        <h6>Bio:</h6>
        <div>{data?.bio ?? "N/A"}</div>
      </div>
    </div>
  );
};

export default Body;
