"use client";
import { AvdTimeSpentData } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/data";

import { questionAskedData } from "@/app/components/course-analytics/graphs/QuestionsAsked/data";

import { quizAttemptData } from "@/app/components/course-analytics/graphs/OverallQuiz/data";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import BarGraph from "@/components/course-dashboard/graphs/BarGraph";
import { downloadedPDFsData } from "@/components/course-dashboard/graphs/avgPDFDownloaded/data";
import { notesSubmittedData } from "@/components/course-dashboard/graphs/AvgNotesSubmitted/data";
import PieChart from "@/components/course-analytics/graphs/PieChart";
import LineChart from "@/components/course-dashboard/graphs/LineChart";
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
            <BarGraph chartData={AvdTimeSpentData} />
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
            <LineChart chartData={quizAttemptData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Questions Asked" type="bar">
            <BarGraph chartData={questionAskedData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <BarGraph chartData={notesSubmittedData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average PDFs downloaded" type="bar">
            <BarGraph chartData={downloadedPDFsData} />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
