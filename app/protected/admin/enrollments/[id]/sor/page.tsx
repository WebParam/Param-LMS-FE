"use client";

import Table from "./Table";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";
import { sampleKnowledgeModules, samplePracticalSkillsModules, sampleWorkExperienceModules } from "../../(components)/data";
import KnowledgeModules from "../../(components)/KnowledgeModule";
import PracticalSkillsModules from "../../(components)/PracticalsModule";
import WorkExperienceModules from "../../(components)/WorkExperienceModule";
import { Button } from "react-bootstrap";

const Body = () => {
  const pathname = usePathname();

  console.log(pathname.split('/').includes('sor'))


  return (
    <>
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
        </div>
     
        <KnowledgeModules />
        <PracticalSkillsModules  />
        <WorkExperienceModules />
    </>
  );
};

export default Body;
