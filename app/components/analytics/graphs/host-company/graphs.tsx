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


type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default async function Graphs() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();
  const [courseApplications, setCourseApplications] = useState<
    CourseApplicants[]
  >([]);


  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Matriculated", icon: "book", data: 5 },
    { name: "Graduated", icon: "school", data: 79 },
    { name: "Employed", icon: "list", data: 4 },
    { name: "Unemployed", icon: "help", data: 10 },
  ];

  return (
    <>
      <div className="row card-group-row">
     
        <div data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
          title = "Location"
          type="line"
          >
            <SimpleMap/>
          </ChartLayout>
        </div>
        <div data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
          title = "Host Industries"
          type="line"
          >
            <ChartProvider chartData = {industryOfHostdata}/>
          </ChartLayout>
        </div>
        <div data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
          title = "Company Size"
          type="line"
          >
            <ChartProvider chartData = {CompanySizeData}/>
          </ChartLayout>
        </div>
        <div  data-aos="flip-down"className="col-lg-6 col-md-12 card-group-row__col">
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
