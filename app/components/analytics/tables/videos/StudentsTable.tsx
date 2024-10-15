"use client";
import React, { useState } from "react";
import Table from "./Table";
import Pagination from "@/app/components/Pagination";
import TableFilter from "./TableFilter";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface TablePaginationProps {
  data: any[];
}

function StudentsTable({ data }: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;

  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = data.slice(
    indexOfFirstItem,
    indexOfFirstItem + ITEMSPERPAGE
  );


  return (
    <>
      <div className="page-separator mt-3">
        <div className="page-separator__text">Course Students</div>
      </div>

      <div className="card mb-0" >

        <div className="page-separator mb-1">
          <div className="page-separator__text"></div>
        </div>

        <div className="table-responsive">
          <Table list={currentItems} />
        </div>

           <div className="w-100" >
          <Pagination
            listLength={data.length}
            indexOfLastItem={indexOfLastItem}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            ITEMSPERPAGE={ITEMSPERPAGE}
          />
        </div>
      </div>
    </>
  );
}

export default StudentsTable;
