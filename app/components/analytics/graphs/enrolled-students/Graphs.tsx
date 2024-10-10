"use client"
import { AvgTimeSpentData } from "@/app/components/analytics/graphs/course/AvgTimeSpent";

import { AssessmentCompletionData } from "@/components/analytics/graphs/course/AssessmentCompletion";
import { questionAskedData } from "@/app/components/analytics/graphs/course/AvgQuestionsAsked";

import { AvgQuizAttemptData } from "@/app/components/analytics/graphs/course/AvgQuizAttempts";

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

export default async function Graphs({graphData}:any) {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "school", data: graphData.numberOfStudents },
    { name: "Employed", icon: "work_outline", data: graphData.numbetOfStudentsEmployed },
    { name: "Unemployed", icon: "mood_bad", data: graphData.numberOfStudentsUnemployed },
    { name: "Disabilities", icon: "accessible", data: graphData.numberOfStudentsWithDisabilities },
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
        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Average Time Spent" type="bar">
            <ChartProvider chartData={AvgTimeSpentData} />
          </ChartLayout>
        </div>
        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Assessments Completed" type="bar">
            <ChartProvider chartData={AssessmentCompletionData} />
          </ChartLayout>
        </div>
        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Progress Status" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>

        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout>
            <ChartProvider chartData={AvgQuizAttemptData} />
          </ChartLayout>
        </div>
        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Questions Asked" type="bar">
            <ChartProvider chartData={questionAskedData} />
          </ChartLayout>
        </div>
        <div data-aos="flip-down"  className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout title="Comments Submited" type="bar">
            <ChartProvider chartData={commentsSubmittedData} />
          </ChartLayout>
        </div>
       
        

      </div>
    </>
  );
}
