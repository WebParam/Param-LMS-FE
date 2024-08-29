"use client";
import { useEffect, useState } from "react";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
//import Loading from "../../../course/[id]/course-applicants/graphs/loading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { workbookTimeSpentData } from "@/app/components/analytics/graphs/course/WorkbookTimeSpent";


import {
    options as workbookCompetionRateOptions,
    series as workbookCompetionRateSeries,
  } from "@/app/components/analytics/graphs/course/WorkbookCompletionRate";
import "@/app/css/tiles.css"

import {
    options as StudentsPlacedOptions,
    series as StudentsPlacedSeries,
  } from "@/app/components/analytics/graphs/host-company/NoOfStudentsPlaced";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";
import ChartProvider from "../ChartProvider";
import PieChart from "../PieChart";
import SimpleMap from "../../map/HostLocationMap";
import { industryOfHostdata } from "./IndustryOfHost";
import { CompanySizeData } from "./CompanySize";


export default async function Graphs() {


  return (
    <>
      <div className="row card-group-row">
     
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
          title = "Location"
          type="line"
          >
            <SimpleMap/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
        chartData = {industryOfHostdata}
          title = "Host Industries"
          type="line"
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
        chartData = {CompanySizeData}
          title = "Company Size"
          type="line"
          >
            <ChartProvider />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart
              options={StudentsPlacedOptions}
              series={StudentsPlacedSeries}
            />
          </ChartLayout>
        </div>

        
        </div>
      
      
    </>
  );
}
