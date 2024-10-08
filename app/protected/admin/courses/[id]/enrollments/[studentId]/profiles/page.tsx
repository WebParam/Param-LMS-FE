"use client";
import { useEffect, useState } from "react";
import { getStudentData, getStudentProfile } from "@/app/lib/actions/courseStudents";
import { useParams, useSearchParams } from "next/navigation";
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
    const response = await getStudentData(studentId);
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
    <>
      <div className="row w-100 py-4 px-5">
        <div className="col-12">
          <h5>Profile</h5>
        </div>
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

      <div className="row w-100 py-4 px-5">
        <div className="col-12">
          <h5>Demographics</h5>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Equity Code:</h6>
          <div>{getDescription(1, data?.equityCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Nationality Code:</h6>
          <div>{getDescription(2, data?.nationalityCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Home Language Code:</h6>
          <div>{getDescription(3, data?.homeLanguageCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Citizen Status Code:</h6>
          <div>{getDescription(4, data?.citizenStatusCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Socioeconomic Code:</h6>
          <div>{getDescription(5, data?.socioeconomicCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Disability Code:</h6>
          <div>{getDescription(6, data?.disabilityCode) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Disability Rating:</h6>
          <div>{getDescription(8, data?.disabilityRating) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Immigrant Status:</h6>
          <div>{getDescription(9, data?.immigrantStatus) ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>POPI Act Agreement:</h6>
          <div>{data?.popiActAgree ?? "N/A"}</div>
        </div>{" "}
        <div className="col-4 p-3">
          <h6>POPI Act Date:</h6>
          <div>{data?.popiActDate ?? "N/A"}</div>
        </div>
      </div>

      <div className="row w-100 py-4 px-5">
        <div className="col-12">
          <h5>Contact Details</h5>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Home Address 1:</h6>
          <div>{data?.homeAddress1 ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Postal Address 1:</h6>
          <div>{data?.postalAddress1 ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Postal Address 2:</h6>
          <div>{data?.postalAddress2 ?? "N/A"}</div>
        </div>
        <div className="col-4 p-3">
          <h6>Postal Address 3:</h6>
          <div>{data?.postalAddress3 ?? "N/A"}</div>
        </div>
        <div className="col-4 p-3">
          <h6>Learner Home Address Postal Code:</h6>
          <div>{data?.learnerHomeAddressPostalCode ?? "N/A"}</div>
        </div>
        <div className="col-4 p-3">
          <h6>Learner Home Address Physical Code:</h6>
          <div>{data?.learnerHomeAddressPhysicalCode ?? "N/A"}</div>
        </div>
      </div>

      <div className="row w-100 py-4 px-5">
        <div className="col-12">
          <h5>Regional</h5>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>STATSSA Area Code:</h6>
          <div>{data?.statssAreaCode ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>SDP Accreditation Number:</h6>
          <div>{data?.sdpAcreditationNumber ?? "N/A"}</div>
        </div>
        <div style={{ borderBottom: "1px solid black" }} className="col-4 p-3">
          <h6>Skills Programme ID:</h6>
          <div>{data?.skillsProgrammeId ?? "N/A"}</div>
        </div>
        <div className="col-4 p-3">
          <h6>Learner Enrolled Date:</h6>
          <div>{data?.learnerEnrolledDate ?? "N/A"}</div>
        </div>
      </div>

      <div className="row w-100 py-4 px-5">
        <div className="col-12">
          <h5>Employment</h5>
        </div>
        <div className="col-4 p-3">
          <h6>Employment Status:</h6>
          <div>{data?.employmentStatus ?? "N/A"}</div>
        </div>
        <div className="col-4 p-3">
          <h6>DATE OF FISA:</h6>
          <div>{data?.dateOfFisa ?? "N/A"}</div>
        </div>
      </div>
    </>
  );
};

export default Body;
