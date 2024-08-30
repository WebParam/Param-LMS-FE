"use client";
import { useEffect, useState } from "react";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
//import Loading from "../../../course/[id]/course-applicants/graphs/loading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import { studentProvincesData  } from "./StudentsProvinces";

import "@/app/css/tiles.css"

import { AgeVsGenderData } from "@/app/components/analytics/graphs/course-applicants/AgeVsGender";
import {  studentsEcoStatusDataFilterOptions, studentsEcoStatusDatafiltersMapping, studentsSocioEcoData } from "./SocioEcoStatusData"; 

import { studentsDisabilitiesData, studentsDisabilitiesDataFilterOptions, studentsDisabilitiesDatafiltersMapping } from "./StudentDisabilities";


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
import { studentsCitizenshipData, studentsCitizenshipDataFilterOptions, studentsCitizenshipDatafiltersMapping } from "./StudentsCitizenship";

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

  // useEffect(() => {
  //   const asyncFetch = async () => {
  //     try {
  //       const fetchedData = await getCourseStudents("6669f0ff8759b480859c10a7");

  //       const applicantsData = await getEnrollments(
  //         "6669f0ff8759b480859c10a7",
  //         false
  //       );

  //       setCourseApplications(applicantsData.courseApplicants);
  //       setData(fetchedData);
  //       const courseTitle = fetchedData[0].title;
  //       console.log("data is here", courseTitle);
  //       cookies.set("courseTitle", courseTitle);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } 
      
  //     // finally {
  //     //  // setLoading(false);
  //     // }
  //   };
  //   asyncFetch();
  // }, []);

  // if (loading) {
  //   return <Loading />;//we need to use skeleton loader for the graphs
  // }

  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Matriculated", icon: "book", data: 5 },
    { name: "Graduated", icon: "school", data: 79 },
    { name: "Employed", icon: "list", data: 4 },
    { name: "Unemployed", icon: "help", data: 10 },
  ];

  return (
    <>
<div className="tiles-container">
  <div className="row mb-lg-8pt tiles-row">
    {dataTiles.map((data: DataTiles) => (
      <div key={data.name} className="col-lg-3 tile-item">
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
</div>


      <div className="row card-group-row">
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={false}
            title="Students Provinces"
            type="bar"
            chartData={studentProvincesData}

          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={false}
            title="Age vs Gender "
            type="bar"
            chartData={AgeVsGenderData}

          >
            <ChartProvider/>
          </ChartLayout>
        </div>

        
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Genders" type="pie">
            <PieChart options={genderOptions} series={genderSeries} />
          </ChartLayout>
        </div> 


        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Student Race" type="pie">
            <PieChart options={raceOptions} series={raceSeries} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Socio Economic Status"
            type="bar"
            chartData={studentsSocioEcoData}
            filterOptions={studentsEcoStatusDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsEcoStatusDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Disabilities"
            type="bar"
            chartData={studentsDisabilitiesData}
            filterOptions={studentsDisabilitiesDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsDisabilitiesDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Students Citizenship"
            type="bar"
            chartData={studentsCitizenshipData}
            filterOptions={studentsCitizenshipDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={studentsCitizenshipDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Students Placement" type="pie">
            <PieChart options={placementOptions} series={placementSeries} />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
