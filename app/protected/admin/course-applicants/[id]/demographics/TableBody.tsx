import { NextPage } from "next";
import list, { applicantDemographics } from "./data";

const TableBody: NextPage<{ list: applicantDemographics[] }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

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
            <i className="bi-house list-group-icon" />: {list[0].Equity_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Nationality_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Home_Language_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Citizen_Status_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Socioeconomic_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Disability_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Disability_Rating}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Immigrant_Status}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].POPI_Act_Agreement}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].POPI_Act_Date}
          </li>
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
