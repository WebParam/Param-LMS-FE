import { NextPage } from "next";
import list, { applicantDemographics } from "./data";
import { codes } from "./data";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  const getDescription = (codeType:any, code:any) => {
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
                <i className="bi-house list-group-icon" />: {getDescription("Equity Code", list?.equityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Nationality Code Allowed", list?.nationalityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Home Language Code", list?.homeLanguageCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Citizen Resident Status Code", list?.citizenStatusCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Socioeconomic Status Code", list?.socioeconomicCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Disability Status Code", list?.disabilityCode)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Disability Rating", list?.disabilityRating)}
              </li>
              <li className="list-group-item">
                <i className="bi-house list-group-icon" />: {getDescription("Immigrant Status", list?.immigrantStatus)}
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