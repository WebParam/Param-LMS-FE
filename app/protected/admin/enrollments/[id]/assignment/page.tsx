"use client";
import Table from "./Table";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";

const Body = () => {
  const [data, setData] = useState<any>()
  const pathname = usePathname();

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
        <button 
        className="btn btn-primary primary btn-dark enrolBtn m-2" 
        style={{cursor:'pointer'}}
      >
        Download
      </button> 
    </>
  );
};

export default Body;
