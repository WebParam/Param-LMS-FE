
import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarDataFn,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/app/components/course-dashboard/graphs/OverallAssessment/data";
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

// import {
//   options as CommentsChartBarOptions,
//   data as CommentsChartBarDataFn,
//   barDescriptions as CommentsChartBarDescription,
// } from "@/app/components/course-dashboard/graphs/CommentsChart/data";

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-dashboard/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/StudentsProgressStatus";

import DataTabs from "@/app/components/course-dashboard/graphs/DataTabs";
import { getCourseGraphs } from "@/app/lib/actions/course";

export default async function Page() {
  const creatingUser = "Admin";
  const courseId = "65e5d75f6944453739f276c3";
  const data = await getCourseGraphs(courseId);
  const studentCourseProgress = [12, 9];
  // const {
  //   totalEnrollments,
  //   totalAssessments,
  //   totalQuizzes,
  //   documentsDownloaded,
  //   averageTimeSpent,
  //   overallAssessments,
  //   quizAttempts,
  //   questionsLaunchedPerMonth,
  //   commentsPerMonthByNumbers
  // } = data.data;
  // const OverallAssessmentBarData = await OverallAssessmentBarDataFn(overallAssessments);
  // const OverallQuizBarData = await OverallQuizBarDataFn(quizAttempts);
  // const QuestionsAskedData = await QuestionsAskedDataFn(questionsLaunchedPerMonth);
  // const CommentsChartBarData = await CommentsChartBarDataFn(commentsPerMonthByNumbers);
  const totalModdules = 0;

  return (
    <>
      {/* <DataTabs
        totalEnrollments={totalEnrollments}
        totalModdules={totalModdules}
        totalAssessments={totalAssessments}
        totalQuizzes={totalQuizzes}
        documentsDownloaded={documentsDownloaded}
      /> */}
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
        {/* <ChartWrapper
            title="Average Notes Submitted"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={data.averageNotesSubmitted}
            type="bar"
          /> */}
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          <ChartLayout
            title="Progress Status"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentsProgressStatus studentCourseProgress={studentCourseProgress} />
          </ChartLayout>
        </div>

        <div className="col-lg-6 col-md-12 card-group-row__col">
          {/* <ChartWrapper
            title="Quiz Attempts"
            barDescriptions={OverallQuizBarDescription}
            options={OverallQuizBarOptions}
            data={OverallQuizBarData}
            type="line"
          /> */}
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          {/* <ChartWrapper
            title="Questions Asked"
            barDescriptions={QuestionsAskedDescription}
            options={QuestionsAskedOptions}
            data={QuestionsAskedData}
            type="bar"
          /> */}
        </div>
        <div className="col-lg-6 col-md-12 card-group-row__col">
          {/* <ChartWrapper
            title="Comments"
            barDescriptions={CommentsChartBarDescription}
            options={CommentsChartBarOptions}
            data={CommentsChartBarData}
            type="bar"
          /> */}
        </div>
      </div>
    </>
  );
}
