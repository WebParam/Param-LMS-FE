"use client";
import Table from "@/components/course/[id]/course-applicants/contacts/Table";
import { useState } from "react";
import { useEffect } from "react";
import {
  useParams,
} from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";

const Body = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [data, setData] = useState([]);
  async function studentInformation() {
    const response = await getStudentData(studentId);
    setData(response);
  }

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
