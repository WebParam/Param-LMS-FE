"use client";

import { usePathname } from "next/navigation";
import KnowledgeModules from "@/components/course/[id]/enrolled-with-assessments/sor/KnowledgeModule";
import PracticalSkillsModules from "@/components/course/[id]/enrolled-with-assessments/sor/PracticalsModule";
import WorkExperienceModules from "@/components/course/[id]/enrolled-with-assessments/sor/WorkExperienceModule";

const Body = () => {
  const pathname = usePathname();

  console.log(pathname.split("/").includes("sor"));

  return (
    <>
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
