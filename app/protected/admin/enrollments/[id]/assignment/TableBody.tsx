import { NextPage } from "next";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  console.log('list', list)

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
            <i className="bi-house list-group-icon" />: {list?.equityCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.nationalityCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.homeLanguageCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.citizenStatusCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.socioeconomicCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.disabilityCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.disabilityRating??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.immigrantStatus??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.popiActAgree??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.popiActDate??'N/A'}
          </li>
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
