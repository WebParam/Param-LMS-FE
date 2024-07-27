"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import TableFilter from "./TableFilter";
interface TablePaginationProps {
  data: CourseApplicants[];
  courseId?: string;
}

function TablePagination({ data, courseId }: TablePaginationProps) {
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
    fetch(
      `https://khumla-dev-user-read.azurewebsites.net/api/Student/ExportStudentInformation/${courseId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsData = XLSX.utils.sheet_to_json(worksheet);
          const newWorkbook = XLSX.utils.book_new();
          const newWorksheet = XLSX.utils.json_to_sheet(xlsData);
          XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");
          const xlsArray = XLSX.write(newWorkbook, {
            bookType: "xlsx",
            type: "array",
          });
          const xlsBlob = new Blob([xlsArray], {
            type: "application/octet-stream",
          });
          saveAs(xlsBlob, "students.xlsx");
          setLoading(false);
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => console.error("Error downloading XLS file:", error));
  };

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">Course Applicants</div>
      </div>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button
            className="btn btn-success"
            onClick={downloadAsXls}
            style={{ cursor: "pointer" }}
          >
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              "Export Students"
            )}
          </button>
        </div>
      </div>

      <div className="card mb-0" style={{ height: "400px" }}>
        <TableFilter data={data} setFilteredData={setFilteredData} />
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

export default TablePagination;
