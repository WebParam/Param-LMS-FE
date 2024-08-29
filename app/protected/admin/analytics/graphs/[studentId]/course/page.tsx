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
import KnowledgeModules from "../../../../../../components/analytics/tables/KnowledgeModules";
import { AvgDownloadedPDFs } from "@/components/analytics/graphs/course/DownloadedPDFs";
import { AvgCorrectAnswersSubmittedData } from "@/components/analytics/graphs/course/AvgCorrectAnswers";
import { AvgNotesSubmittedData } from "@/components/analytics/graphs/course/AvgNotesSubmitted";
export default async function Page() {
    return (
    <>
      <div className="row card-group-row">
        <div  data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Time Spent" type="bar">
            <ChartProvider chartData={AvgTimeSpentData} />
          </ChartLayout>
        </div>
        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assessments Completed" type="bar">
            <ChartProvider chartData={AssessmentCompletionData} />
          </ChartLayout>
        </div>
        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Progress Status" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
          title="Average Completed Quizzes"
          type="line"
          >
            <ChartProvider chartData={AvgQuizAttemptData} />
          </ChartLayout>
        </div>
        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  title="Average Questions Asked" type="bar">
            <ChartProvider chartData={questionAskedData} />
          </ChartLayout>
        </div>
        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Comments Submited" type="bar">
            <ChartProvider chartData={commentsSubmittedData} />
          </ChartLayout>
        </div>
       

        <div    data-aos="flip-down"  className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Average Notes Submitted" type="bar">
            <ChartProvider chartData={AvgNotesSubmittedData} />
          </ChartLayout>
        </div>

        <div    data-aos="flip-down"  className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout title="Live Classes Attended" type="bar">
            <ChartProvider chartData={liveClassesAttendedData} />
          </ChartLayout>
        </div>

              <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout  title="Average PDFs downloaded"type="bar">
            <ChartProvider chartData={AvgDownloadedPDFs} />
          </ChartLayout>
        </div>

        <div    data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout title="Average of Correct Answers Submitted" type="bar">
            <ChartProvider chartData={AvgCorrectAnswersSubmittedData} />
          </ChartLayout>
        </div>


      </div>

      <div  data-aos="slide-right" >
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
