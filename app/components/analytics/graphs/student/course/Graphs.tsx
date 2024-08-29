"use client";
import { AvgTimeSpentData } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData } from "@/components/analytics/graphs/course/AssessmentCompletion";
import { questionAskedData } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";


import { commentsSubmittedData } from "@/app/components/analytics/graphs/course/AvgCommentsSubmitted";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  liveClassesAttendedData,
} from "@/app/components/analytics/graphs/course/LiveClassesAteended";


import "aos/dist/aos.css";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import KnowledgeModules from "@/app/components/analytics/tables/KnowledgeModules";
import { AvgDownloadedPDFs } from "@/components/analytics/graphs/course/DownloadedPDFs";
import { AvgCorrectAnswersSubmittedData } from "@/components/analytics/graphs/course/AvgCorrectAnswers";
import { AvgNotesSubmittedData } from "@/components/analytics/graphs/course/AvgNotesSubmitted";
export default async function Graphs() {
    return (
    <>
      <div className="row card-group-row">
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  chartData={AvgTimeSpentData}  title="Average Time Spent" type="bar">
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={AssessmentCompletionData} title="Assessments Completed" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Progress Status" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
          chartData={AvgQuizAttemptData}
          title="Average Completed Quizzes"
          type="line"
          >
            <ChartProvider  />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={questionAskedData} title="Average Questions Asked" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={commentsSubmittedData} title="Comments Submited" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>
       

        <div  className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout chartData={AvgNotesSubmittedData} title="Average Notes Submitted" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>

        <div  className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout chartData={liveClassesAttendedData} title="Live Classes Attended" type="bar">
            <ChartProvider  />
          </ChartLayout>
        </div>

              <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout chartData={AvgDownloadedPDFs}  title="Average PDFs downloaded"type="bar">
            <ChartProvider />
          </ChartLayout>
        </div>

        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout chartData={AvgCorrectAnswersSubmittedData}  title="Average of Correct Answers Submitted" type="bar">
            <ChartProvider />
          </ChartLayout>
        </div>


      </div>

      <div >
      <div className="page-separator mt-3">
        <div className="page-separator__text">Knowledge Modules</div>
      </div>

      <div className="card p-relative o-hidden mb-0">
        <KnowledgeModules path="student" />
      </div>
      </div>

      
    </>
  );
}
