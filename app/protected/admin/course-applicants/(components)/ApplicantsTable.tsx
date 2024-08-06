
"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import TableFilter from "./TableFilter";
interface TablePaginationProps {
  data: CourseApplicants[];
  courseId?: string;
}

function ApplicantsTable({ data, courseId }: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);

  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + ITEMSPERPAGE
  );


  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">Course Applicants</div>
      </div>

 
      <div className="card mb-0" style={{ height: "510px" }}>
        <TableFilter data={data} setFilteredData={setFilteredData} />

        <div className="page-separator mb-1">
          <div className="page-separator__text"></div>
        </div>

        <div className="table-responsive">
          <Table list={currentItems} />
        </div>

        <Pagination
          listLength={filteredData.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </>
  );
}

export default ApplicantsTable;
