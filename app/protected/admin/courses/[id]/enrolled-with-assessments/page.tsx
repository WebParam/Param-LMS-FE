"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/enrolled-with-assessments/Table";
import { useEffect, useState } from "react";
import list from "@/components/course/[id]/enrolled-with-assessments/data";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import Loading from "./loading";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ChartWrapper from "@/app/components/enrolment-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/enrolment-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/enrolment-dashboard/graphs/OverallAssessment/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/enrolment-dashboard/graphs/QuestionsAsked/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarData,
  barDescriptions as CommentsChartBarDescription,
} from "@/app/components/enrolment-dashboard/graphs/CommentsChart/data";

import {
  options as CitizenshipChartOptions,
  data as CitizenshipChartData,
  barDescriptions as CitizenshipChartDescription,
} from "@/app/components/enrolment-dashboard/graphs/CitizenshipChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/enrolment-dashboard/graphs/StudentsProgressStatus/data";
import { barDescriptions as StudentRacesDescription } from "@/app/components/enrolment-dashboard/graphs/StudentRaces/data";

import ChartLayout from "@/app/components/enrolment-dashboard/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/enrolment-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/enrolment-dashboard/graphs/StudentsProgressStatus/StudentsProgressStatus";
import { StudentRaces } from "@/app/components/enrolment-dashboard/graphs/StudentRaces/StudentRaces";
import { useParams, useSearchParams } from "next/navigation";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [data, setData] = useState<CourseApplicants[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const fetchedData = await getEnrollments(id);
        setData(fetchedData);
        console.log("data is here", fetchedData);
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
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Table list={data} />
        </div>

        <Pagination
          listLength={list.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </>
  );
};

export default Body;
