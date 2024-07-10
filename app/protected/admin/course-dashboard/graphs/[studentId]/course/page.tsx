import ChartWrapper from "@/app/components/course-dashboard/graphs/ChartWrapper";
import { barDescriptions as AvgTimeSpentBarDataDescription } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/data";

import {
  options as OverallPDFBarOptions,
  data as OverallPDFBarDataFn,
  barDescriptions as OverallPDFBarDescription,
} from "@/app/components/course-dashboard/graphs/avgPDFDownloaded/data";

import {
  options as OverallCorrectAnswersBarOptions,
  data as OverallCorrectAnswersBarDataFn,
  barDescriptions as OverallCorrectAnswersBarDescription,
} from "@/app/components/course-dashboard/graphs/AvgCorrectAnswers/data";

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

import { barDescriptions as StudentsProgressStatusDescription } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/data";

import ChartLayout from "@/app/components/course-dashboard/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-dashboard/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-dashboard/graphs/StudentsProgressStatus/StudentsProgressStatus";
import {  getStudentCourseGraphsAnalytics } from "@/app/lib/actions/course";
import UnitStandardTable from "../../(components)/unit-standard-table";
import PageHeader from "../../../PageHeader";

export default async function Page({params} : {params : {studentId:string}}) {
  const studentId = params.studentId;
  const courseId = "agsjvxhabsx"

  const data = await getStudentCourseGraphsAnalytics( courseId,studentId,);


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
  const correctAnswersChartBarData = await OverallCorrectAnswersBarDataFn(
    data.averageCorrectAnswer
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
          <ChartLayout
            title="Progress Status"
            barDescriptions={StudentsProgressStatusDescription}
            type="pie"
          >
            <StudentsProgressStatus
              studentCourseProgress={data.studentProgress}
            />
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
            title="Average of Correct Answers Submitted"
            barDescriptions={OverallCorrectAnswersBarDescription}
            options={OverallCorrectAnswersBarOptions}
            data={correctAnswersChartBarData}
            type="line"
          />
        </div>
       
      </div>
      
        <div className="mb-24pt mb-sm-0 mr-sm-24pt">
        <PageHeader title="Web Developent Unit Standards"  />
        </div>
      
      <div className="card p-relative o-hidden mb-0">
      
        <UnitStandardTable path="student"/>
        </div>
    </>
  );
}