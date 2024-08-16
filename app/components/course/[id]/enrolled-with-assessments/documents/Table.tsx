
import TableBody from "./TableBody";
import { NextPage } from "next";
import { applicantDocuments } from "./data";

const Table: NextPage<{ list: applicantDocuments[] }> = ({
  list }) => {

  return (
    <>
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <TableBody list={list} />
      </table>
    </>
  );
};

export default Table;