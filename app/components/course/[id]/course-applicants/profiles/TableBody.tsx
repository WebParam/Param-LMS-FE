import { NextPage } from "next";
import list, { applicantprofile } from "./data";
import { getCodes } from "@/app/lib/actions/course";
import { useEffect, useState } from "react";

interface Code {
  code: string;
  description: string;
}

export interface codeStructure {
  id: string;
  type: number;
  codes: Code[];
}

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  let studentName = "";
  if (list && list.firstName && list.surname)
    studentName = list.firstName + " " + list.surname;
  else studentName = "N/A";

  const [codes, setCodes] = useState<codeStructure[]>([]);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await getCodes();
        setCodes(response);
        console.log("Fetched codes:", response);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const getDescription = (codeType: number, code: string) => {
    console.log(`Getting description for type: ${codeType}, code: ${code}`);
    const codeCategory = codes.find((c: any) => c.type === codeType);
    if (!codeCategory) {
      console.log(`No category found for type: ${codeType}`);
      return 'N/A';
    }
    const codeObj = codeCategory.codes.find(c => c.code === code);
    if (!codeObj) {
      console.log(`No code object found for code: ${code} in type: ${codeType}`);
    }
    return codeObj ? codeObj.description : 'N/A';
  };

  return (
    <>
      <tbody className="list" id="staff">
        <tr>
          <td>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi-house list-group-icon" /> Full Name
              </li>
              <li className="list-group-item">
                <i className="bi-person list-group-icon" /> Email
              </li>
              <li className="list-group-item">
                <i className="bi-list-task list-group-icon" /> ID Number
              </li>
              <li className="list-group-item">
                <i className="bi-layers list-group-icon" /> Gender
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Country
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> City
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Province
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Date of Birth
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Mobile Number
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Bio
              </li>
            </ul>
          </td>
          <td>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {studentName}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.email ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.idNumber ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(4, list?.gender) ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(2, list?.country) ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.city ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(5, list?.province) ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.dateOfBirth?.split('T')[0] ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.phoneNumber ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.bio ?? "N/A"}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableBody;