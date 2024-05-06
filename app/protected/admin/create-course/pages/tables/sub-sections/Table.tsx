import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { NextPage } from "next";
import { Dispatch } from "react";

const Table: NextPage<{ list: any[] , viewModal : Dispatch<any>}> = ({
  list,viewModal }) => {

  return (
    <>
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <TableHead />
        <TableBody viewModal = {viewModal}  list={list} />
      </table>
    </>
  );
};

export default Table;
