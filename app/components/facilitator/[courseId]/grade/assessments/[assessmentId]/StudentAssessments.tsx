"use client";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { useState } from "react";
import Table from "./Table";
import Pagination from "@/components/Pagination";

export default function StudentAssessments({ list }: { list: ICourseAssessment[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;

  const currentItems = list?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div
        className="table-responsive"
        data-toggle="lists"
        data-lists-sort-by="js-lists-values-employee-name"
        data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
      >
        <Table list={currentItems} />
      </div>

      <Pagination
        listLength={list?.length}
        indexOfLastItem={indexOfLastItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ITEMSPERPAGE={ITEMSPERPAGE}
      />
    </>
  );
}
