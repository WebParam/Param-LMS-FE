import { NextPage } from "next";
import list, { applicantprofile } from "./data";

const TableBody: NextPage<{ list: applicantprofile[] }> = ({ list }) => {
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
            <i className="bi-house list-group-icon" />: {list[0].Full_name}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Email_Address}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].ID_Number}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Gender}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Country}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].City}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Province}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Date_Of_Birth}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Mobile_Number}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list[0].Bio}
          </li>
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
