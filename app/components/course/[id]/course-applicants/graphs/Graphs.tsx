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
import { barDescriptions as AvgTimeSpentBarDataDescription } from "./AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "./OverallAssessment/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "./QuestionsAsked/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarData,
  barDescriptions as OverallQuizBarDescription,
} from "./OverallQuiz/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarData,
  barDescriptions as CommentsChartBarDescription,
} from "./CommentsChart/data";

import {
  options as CitizenshipChartOptions,
  data as CitizenshipChartData,
  barDescriptions as CitizenshipChartDescription,
} from "./CitizenshipChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "./StudentsProgressStatus/data";
import { barDescriptions as StudentRacesDescription } from "./StudentRaces/data";

import ChartLayout from "./ChartLayout";
import { AvgTimeSpent } from "./AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "./StudentsProgressStatus/StudentsProgressStatus";
import { StudentRaces } from "./StudentRaces/StudentRaces";
import EnrolledTable from "./(components)/ApplicantsTable";
import mockData from "./(components)/data";
import ApplicantsTable from "./(components)/ApplicantsTable";
import { getEnrollments } from "@/app/lib/actions/enrollments";

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
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Student Provinces"
            barDescriptions={AvgTimeSpentBarDataDescription}
          >
            <AvgTimeSpent />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Gender vs Age Group Category"
            barDescriptions={OverallAssessmentBarDescription}
            options={OverallAssessmentBarOptions}
            data={OverallAssessmentBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Gender"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentsProgressStatus />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Different Races"
            barDescriptions={StudentRacesDescription}
            type="pie"
          >
            <StudentRaces />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Socio Economic Status"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Disabilities"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Citizenship"
            barDescriptions={CitizenshipChartDescription}
            options={CitizenshipChartOptions}
            data={CitizenshipChartData}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}
