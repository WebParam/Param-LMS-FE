import { NextPage } from "next";

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
          <i className="bi-house list-group-icon" /> Employment Status
        </li>
        <li className="list-group-item">
          <i className="bi-house list-group-icon" /> DATE OF FISA
        </li>
      </ul>
      </td>
      <td>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.employmentStatus??"N/A"}
          </li>
          <li className="list-group-item">
            <i className="bi-house list-group-icon" />: {list?.dateOfFisa??"N/A"}
          </li>

        </ul>
      </td>
      </tr>
      </tbody>
    </>
  );
};

export default TableBody;
