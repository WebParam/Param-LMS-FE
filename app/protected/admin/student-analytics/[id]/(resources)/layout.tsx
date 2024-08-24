"use client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import ChartWrapper from "@/app/components/course-analytics/graphs/ChartWrapper";

import ChartLayout from "@/app/components/course-analytics/graphs/ChartLayout";
import { AvgTimeSpent } from "@/app/components/course-analytics/graphs/AvgTimeSpentBar/AvgTimeSpent";
import { StudentsProgressStatus } from "@/app/components/course-analytics/graphs/StudentsProgressStatus/StudentsProgressStatus";
import Link from 'next/link';

function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const router = useRouter();

  const tabs = [
    { name: "sections", title: "Sections", url: `/protected/admin/student-analytics/${id}/sections` },
    {
      name: "assessments", title: "Assessments",
      url: `/protected/admin/student-analytics/${id}/assessments`,
    },
    { name: "quizzes", title: "Quizzes", url: `/protected/admin/student-analytics/${id}/quizzes` },
  ];
  
  return (
    <>
      {/* <div className="row card-group-row">
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
      </div>
      <div className="card  mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={`${tab.url}?id=${id}&name=${name}`}
              className={pathname.includes(tab.name) ? "active" : ""}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
          ))}          
        </div>
      </div> */}

      <div className="card mt-3">
        {children}
      </div>
    </>
  );
};

export default Layout;
