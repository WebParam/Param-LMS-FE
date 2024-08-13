"use client";

import Table from "./Table";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";
import {
  sampleKnowledgeModules,
  samplePracticalSkillsModules,
  sampleWorkExperienceModules,
} from "../../(components)/data";
import KnowledgeModules from "../../(components)/KnowledgeModule";
import PracticalSkillsModules from "../../(components)/PracticalsModule";
import WorkExperienceModules from "../../(components)/WorkExperienceModule";
import { Button } from "react-bootstrap";
import { downloadFile } from "@/app/lib/utils";
import { rAssessmentUrl } from "@/app/lib/actions/endpoints";

const Body = () => {
  const pathname = usePathname();

  console.log(pathname.split("/").includes("sor"));
  const [isDownload, setIsDownload] = useState(false);

  const downloadPdf = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDownload(true);
    const filename = "Statement of Result";
    const fileExtension = "pdf";
    const userId = "66792cf48d68c25b74bba7aa"
    const url = `${rAssessmentUrl}/StudentAnswers/DownloadStudentSOR/${userId}`;
    downloadFile(url, filename, fileExtension, setIsDownload);
  };

  return (
    <>
      <div className="card m-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button onClick={downloadPdf} className={`btn btn-dark`}>
            {isDownload ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              "Download SOR"
            )}
          </button>
        </div>
      </div>

      <div
        className="table-responsive"
        data-toggle="lists"
        data-lists-sort-by="js-lists-values-employee-name"
        data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
      ></div>

      <KnowledgeModules />
      <PracticalSkillsModules />
      <WorkExperienceModules />
    </>
  );
};

export default Body;
