"use client";
import Table from "@/components/course/[id]/course-applicants/profiles/Table";
import { useEffect, useState } from "react";
import list from "@/components/course/[id]/course-applicants/profiles/data";
import { getStudentInfo } from "@/app/lib/actions/courseStudents";
import { useParams } from "next/navigation";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const [data, setData] = useState<any>();
  const { studentId } = useParams<{ studentId: string }>();

  const studentInformation = async () => {
    const response = await getStudentInfo(studentId);
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
