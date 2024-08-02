"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/enrollments/student-details/profiles/Table";
import { useEffect, useState } from "react";
import list from "@/components/course/[id]/enrollments/student-details/profiles/data";
import { getStudentProfile } from "@/app/lib/actions/courseStudents";
import { useParams, useSearchParams } from "next/navigation";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const [data, setData] = useState<any>();
  const { studentId } = useParams<{ studentId: string }>();

  const studentInformation = async () => {
    const response = await getStudentProfile(studentId);
    setData(response);
  };

  useEffect(() => {
    studentInformation();
  }, []);

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
