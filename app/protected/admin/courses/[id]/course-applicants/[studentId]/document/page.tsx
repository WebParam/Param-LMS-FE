"use client";
import Table from "@/components/course/[id]/course-applicants/document/Table";
import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "next/navigation";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";

const Body = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const [data, setData] = useState([]);
  const [error, setError] = useState<string>();

  async function studentInformation() {
    try {
      const response = await getStudentDocuments(studentId);
      setData(response);
      console.log("response", response);
    } catch (err) {
      console.error("Failed to fetch student documents:", err);
      setError("Failed to load documents.");
    }
  }

  useEffect(() => {
    studentInformation();
  }, [refreshId]);



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
