"use client";
import { AvdTimeSpentData } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/data";

import { OverallAssessmentData } from "@/app/components/course-analytics/graphs/OverallAssessment/data";
import { questionAskedData } from "@/app/components/course-analytics/graphs/QuestionsAsked/data";

import { quizAttemptData } from "@/app/components/course-analytics/graphs/OverallQuiz/data";


import { commentsSubmittedData } from "@/app/components/course-analytics/graphs/CommentsChart/data";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";


import {
  liveClassesAttendedData,
} from "@/app/components/course-dashboard/graphs/LiveClasses/data";

import "aos/dist/aos.css";
import LineChart from "@/components/course-dashboard/graphs/LineChart";
import PieChart from "@/components/course-analytics/graphs/PieChart";
import BarGraph from "@/components/course-dashboard/graphs/BarGraph";
import UnitStandardTable from "../../(components)/unit-standard-table";
import { downloadedPDFsData } from "@/components/course-dashboard/graphs/avgPDFDownloaded/data";
import { correctAnswersData } from "@/components/course-dashboard/graphs/AvgCorrectAnswers/data";
import { notesSubmittedData } from "@/components/course-dashboard/graphs/AvgNotesSubmitted/data";
export default async function Page() {
    return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Time Spent" type="bar">
            <BarGraph chartData={AvdTimeSpentData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assessments Completed" type="bar">
            <BarGraph chartData={OverallAssessmentData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Progress Status" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
          title="Average Completed Quizzes"
          type="line"
          >
            <LineChart chartData={quizAttemptData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  title="Average Questions Asked" type="bar">
            <BarGraph chartData={questionAskedData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Comments Submited" type="bar">
            <BarGraph chartData={commentsSubmittedData} />
          </ChartLayout>
        </div>
       

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <BarGraph chartData={notesSubmittedData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Live Classes Attended" type="bar">
            <BarGraph chartData={liveClassesAttendedData} />
          </ChartLayout>
        </div>

              <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout  title="Average PDFs downloaded"type="bar">
            <BarGraph chartData={downloadedPDFsData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Average of Correct Answers Submitted" type="bar">
            <LineChart chartData={correctAnswersData} />
          </ChartLayout>
        </div>


      </div>

      <div className="page-separator mt-3">
        <div className="page-separator__text">Knowledge Modules</div>
      </div>

      <div className="card p-relative o-hidden mb-0">
        <UnitStandardTable path="student" />
      </div>

      
    </>
  );
}
