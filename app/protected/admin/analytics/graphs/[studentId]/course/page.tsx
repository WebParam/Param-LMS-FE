"use client";
import { AvgTimeSpentData } from "@/app/components/course-analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData } from "@/components/course-analytics/graphs/course/AssessmentCompletion";
import { questionAskedData } from "@/app/components/course-analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/course-analytics/graphs/course/AvgQuizAttempts";


import { commentsSubmittedData } from "@/app/components/course-analytics/graphs/course/AvgCommentsSubmitted";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import {
  liveClassesAttendedData,
} from "@/app/components/course-analytics/graphs/course/LiveClassesAteended";


import "aos/dist/aos.css";
import ChartProvider from "@/components/course-analytics/graphs/ChartProvider";
import PieChart from "@/components/course-analytics/graphs/PieChart";
import UnitStandardTable from "../../../../../../components/course-analytics/tables/KnowledgeModules";
import { AvgDownloadedPDFs } from "@/components/course-analytics/graphs/course/DownloadedPDFs";
import { AvgCorrectAnswersSubmittedData } from "@/components/course-analytics/graphs/course/AvgCorrectAnswers";
import { AvgNotesSubmittedData } from "@/components/course-analytics/graphs/course/AvgNotesSubmitted";
export default async function Page() {
    return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Time Spent" type="bar">
            <ChartProvider chartData={AvgTimeSpentData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assessments Completed" type="bar">
            <ChartProvider chartData={AssessmentCompletionData} />
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
            <ChartProvider chartData={AvgQuizAttemptData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  title="Average Questions Asked" type="bar">
            <ChartProvider chartData={questionAskedData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Comments Submited" type="bar">
            <ChartProvider chartData={commentsSubmittedData} />
          </ChartLayout>
        </div>
       

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <ChartProvider chartData={AvgNotesSubmittedData} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Live Classes Attended" type="bar">
            <ChartProvider chartData={liveClassesAttendedData} />
          </ChartLayout>
        </div>

              <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout  title="Average PDFs downloaded"type="bar">
            <ChartProvider chartData={AvgDownloadedPDFs} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Average of Correct Answers Submitted" type="bar">
            <ChartProvider chartData={AvgCorrectAnswersSubmittedData} />
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
