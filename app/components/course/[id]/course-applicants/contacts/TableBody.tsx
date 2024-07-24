import { NextPage } from "next";
import list, { applicontact } from "./data";

const TableBody: NextPage<{ list: any }> = ({ list }) => {
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
            <i className="bi-house list-group-icon" />: {list?.homeAddress1??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.postalAddress1??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.postalAddress2??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.postalAddress3??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.learnerHomeAddressPostalCode??'N/A'}
          </li>
          <li className="list-group-item">
              <i className="bi-house list-group-icon" />: {list?.learnerHomeAddressPhysicalCode??'N/A'}
          </li>
          
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
