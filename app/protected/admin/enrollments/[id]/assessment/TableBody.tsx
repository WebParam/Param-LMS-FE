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
       <thead>
    <tr>
      <th>Year</th>
      <th>Code</th>
      <th>Assessment Name</th>
      <th>Final Mark</th>
      <th>Results</th>
    </tr>
  </thead>
  <tbody className="list" id="staff">
    <tr>
      <td>2024</td>
      <td>2001476</td>
      <td>assessment 1</td>
      <td>86%</td>
      <td>Competent</td>
    </tr>
    <tr>
      <td>2024</td>
      <td>2001434</td>
      <td>assessment 2</td>
      <td>86%</td>
      <td>Competent</td>
    </tr>
    <tr>
      <td>2024</td>
      <td>2001511</td>
      <td>assessment 2</td>
      <td>94%</td>
      <td>Competent</td>
    </tr>
    <tr>
      <td>2024</td>
      <td>2001588</td>
      <td>assessment 5</td>
      <td>94%</td>
      <td>Competent</td>
    </tr>
  </tbody>
    </>
  );
};

export default TableBody;
