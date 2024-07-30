import { useEffect, useState } from "react";
import { NextPage } from "next";
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

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const [codes, setCodes] = useState<codeStructure[]>([]);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
      const response = await getCodes();
        setCodes(response);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const getDescription = (codeType: number, code: string) => {
    const codeCategory = codes.find(c => c.type === codeType);
    if (!codeCategory) return 'N/A';
    const codeObj = codeCategory.codes.find(c => c.code === code);
    return codeObj ? codeObj.description : 'N/A';
  };

  console.log('list', list);

  return (
    <>
      <tbody className="list" id="staff">
        <tr>
          <td>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi-house list-group-icon" /> Equity Code
              </li>
              <li className="list-group-item">
                <i className="bi-person list-group-icon" /> Nationality Code
              </li>
              <li className="list-group-item">
                <i className="bi-list-task list-group-icon" /> Home Language Code
              </li>
              <li className="list-group-item">
                <i className="bi-layers list-group-icon" /> Citizen Status Code
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Socioeconomic Code
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Disability Code
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Disability Rating
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> Immigrant Status
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> POPI Act Agreement
              </li>
              <li className="list-group-item">
                <i className="bi-people list-group-icon" /> POPI Act Date
              </li>
            </ul>
          </td>
          <td>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(1, list?.equityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(2, list?.nationalityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(3, list?.homeLanguageCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(4, list?.citizenStatusCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(5, list?.socioeconomicCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(6, list?.disabilityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(8, list?.disabilityRating)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription(9, list?.immigrantStatus)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.popiActAgree ?? 'N/A'}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {list?.popiActDate ?? 'N/A'}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableBody;