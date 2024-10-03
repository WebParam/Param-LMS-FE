import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
 function Table({ list }: { list: any[] }) {

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