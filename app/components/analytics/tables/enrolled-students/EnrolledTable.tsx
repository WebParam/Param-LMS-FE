"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import TableFilter from "./TableFilter";
import { downloadFile } from "@/app/lib/utils";
import { rUserUrl } from "@/app/lib/actions/endpoints";
interface TablePaginationProps {
  data: CourseApplicants[];
  courseId?: string;
}

function EnrolledTable({ data, courseId }: TablePaginationProps) {
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

  const downloadAsXls = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const filename = "boundless-student-data";
    const fileExtension = "xlsx";
    const status = 0;
    const url = `${rUserUrl}/Student/ExportStudentInformation/boundless/${courseId}/${status}`;
    downloadFile(url, filename, fileExtension, setLoading);
  };

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">Enrolled Students - Exports and Downloads</div>
      </div>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        {/* <div className="mx-1">
          <button
            onClick={downloadAsXls}
            style={{ cursor: data.length > 0 ? "pointer" : "" }}
            className={`btn ${
              data.length > 0 ? "btn-success" : "btn-secondary"
            }`}
            disabled={!(data.length > 0)}
          >
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              "Export Students"
            )}
          </button>
        </div> */}
        
        <div className="mx-1">
          <a target="_blank" href={"https://res.cloudinary.com/dfqdgktky/raw/upload/v1728835556/Student_Export_668fcf681a1ce7b0635b61c6_14102024_f8pi9y.xlsx"}>
            <span className="btn btn-secondary">Export Student Data </span>
          </a>
          </div>
          <div className="mx-1">
          <a target="_blank" href={"https://res.cloudinary.com/dfqdgktky/raw/upload/v1728835598/ATR_Export_668fcf681a1ce7b0635b61c6_14102024_e30z21.xls"}>
            <span className="btn btn-secondary">Export ATR</span>
          </a>


        </div>
      </div>

      <div className="card mb-0">
        <TableFilter data={data} setFilteredData={setFilteredData} />

        <div className="page-separator mb-1">
          <div className="page-separator__text"></div>
        </div>

        <Table list={currentItems} />

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

export default EnrolledTable;
