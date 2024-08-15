import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as OverallPDFBarOptions,
  data as OverallPDFBarDataFn,
  barDescriptions as OverallPDFBarDescription,
} from "@/app/components/course-dashboard/graphs/avgPDFDownloaded/data";

import {
  options as OverallCompletionRateBarOptions,
  data as OverallCompletionRateBarDataFn,
  barDescriptions as OverallCompletionRateBarDescription,
} from "@/app/components/course-dashboard/graphs/AvgCompletionRatePerModule/data";

import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedDataFn,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-dashboard/graphs/QuestionsAsked/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarDataFn,
  barDescriptions as OverallQuizBarDescription,
} from "@/app/components/course-dashboard/graphs/OverallQuiz/data";

import {
  options as CommentsChartBarOptions,
  data as CommentsChartBarDataFn,
  barDescriptions as CommentsChartBarDescription,
} from "@/app/components/course-dashboard/graphs/CommentsChart/data";

import ChartLayout from "@/app/components/course-dashboard/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { getStudentModuleGraphs } from "@/app/lib/actions/module";

export default async function Page({ params }: { params: { studentId: string, moduleId:string } }) {
 

  return (
    <>
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
            title="Average Completed Quizzes"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarDataFn}
            type="line"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedDataFn}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Notes Submitted"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarDataFn}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average PDFs downloaded"
            barDescriptions={OverallPDFBarDescription}
            options={OverallPDFBarOptions}
            data={OverallPDFBarDataFn}
            type="line"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Completed Rate (%)"
            barDescriptions={OverallCompletionRateBarDescription}
            options={OverallCompletionRateBarOptions}
            data={OverallCompletionRateBarDataFn}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}
