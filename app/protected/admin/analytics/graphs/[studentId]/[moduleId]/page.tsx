"use client";
import { AvgTimeSpentData } from "@/app/components/course-analytics/graphs/course/AvgTimeSpent";

import { questionAskedData } from "@/app/components/course-analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/course-analytics/graphs/course/AvgQuizAttempts";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import PieChart from "@/components/course-analytics/graphs/PieChart";
import ChartProvider from "@/components/course-analytics/graphs/ChartProvider";
import { AvgNotesSubmittedData } from "@/components/course-analytics/graphs/course/AvgNotesSubmitted";
import { AvgDownloadedPDFs } from "@/components/course-analytics/graphs/course/DownloadedPDFs";

export default async function Page({
  params,
}: {
  params: { studentId: string; moduleId: string };
}) {
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
        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Time Spent" type="bar">
            <ChartProvider chartData={AvgTimeSpentData} />
          </ChartLayout>
        </div>

        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Completion Rate" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Completed Quizzes" type="line">
            <ChartProvider chartData={AvgQuizAttemptData} />
          </ChartLayout>
        </div>
        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Questions Asked" type="bar">
            <ChartProvider chartData={questionAskedData} />
          </ChartLayout>
        </div>

        <div   data-aos="flip-down"  className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <ChartProvider chartData={AvgNotesSubmittedData} />
          </ChartLayout>
        </div>
        <div   data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average PDFs downloaded" type="bar">
            <ChartProvider chartData={AvgDownloadedPDFs} />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
