"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import ChartWrapper from "@/app/components/course-analytics/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/course-analytics/graphs/OverallAssessment/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-analytics/graphs/QuestionsAsked/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarData,
  barDescriptions as OverallQuizBarDescription,
} from "@/app/components/course-analytics/graphs/OverallQuiz/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarData,
  barDescriptions as CommentsChartBarDescription,
} from "@/app/components/course-analytics/graphs/CommentsChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-analytics/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-analytics/graphs/StudentsProgressStatus/StudentsProgressStatus";
import Link from "next/link";
import { useState } from "react";

import Pagination from "@/app/components/Pagination";
import Table from "./(resources)/sections/Table";
import list from "./(resources)/sections/data";

function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    {
      name: "sections",
      title: "Sections",
      url: `/protected/admin/student-analytics/${id}/sections`,
      active: true,
    },
    {
      name: "assessments",
      title: "Assessments",
      url: `/protected/admin/student-analytics/${id}/assessments`,
      active: false,
    },
    {
      name: "quizzes",
      title: "Quizzes",
      url: `/protected/admin/student-analytics/${id}/quizzes`,
      active: false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Average Time Spent"
            barDescriptions={AvgTimeSpentBarDataDescription}
          >
            <AvgTimeSpent />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Assessment Completed"
            barDescriptions={OverallAssessmentBarDescription}
            options={OverallAssessmentBarOptions}
            data={OverallAssessmentBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Progress Status"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentsProgressStatus />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Quiz Attempts"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarData}
            type="line"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Comments"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarData}
            type="bar"
          />
        </div>
      </div>
      <div className="card  mb-0">
        <div className="card-header card-header-tabs-basic nav px-0">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={`${tab.url}?id=${id}&name=${name}`}
              className={tab.active ? "active" : ""}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card mt-3">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Table list={currentItems} />
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
}

export default Page;
