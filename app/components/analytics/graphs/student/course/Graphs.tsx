"use client";
import { AvgTimeSpentData, AvgTimeSpentDataFilterOptions, AvgTimeSpentDatafiltersMapping } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData, AssessmentCompletionDataFilterOptions, AssessmentCompletionDataFiltersMapping } from "@/components/analytics/graphs/course/AssessmentCompletion";
import { questionAskedData, questionAskedDataFilterOptions, questionAskedDataFiltersMapping } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData, AvgQuizAttemptDataFilterOptions, AvgQuizAttemptDatafiltersMapping } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";


import { commentsSubmittedData, commentsSubmittedDataFilterOptions, commentsSubmittedDataFiltersMapping } from "@/app/components/analytics/graphs/course/AvgCommentsSubmitted";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  liveClassesAttendedData,
  liveClassesAttendedDatafilterOptions,
  liveClassesAttendedDatafiltersMapping,
} from "@/app/components/analytics/graphs/course/LiveClassesAteended";


import "aos/dist/aos.css";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import KnowledgeModules from "@/app/components/analytics/tables/KnowledgeModules";
import {  AvgPDFsDownloadedData, AvgPDFsDownloadedFilterOptions, AvgPDFsDownloadedDataFiltersMapping } from "@/components/analytics/graphs/course/DownloadedPDFs";
import { AvgCorrectAnswersSubmittedData, AvgCorrectAnswersSubmittedDataFilterOptions, AvgCorrectAnswersSubmittedDataFiltersMapping } from "@/components/analytics/graphs/course/AvgCorrectAnswers";
import { AvgNotesSubmittedData, AvgNotesSubmittedDataFilterOptions, AvgNotesSubmittedDataFiltersMapping } from "@/components/analytics/graphs/course/AvgNotesSubmitted";
export default async function Graphs() {
    return (
    <>
      <div className="row card-group-row">
        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Time Spent"
            type="bar"
            chartData={AvgTimeSpentData}
            filterOptions={AvgTimeSpentDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgTimeSpentDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Assessments Completion Rate"
            
            type="bar"
            chartData={AssessmentCompletionData}
            filterOptions={AssessmentCompletionDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AssessmentCompletionDataFiltersMapping}
          >
            <ChartProvider/>
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
            hasFilter={true}
            title="Average Quiz Attempt"
            type="bar"
            chartData={AvgQuizAttemptData}
            filterOptions={AvgQuizAttemptDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgQuizAttemptDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Questions Asked"
            type="bar"
            chartData={questionAskedData}
            filterOptions={questionAskedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={questionAskedDataFiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Comments Submitted"
            type="bar"
            chartData={commentsSubmittedData}
            filterOptions={commentsSubmittedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={commentsSubmittedDataFiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>
       

        <div  className="col-lg-6 w-100 col-md-12 card-group-row__col">
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

        <div  className="col-lg-6 w-100 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Live Classes Attended"
            type="line"
            chartData={liveClassesAttendedData}
            filterOptions={liveClassesAttendedDatafilterOptions}
            defaultFilter="yellow"
            filtersMapping={liveClassesAttendedDatafiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>

              <div  className="col-lg-6 col-md-12 card-group-row__col">
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

        <div  className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Correct Answerrs Submitted"
            type="bar"
            chartData={AvgCorrectAnswersSubmittedData}
            filterOptions={AvgCorrectAnswersSubmittedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={AvgCorrectAnswersSubmittedDataFiltersMapping}
          >
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
