"use client";
import { useEffect, useState } from "react";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
//import Loading from "../../../course/[id]/course-applicants/graphs/loading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import { studentProvincesData } from "./StudentsProvinces";

import "@/app/css/tiles.css"

import { AgeVsGenderData } from "@/app/components/analytics/graphs/course-applicants/AgeVsGender";
import { socioEconomicStatusData } from "./SocioEcoStatusData"; 

import { studentDisabilitiesData } from "./StudentDisabilities";

import { citizenshipData } from "./StudentsCitizenship";

import {
  options as raceOptions,
  series as raceSeries,
} from "./StudentRaces";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  options as genderOptions,
  series as genderSeries,
} from "./Genders";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import {
  options as placementOptions,
  series as placementSeries,
} from "./StudentsPlacement";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default async function Graphs({graphData}:any) {
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
    { name: "Students", icon: "school", data: graphData.numberOfStudents },
    { name: "Employed", icon: "work_outline", data: graphData.numbetOfStudentsEmployed },
    { name: "Unemployed", icon: "mood_bad", data: graphData.numberOfStudentsUnemployed },
    { name: "Disabilities", icon: "accessible", data: graphData.numberOfStudentsWithDisabilities },
  ];

  return (
    <>
 <div className="row mb-lg-8pt">
        {dataTiles.map((data: DataTiles) => (
          <div key={data.name} className="col-lg-3">
            <div className="card">
              <div
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                className="dashboard-area-tabs__tab card-body text-center active"
              >
                <span className="font-weight-bold">{data.name}</span>
                <i className="material-icons text-success icon-48pt">
                  {data.icon}
                </i>
                <span className="h2 mb-0 mt-n1">{data.data}</span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="row card-group-row">
        <div  data-aos="flip-down" className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Student Provinces" type="bar">
            <ChartProvider chartData={studentProvincesData} />
          </ChartLayout>
        </div>
        <div  data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Gender vs Age Group Category" type="bar">
            <ChartProvider chartData={AgeVsGenderData} />
          </ChartLayout>
        </div>
        <div  data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Genders" type="pie">
            <PieChart options={genderOptions} series={genderSeries} />
          </ChartLayout>
        </div> 
        <div  data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Student Race" type="pie">
            <PieChart options={raceOptions} series={raceSeries} />
          </ChartLayout>
        </div>

        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Socio Economic Status" type="bar">
            <ChartProvider chartData={socioEconomicStatusData} />
          </ChartLayout>
        </div>
        <div  data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Student Disabilities" type="bar">
            <ChartProvider chartData={studentDisabilitiesData} />
          </ChartLayout>
        </div>
        <div  data-aos="flip-down" className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Citizenships" type="bar">
            <ChartProvider chartData={citizenshipData} />
          </ChartLayout>
        </div>
        <div  data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart options={placementOptions} series={placementSeries} />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
