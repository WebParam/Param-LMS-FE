import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { NextPage } from "next";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { Dispatch, SetStateAction } from "react";

const Table: NextPage<{ loading : boolean , list: ICourseAssessment[] }> = ({
  list,loading }) => {

  return (
    <>
     
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <TableHead />
        <TableBody loading = {loading} list={list} />
      </table>
    </>
  );
};

export default Table;
