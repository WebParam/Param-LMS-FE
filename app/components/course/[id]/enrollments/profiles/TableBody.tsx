import { NextPage } from "next";
import list, { applicantprofile } from "./data";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
  const align = {
    section_title: "pl-48pt text-left",
    time_spent: "text-left",
    completion_rate: "text-left",
    no_of_comments: "text-center",
    points_collected: "text-center",
  };

  console.log('list',list)

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
            <i className="bi-house list-group-icon" />: {list?.firstName??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.email??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.idNumber??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.gender??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.country??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.city??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.province??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.dateOfBirth.split('T')[0]??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.phoneNumber??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.bio??"N/A"}
          </li>
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
