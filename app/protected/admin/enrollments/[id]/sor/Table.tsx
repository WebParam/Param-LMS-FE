
import { NextPage } from "next";

const Table: NextPage<{ list: any[] }> = ({
  list }) => {

  return (
    <>
      <table className="table mb-0 thead-border-top-0 table-nowrap">
      <thead>
          <tr>
            <th>Year</th>
            <th>Code</th>
            <th>Knowledge Module</th>
            <th>Final Mark</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody className="list" id="staff">
          <tr>
            <td>2024</td>
            <td>20014</td>
            <td>Business Management</td>
            <td>86%</td>
            <td>Competent</td>
          </tr>
          <tr>
            <td>2024</td>
            <td>20015</td>
            <td>Communication</td>
            <td>94%</td>
            <td>Competent</td>
            <td><i className="Edit"></i></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
