"use client";
import {
  AvgTimeSpentData,
  AvgTimeSpentDataFilterOptions,
  AvgTimeSpentDatafiltersMapping,
} from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import {
  questionAskedData,
  questionAskedDataFilterOptions,
  questionAskedDataFiltersMapping,
} from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import {
  AvgQuizAttemptData,
  AvgQuizAttemptDataFilterOptions,
  AvgQuizAttemptDatafiltersMapping,
} from "@/app/components/analytics/graphs/course/AvgQuizAttempts";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import { AvgPDFsDownloadedData, AvgPDFsDownloadedFilterOptions, AvgPDFsDownloadedDataFiltersMapping } from "@/components/analytics/graphs/course/DownloadedPDFs";
import { AvgNotesSubmittedData, AvgNotesSubmittedDataFilterOptions, AvgNotesSubmittedDataFiltersMapping } from "@/components/analytics/graphs/course/AvgNotesSubmitted";
import PieChart from "@/components/analytics/graphs/PieChart";
//import { getModuleGraphs } from "@/app/lib/actions/module";

export default async function Graphs() {
  // const data = await getModuleGraphs(params.id);

  // const OverallQuizBarData = await OverallQuizBarDataFn(
  //   data.averageCompletedQuizzes
  // );
  // const QuestionsAskedData = await QuestionsAskedDataFn(
  //   data.averageQuestionsAsked
  // );
  // const CommentsChartBarData = await CommentsChartBarDataFn(
  //   data.averageNotesSubmitted
  // );
  // const PDFChartBarData = await OverallPDFBarDataFn(data.averagePdfDownloaded);
  // const CompletionRateChartBarData = await OverallCompletionRateBarDataFn(
  //   data.averageCompletionRate
  // );

  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={true}
            title="Average Time Spent"
            type="bar"
            chartData={AvgTimeSpentData}
            filterOptions={AvgTimeSpentDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgTimeSpentDatafiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Completion Rate" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={true}
            title="Average Quiz Attempt"
            type="bar"
            chartData={AvgQuizAttemptData}
            filterOptions={AvgQuizAttemptDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgQuizAttemptDatafiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={true}
            title="Average Questions Asked"
            type="bar"
            chartData={questionAskedData}
            filterOptions={questionAskedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={questionAskedDataFiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout
            hasFilter={true}
            title="Average Notes Submitted"
            type="bar"
            chartData={AvgNotesSubmittedData}
            filterOptions={AvgNotesSubmittedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgNotesSubmittedDataFiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average PDFs downloaded"
            type="line"
            chartData={AvgPDFsDownloadedData}
            filterOptions={AvgPDFsDownloadedFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgPDFsDownloadedDataFiltersMapping}
          >
            <ChartProvider />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
