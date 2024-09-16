"use client";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import TableFilter from "./TableFilter";
import { mockData } from "./data";
import { useSearchParams } from "next/navigation";


function SkeletonApplicantsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [filteredData, setFilteredData] = useState(mockData);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId")!;
  const [isFreemium, setIsFreemium] = useState();
  
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfFirstItem + ITEMSPERPAGE
  );

  // Check the environment variable
  const sectionTitle = isFreemium ? "Project Applicants" : "Course Applicants";

    useEffect(() => {
      const localValue = localStorage.getItem("isFreemium")!;
      const value = JSON.parse(localValue) ?? false;
      setIsFreemium(value);
    }, [refreshId]);

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
