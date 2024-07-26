"use client";
import React, { useState, useEffect, useCallback } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import debounce from "lodash.debounce";

interface TablePaginationProps {
  data: CourseApplicants[];
  courseId?: string;
}

function TablePagination({ data, courseId }: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setFilteredData(
        data.filter((applicant) =>
          Object.values(applicant).some((value) =>
            String(value).toLowerCase().includes(term.toLowerCase())
          )
        )
      );
    }, 300),
    [data]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  function downloadAsXls(e: any) {
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
  }

  return (
    <>
      <div className="form-outline mb-2">
        <input
          placeholder="Search"
          type="text"
          className="form-control"
          id="datatable-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card mb-0">
        <div className="table-responsive">
          <Table list={currentItems!} />
        </div>

        <Pagination
          listLength={filteredData?.length!}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    
        <button
          className="btn btn-primary enrolBtn m-3"
          onClick={downloadAsXls}
          style={{ cursor: "pointer" }}
        >
          {loading ? (
            <div className="spinner-border text-white" role="status" />
          ) : (
            "Download As XLS"
          )}
        </button>
    
    </>
  );
}

export default TablePagination;
