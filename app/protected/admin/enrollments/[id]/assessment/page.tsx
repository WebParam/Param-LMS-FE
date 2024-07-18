"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";


const Body = () => {
  const pathname = usePathname();
  const [data, setData] = useState([]);

  async function studentInformation() {
    const id = pathname.split('/')[4];
    console.log('id from parameter', id)
    const response = await getStudentData(id)
    console.log('response', response)
    setData(response)
  }

useEffect(() => {
  // studentInformation()
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
