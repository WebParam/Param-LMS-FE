"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import list from "./(components)/data";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import ChartWrapper from "./ChartWrapper";
import { studentProvincesData } from "./StudentProvinces/data";

import {
  AgeVsGenderData
} from "./AgeVsGender/data";
import {
  socioEconomicStatusData
} from "./StudentSocioEcoStatus/data";


import {
  studentDisabilitiesData
} from "./StudentDisabilities/data";

import {
citizenshipData
} from "./CitizenshipChart/data";


import { options as raceOptions,
  series as raceSeries   } from "./StudentRaces/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import {   options as genderOptions,
  series as genderSeries } from "./Gender/data";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import { options as placementOptions,
  series as placementSeries } from "./students-placed/data";
import BarGraph from "@/components/course-dashboard/graphs/BarGraph";
import PieChart from "@/components/course-analytics/graphs/PieChart";

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

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const fetchedData = await getCourseStudents("6669f0ff8759b480859c10a7");

        const applicantsData = await getEnrollments(
          "6669f0ff8759b480859c10a7",
          false
        );

        setCourseApplications(applicantsData.courseApplicants);
        setData(fetchedData);
        const courseTitle = fetchedData[0].title;
        console.log("data is here", courseTitle);
        cookies.set("courseTitle", courseTitle);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    asyncFetch();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Matriculated", icon: "book", data: 5 },
    { name: "Graduated", icon: "school", data: 79 },
    { name: "Employed", icon: "list", data: 4 },
    { name: "Unemployed", icon: "help", data: 10 },
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
      <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Student Provinces" type="bar">
            <BarGraph chartData={studentProvincesData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Gender vs Age Group Category" type="bar">
            <BarGraph chartData={AgeVsGenderData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Genders" type="pie">
            <PieChart
              options={genderOptions}
              series={genderSeries}
            />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Student Race" type="pie">
            <PieChart
              options={raceOptions}
              series={raceSeries}
            />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout             title="Socio Economic Status"
 type="bar">
            <BarGraph chartData={socioEconomicStatusData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout             title="Student Disabilities"
 type="bar">
            <BarGraph chartData={studentDisabilitiesData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Students Citizenships" type="bar">
            <BarGraph chartData={citizenshipData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Students Placement" type="pie">
            <PieChart
              options={placementOptions}
              series={placementSeries}
            />
          </ChartLayout>
         </div>

      </div>
    </>
  );
}
