"use client";
import { AvgTimeSpentData } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { questionAskedData } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import PieChart from "@/components/analytics/graphs/PieChart";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import { AvgNotesSubmittedData } from "@/components/analytics/graphs/course/AvgNotesSubmitted";
import { AvgDownloadedPDFs } from "@/components/analytics/graphs/course/DownloadedPDFs";

export default async function Graphs() {
  // const data = await getStudentModuleGraphs(params.moduleId,params.studentId);

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
          <ChartLayout chartData={AvgTimeSpentData}  title="Average Time Spent" type="bar">
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
          <ChartLayout  chartData={AvgQuizAttemptData}  title="Average Completed Quizzes" type="line">
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={questionAskedData}  title="Average Questions Asked" type="bar">
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout chartData={AvgNotesSubmittedData} title="Average Notes Submitted" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={AvgDownloadedPDFs} title="Average PDFs downloaded" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
