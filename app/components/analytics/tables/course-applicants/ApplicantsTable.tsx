"use client";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import TableFilter from "./TableFilter";
import { downloadFile } from "@/app/lib/utils";
import { rUserUrl } from "@/app/lib/actions/endpoints";
interface TablePaginationProps {
  data: any[];
  courseId?: string;
}

function ApplicantsTable({ data, courseId }: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [entity, setEntity] = useState("Course");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USER === "freemium") {
      setEntity("Project");
    }
  }, []);

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
    const url = `${rUserUrl}/Student/ExportStudentInformation/boundless/${courseId}/${status}`;
    downloadFile(url, filename, fileExtension, setLoading);
  };

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">{entity} Applicants</div>
      </div>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
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
        </div>
      </div>

      <div className="card mb-0">
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
