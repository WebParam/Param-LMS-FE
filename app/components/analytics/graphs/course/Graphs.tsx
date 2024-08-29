"use client";
import { AvgTimeSpentData } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData } from "@/components/analytics/graphs/course/AssessmentCompletion";
import { questionAskedData } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";

import { workbookTimeSpentData } from "@/app/components/analytics/graphs/course/WorkbookTimeSpent";

import { commentsSubmittedData } from "@/app/components/analytics/graphs/course/AvgCommentsSubmitted";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";

import ChartLayout from "@/app/components/analytics/graphs/ChartLayout";

import {
  options as workbookCompetionRateOptions,
  series as workbookCompetionRateSeries,
} from "@/app/components/analytics/graphs/course/WorkbookCompletionRate";

import { liveClassesAttendedData } from "@/app/components/analytics/graphs/course/LiveClassesAteended";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

import KnowledgeModules from "@/app/components/analytics/tables/KnowledgeModules";
import "aos/dist/aos.css";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import PieChart from "@/components/analytics/graphs/PieChart";
import { ModuleCompletionRates } from "@/components/analytics/graphs/course/ModuleCompletion";
export default async function Graphs() {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Modules", icon: "book", data: 5 },
    { name: "Quizzes", icon: "help", data: 10 },
    { name: "Assessments", icon: "list", data: 4 },
  ];

  return (
    <>
      <div className="row mb-lg-8pt">
        {dataTiles.map((data: DataTiles) => (
          <div key={data.name} className="col-lg-3">
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
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  chartData={AvgTimeSpentData}  title="Average Time Spent" type="bar">
            <ChartProvider/>
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  chartData={AssessmentCompletionData}  title="Assessments Completed" type="bar">
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
          <ChartLayout chartData={AvgQuizAttemptData}  title="Quiz Attempt" type="line">
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  chartData={questionAskedData} title="Questions Asked" type="bar">
            <ChartProvider />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={commentsSubmittedData}  title="Comments Submited" type="bar">
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 w-100 col-md-12 card-group-row__col">
          <ChartLayout  chartData={liveClassesAttendedData}  title="Live Classes Attended" type="bar">
            <ChartProvider/>
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Workbook Completion Rate" type="pie">
            <PieChart
              options={workbookCompetionRateOptions}
              series={workbookCompetionRateSeries}
            />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout  chartData={workbookTimeSpentData} title="Workbook Time Spent" type="line">
            <ChartProvider />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout chartData={ModuleCompletionRates} title="Modules Completion Rate" type="line">
            <ChartProvider  />
          </ChartLayout>
        </div>
      </div>

      <div>
        <div className="page-separator mt-3">
          <div className="page-separator__text">Knowledge Modules</div>
        </div>

        <div className="card p-relative o-hidden mb-0">
          <KnowledgeModules path="course" />
        </div>
      </div>
    </>
  );
}
