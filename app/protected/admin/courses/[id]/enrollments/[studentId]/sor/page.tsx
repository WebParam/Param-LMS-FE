"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import KnowledgeModules from "@/components/course/[id]/enrollments/KnowledgeModule";
import PracticalSkillsModules from "@/components/course/[id]/enrollments/PracticalsModule";
import WorkExperienceModules from "@/components/course/[id]/enrollments/WorkExperienceModule";
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
    const userId = "66792cf48d68c25b74bba7aa";
    const url = `${rAssessmentUrl}/StudentAnswers/DownloadStudentSOR/${userId}`;
    const isGet = true;
    downloadFile(url, filename, fileExtension, setIsDownload, isGet);
  };

  return (
    <>
      <div className="card m-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button onClick={downloadPdf} className={`btn btn-success`}>
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