import NotificationHeader from "./NotificationHeader";
import TableBody from "./TableBody";
import { NextPage } from "next";

const Table: NextPage = () => {

  return (
    <>
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <NotificationHeader />
        {/* <TableBody list={list} /> */}
      </table>
    </>
  );
};

export default Table;
