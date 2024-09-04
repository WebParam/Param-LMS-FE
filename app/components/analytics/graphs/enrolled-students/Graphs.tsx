"use client"
import { AvgTimeSpentData, AvgTimeSpentDataFilterOptions, AvgTimeSpentDatafiltersMapping } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData, AssessmentCompletionDataFilterOptions, AssessmentCompletionDataFiltersMapping } from "@/components/analytics/graphs/course/AssessmentCompletion";
import { questionAskedData, questionAskedDataFilterOptions, questionAskedDataFiltersMapping } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData, AvgQuizAttemptDataFilterOptions, AvgQuizAttemptDatafiltersMapping } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";

import { commentsSubmittedData } from "@/app/components/analytics/graphs/course/AvgCommentsSubmitted";

import "@/app/css/tiles.css"

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default async function Graphs() {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Modules", icon: "book", data: 5 },
    { name: "Quizzes", icon: "help", data: 10 },
    { name: "Assessments", icon: "list", data: 4 },
    { name: "Documents Downloaded", icon: "cloud_download", data: 79 },
  ];

  return (
    <>
     <div className="tiles-container">
  <div className="row mb-lg-8pt tiles-row">
    {dataTiles.map((data: DataTiles) => (
      <div key={data.name} className="col-lg-3 tile-item">
        <div className="card">
          <div
            data-toggle="tab"
            role="tab"
            aria-selected="true"
            className="dashboard-area-tabs__tab card-body text-center active"
          >
            <span className="font-weight-bold">{data.name}</span>
            <i className="material-icons text-success icon-48pt">
              {data.icon}
            </i>
            <span className="h2 mb-0 mt-n1">{data.data}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
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
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
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
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
        <ChartLayout
            hasFilter={true}
            title="Average Comments Submitted"
            type="bar"
            chartData={questionAskedData}
            filterOptions={questionAskedDataFilterOptions}
            defaultFilter="yellow"
            filtersMapping={questionAskedDataFiltersMapping}
          >
            <ChartProvider/>
          </ChartLayout>
        </div>

       
        

      </div>
    </>
  );
}
