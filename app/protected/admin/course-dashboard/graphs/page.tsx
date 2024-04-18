import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as EnrolledStudentsBarOptions,
  data as EnrolledStudentsBarData,
  barDescriptions as EnrolledStudentsBarDescription,
} from "@/app/components/course-dashboard/graphs/EnrolledStudentsBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/course-dashboard/graphs/OverallAssessment/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarData,
  barDescriptions as OverallQuizBarDescription,
} from "@/app/components/course-dashboard/graphs/OverallQuiz/data";

import { barDescriptions as AvgAssessmentQuizBarDescription } from "@/app/components/course-dashboard/graphs/AvgAssessmentQuiz/data";

import {
  options as AvgAssessmentQuizAttemptsOptions,
  data as AvgAssessmentQuizAttemptsData,
  barDescriptions as AvgAssessmentQuizAttemptsDescription,
} from "@/app/components/course-dashboard/graphs/AvgAssessmentQuizAttempts/data";

import {
  options as AssessmentsQuizPassRateOptions,
  data as AssessmentsQuizPassRateData,
  barDescriptions as AssessmentsQuizPassRateDescription,
} from "@/app/components/course-dashboard/graphs/AssessmentsQuizPassRate/data";

import { barDescriptions as AvgTimeAssessmentsQuizzesDescription } from "@/app/components/course-dashboard/graphs/AvgTimeAssessmentsQuizzes/data";

import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/app/components/course-dashboard/graphs/QuestionsAsked/data";

import {
  options as ContentDownloadedOptions,
  data as ContentDownloadedData,
  barDescriptions as ContentDownloadedDescription,
} from "@/app/components/course-dashboard/graphs/ContentDownloaded/data";

import { barDescriptions as StudentsAvgPercentageDescription } from "@/app/components/course-dashboard/graphs/StudentsAvgPercentage/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/data";

import { barDescriptions as CommentsChartDescription } from "@/app/components/course-dashboard/graphs/CommentsChart/data";

import { barDescriptions as CompletionRateChartDescription } from "@/app/components/course-dashboard/graphs/CompletionRateChart/data";
import ChartLayout from "@/app/components/course-dashboard/graphs/ChartLayout";
import { CommentChart } from "@/app/components/course-dashboard/graphs/CommentsChart/CommentChart";
import { AvgTimeSpent } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { AvgAssessmentQuiz } from "@/app/components/course-dashboard/graphs/AvgAssessmentQuiz/AvgAssessmentQuiz";
import { AvgTimeAssessmentsQuizzes } from "@/app/components/course-dashboard/graphs/AvgTimeAssessmentsQuizzes/AvgTimeAssessmentsQuizzes";
import { AvgCompletionRate } from "@/app/components/course-dashboard/graphs/AvgCompletionRate/AvgCompletionRate";
import { StudentsProgressStatus } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/StudentsProgressStatus";
import { StudentsAvgPercentage } from "@/app/components/course-dashboard/graphs/StudentsAvgPercentage/StudentsAvgPercentage";

export default function Page() {
  return (
    <>
      <div className="row card-group-row">
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Overall Average Time Spent"
            barDescriptions={AvgTimeSpentBarDataDescription}
          >
            <AvgTimeSpent />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Enrolled Students"
            barDescriptions={EnrolledStudentsBarDescription}
            options={EnrolledStudentsBarOptions}
            data={EnrolledStudentsBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Overall Assessment"
            barDescriptions={OverallAssessmentBarDescription}
            options={OverallAssessmentBarOptions}
            data={OverallAssessmentBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Overall Quizzes"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Average Assessments and Quiz Results"
            barDescriptions={AvgAssessmentQuizBarDescription}
          >
            <AvgAssessmentQuiz />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Average Assessments and Quiz Attempts"
            barDescriptions={AvgAssessmentQuizAttemptsDescription}
            options={AvgAssessmentQuizAttemptsOptions}
            data={AvgAssessmentQuizAttemptsData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartWrapper
            title="Assessments and Quizzes Pass Rate"
            barDescriptions={AssessmentsQuizPassRateDescription}
            options={AssessmentsQuizPassRateOptions}
            data={AssessmentsQuizPassRateData}
            type="bar"
          />
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Average Time Spent on Assessments and Quizzes"
            barDescriptions={AvgTimeAssessmentsQuizzesDescription}
          >
            <AvgTimeAssessmentsQuizzes />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Comments"
            barDescriptions={CommentsChartDescription}
          >
            <CommentChart />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Average Completion Rate"
            barDescriptions={CompletionRateChartDescription}
          >
            <AvgCompletionRate />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Students Average Percentage"
            barDescriptions={StudentsAvgPercentageDescription}
          >
            <StudentsAvgPercentage />
          </ChartLayout>
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Students Progress Status"
            barDescriptions={StudentsProgressStatusDescription}
          >
            <StudentsProgressStatus />
          </ChartLayout>
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
            title="Documents Downloaded"
            barDescriptions={ContentDownloadedDescription}
            options={ContentDownloadedOptions}
            data={ContentDownloadedData}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}
