"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import list from "./data";
import { usePathname } from "next/navigation";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const [data, setData] = useState<any>()
  const pathname = usePathname();

  async function studentInformation() {
    const id = pathname.split('/')[4];
    console.log('id from parameter', id)
    const response = await getStudentDocuments(id)
    console.log('response', response)
    setData(response)
  }

  useEffect(() => {
    studentInformation()
  }, [])


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
    </>
  );
};

export default Body;
