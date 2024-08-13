import ChartWrapper from "@/app/components/course-analytics/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/course-analytics/graphs/OverallAssessment/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-analytics/graphs/QuestionsAsked/data";

import {
  options as WorkbookOptions,
  data as WorkbookData,
  barDescriptions as WorkDescription,
} from "@/app/components/course-analytics/graphs/workbook-signed/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarData,
  barDescriptions as OverallQuizBarDescription,
} from "@/app/components/course-analytics/graphs/OverallQuiz/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarData,
  barDescriptions as CommentsChartBarDescription,
} from "@/app/components/course-analytics/graphs/CommentsChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-analytics/graphs/StudentsProgressStatus/data";

import { barDescriptions as CompetencyDescription } from "@/app/components/course-analytics/graphs/workbook-competency/data";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-analytics/graphs/StudentsProgressStatus/StudentsProgressStatus";
import { CompetentVsIncompetent } from "@/app/components/course-analytics/graphs/workbook-competency/WorkCompetency";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

import UnitStandardTable from "../(components)/unit-standard-table";
import ProgressBar from 'react-bootstrap/ProgressBar';


export default async function Page() {
  const dataTiles: DataTiles[] = [
    { name: "Students", icon: "person_outline", data: 112 },
    { name: "Modules", icon: "book", data: 5 },
    { name: "Quizzes", icon: "help", data: 10 },
    { name: "Assessments", icon: "list", data: 4 },
  ];
  const now = 60;

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
          <ChartLayout
            title="Average Time Spent"
            barDescriptions={AvgTimeSpentBarDataDescription}
          >
            <AvgTimeSpent />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Assessment Completed"
            barDescriptions={OverallAssessmentBarDescription}
            options={OverallAssessmentBarOptions}
            data={OverallAssessmentBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Progress Status"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentsProgressStatus />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Quiz Attempts"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarData}
            type="line"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Comments"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Workbook Signed"
            barDescriptions={WorkDescription}
            options={WorkbookOptions}
            data={WorkbookData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Workbook Competency"
            barDescriptions={CompetencyDescription}
            type="pie"
          >
            <CompetentVsIncompetent />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Overall Workbooks Signed"
            barDescriptions={WorkDescription}
          >
            
            <ProgressBar variant = "info" now={60} label={`${60}%`} />        
            
          </ChartLayout>
        </div>
      </div>

      <div className="page-separator">
        <div className="page-separator__text">Knowledge Modules</div>
      </div>

      <div className="card p-relative o-hidden mb-0">
        <UnitStandardTable path="course" />
      </div>
    </>
  );
}

