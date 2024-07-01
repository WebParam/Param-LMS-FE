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
import { getModuleGraphs } from "@/app/lib/actions/module";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getModuleGraphs(params.id);

  const OverallQuizBarData = await OverallQuizBarDataFn(
    data.averageCompletedQuizzes
  );
  const QuestionsAskedData = await QuestionsAskedDataFn(
    data.averageQuestionsAsked
  );
  const CommentsChartBarData = await CommentsChartBarDataFn(
    data.averageNotesSubmitted
  );
  const PDFChartBarData = await OverallPDFBarDataFn(data.averagePdfDownloaded);
  const CompletionRateChartBarData = await OverallCompletionRateBarDataFn(
    data.averageCompletionRate
  );

  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Average Time Spent"
            barDescriptions={AvgTimeSpentBarDataDescription}
          >
            <AvgTimeSpent averageTimeSpent={data.averageTimeSpent} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Completed Quizzes"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarData}
            type="line"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Notes Submitted"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average PDFs downloaded"
            barDescriptions={OverallPDFBarDescription}
            options={OverallPDFBarOptions}
            data={PDFChartBarData}
            type="line"
          />
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Completed Rate (%)"
            barDescriptions={OverallCompletionRateBarDescription}
            options={OverallCompletionRateBarOptions}
            data={CompletionRateChartBarData}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}
