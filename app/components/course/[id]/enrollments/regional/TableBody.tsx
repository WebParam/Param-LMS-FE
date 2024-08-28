import { NextPage } from "next";
import list, { applicantRegional } from "./data";

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
          <i className="bi-house list-group-icon" /> STATSSA Area Code
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> SDP Accreditation Number
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> Skills Programme ID
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> Learner Enrolled Date
        </li>
      </ul>
      </td>
      <td>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.statssAreaCode??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.sdpAcreditationNumber??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.skillsProgrammeId??'N/A'}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.learnerEnrolledDate??'N/A'}
          </li>
        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
