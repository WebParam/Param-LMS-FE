import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { NextPage } from "next";
import { ICourseAssessment } from "@/app/interfaces/assessments";

const Table: NextPage<{ list: ICourseAssessment[] }> = ({
  list }) => {

  return (
    <>
     
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <TableHead />
        <TableBody list={list} />
      </table>
    </>
  );
};

export default Table;
