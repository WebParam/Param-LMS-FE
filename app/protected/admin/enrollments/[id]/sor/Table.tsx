
import TableBody from "./TableBody";
import { NextPage } from "next";

const Table: NextPage<{ list: any[] }> = ({
  list }) => {

  return (
    <>
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        {/* <TableBody list={list} /> */}
        <h3>SOR</h3>
      </table>
    </>
  );
};

export default Table;