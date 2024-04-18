import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/course-dashboard/graphs/OverallAssessment/data";

import { barDescriptions as OverallQuizBarDescription } from "@/app/components/course-dashboard/graphs/OverallQuiz/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarData,
  barDescriptions as CommentsChartBarDescription,
} from "@/app/components/course-dashboard/graphs/CommentsChart/data";

import { barDescriptions as QuestionsAskedDescription } from "@/app/components/course-dashboard/graphs/QuestionsAsked/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-dashboard/graphs/ChartLayout";
import { OverallQuiz } from "@/app/components/course-dashboard/graphs/OverallQuiz/OverallQuiz";
import { QuestionsAsked } from "@/app/components/course-dashboard/graphs/QuestionsAsked/QuestionsAsked";
import { AvgTimeSpent } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/StudentsProgressStatus";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default function Page() {
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
                <i className="material-icons text-success icon-48pt text-20 ml-2">
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
          <ChartLayout
            title="Quiz Attempts"
            barDescriptions={OverallQuizBarDescription}
          >
            <OverallQuiz />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
          >
            <QuestionsAsked />
          </ChartLayout>
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
      </div>
    </>
  );
}
