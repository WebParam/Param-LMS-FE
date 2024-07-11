import { NextPage } from "next";
import list, { applicontact } from "./data";

const TableBody: NextPage<{ list: applicontact[] }> = ({ list }) => {
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
          <i className="bi-house list-group-icon" /> Home Address 1
        </li>
        <li className="list-group-item">
          <i className="bi-person list-group-icon" /> Postal Address 1
        </li>
        <li className="list-group-item">
          <i className="bi-list-task list-group-icon" /> Postal Address 2
        </li>
        <li className="list-group-item">
          <i className="bi-layers list-group-icon" /> Postal Address 3
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> Learner Home Address Postal Code
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> Learner Home Address Physical Code
        </li>
      </ul>
      </td>
      <td>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Home_Address_1}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Postal_Address_1}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Postal_Address_2}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Postal_Address_3}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Learner_Home_Address_Postal_Code}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Learner_Home_Address_Physical_Code}
          </li>
          <li className="list-group-item">
              <i className="bi-house list-group-icon" />: {list[0].Learner_Fax_Number}
          </li>
          
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
