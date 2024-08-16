"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";
import { downloadStudentAssessments } from "@/app/lib/actions/assessments";
import { downloadPdfFile } from "@/app/lib/utils";
import { rAssessmentUrl } from "@/app/lib/actions/endpoints";

const Body = () => {
  const pathname = usePathname();
  const [data, setData] = useState([]);
  const { id } = useParams<{ id: string }>();
  async function studentInformation() {
    const id = pathname.split("/")[4];
    console.log("id from parameter", id);
    const response = await getStudentData(id);
    console.log("response", response);
    setData(response);
  }

  useEffect(() => {
    // studentInformation()
  }, []);

  const downloadStudentAssessmentPDF = async () => {
    downloadPdfFile(
      `${rAssessmentUrl}/StudentAnswers/DownloadStudentAsssessment/${id}`,
      `student_assessment_${id}`
    );
  };

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
        onClick={downloadStudentAssessmentPDF}
        className="btn btn-primary primary btn-success enrolBtn m-2"
        style={{ cursor: "pointer" }}
      >
        Download
      </button>
    </>
  );
};

export default Body;
