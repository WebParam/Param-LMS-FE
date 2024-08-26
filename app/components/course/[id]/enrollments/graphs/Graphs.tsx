"use client"
import { AvdTimeSpentData } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/data";

import { OverallAssessmentData } from "@/app/components/course-analytics/graphs/OverallAssessment/data";
import { questionAskedData } from "@/app/components/course-analytics/graphs/QuestionsAsked/data";

import { quizAttemptData } from "@/app/components/course-analytics/graphs/OverallQuiz/data";

import { workbookTimeSpentData } from "@/app/components/course-analytics/graphs/workbookTimeSpent/data";

import { commentsSubmittedData } from "@/app/components/course-analytics/graphs/CommentsChart/data";

import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/course-analytics/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";

import LineChart from "@/components/course-dashboard/graphs/LineChart";
import PieChart from "@/components/course-analytics/graphs/PieChart";
import BarGraph from "@/components/course-dashboard/graphs/BarGraph";

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
          <ChartLayout>
            <LineChart chartData={quizAttemptData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Questions Asked" type="bar">
            <BarGraph chartData={questionAskedData} />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Comments Submited" type="bar">
            <BarGraph chartData={commentsSubmittedData} />
          </ChartLayout>
        </div>
       
        

      </div>
    </>
  );
}
