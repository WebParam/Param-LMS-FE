"use client";
import Table from "@/components/logbook/Table";
import { useEffect, useState } from "react";
import list from "@/components/logbook/data";
import {
  useParams,

  useSearchParams,
} from "next/navigation";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";
import Pagination from "@/components/Pagination";

const Body = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const [data, setData] = useState(list);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
  data && data.length > 0
      ? data.slice(indexOfFirstItem, indexOfLastItem)
      : [];




  return (
    <>
      <div
        className="table-responsive"
        data-toggle="lists"
        data-lists-sort-by="js-lists-values-employee-name"
        data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
      >
        <Table list={data} />

       
      </div>
      {
        
        data.length > 0 &&
        <Pagination
        listLength={data?.length}
        indexOfLastItem={indexOfLastItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ITEMSPERPAGE={ITEMSPERPAGE}
      />
      }
    </>
  );
};

export default Body;
