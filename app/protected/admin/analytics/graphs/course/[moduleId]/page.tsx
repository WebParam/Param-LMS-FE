"use client";
import { AvgTimeSpentData } from "@/app/components/course-analytics/graphs/course/AvgTimeSpent";

import { questionAskedData } from "@/app/components/course-analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/course-analytics/graphs/course/AvgQuizAttempts";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import ChartProvider from "@/components/course-analytics/graphs/ChartProvider";
// import { downloadedPDFsData } from "@/components/course-dashboard/graphs/avgPDFDownloaded/data";
// import { notesSubmittedData } from "@/components/course-analytics/graphs/course/AvgCommentsSubmitted";
import PieChart from "@/components/course-analytics/graphs/PieChart";
//import { getModuleGraphs } from "@/app/lib/actions/module";

export default async function Page({ params }: { params: { id: string } }) {
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
          <ChartLayout title="Average Time Spent" type="bar">
            <ChartProvider chartData={AvgTimeSpentData} />
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
          <ChartLayout title="Average Completed Quizzes" type="line">
            <ChartProvider chartData={AvgQuizAttemptData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Questions Asked" type="bar">
            <ChartProvider chartData={questionAskedData} />
          </ChartLayout>
        </div>

        {/* <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <ChartProvider chartData={notesSubmittedData} />
          </ChartLayout>
        </div> */}

        {/* <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average PDFs downloaded" type="bar">
            <ChartProvider chartData={downloadedPDFsData} />
          </ChartLayout>
        </div> */}
      </div>
    </>
  );
}
