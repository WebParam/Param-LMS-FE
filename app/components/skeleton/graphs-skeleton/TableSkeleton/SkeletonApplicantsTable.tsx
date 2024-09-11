"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import TableFilter from "./TableFilter";
import { downloadFile } from "@/app/lib/utils";
import { rUserUrl } from "@/app/lib/actions/endpoints";
import { mockData } from "./data";


function SkeletonApplicantsTable() {
  const data = mockData
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [filteredData, setFilteredData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + ITEMSPERPAGE
  );

  const downloadAsXls = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const filename = "boundless-student-data";
    const fileExtension = "xlsx";
    const status = 3;
    const url = `${rUserUrl}/Student/ExportStudentInformation/boundless/}/${status}`;
    downloadFile(url, filename, fileExtension, setLoading);
  };

  // Check the environment variable
  const isFreemium = process.env.NEXT_PUBLIC_USER === "freemium";
  const sectionTitle = isFreemium ? "Project Applicants" : "Course Applicants";

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">{sectionTitle}</div>
      </div>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button
            style={{cursor:"pointer"}}
            className="btn btn-secondary"
            disabled
          >
            Export Students
          </button>
        </div>
      </div>

      <div className="card mb-0">
        <TableFilter  setFilteredData={setFilteredData} />

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

export default SkeletonApplicantsTable;