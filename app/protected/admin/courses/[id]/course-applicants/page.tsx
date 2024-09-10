"use server"
import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/analytics/tables/course-applicants/ApplicantsTable";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { mockData } from "@/components/analytics/tables/enrolled-students/data";
import { getProjectAnalytics } from "@/app/lib/actions/project";
import { IProjectAnalytics } from "@/app/interfaces/project";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const baseUrl = process.env.NEXT_PUBLIC_STUDENT_SITE
    ? process.env.NEXT_PUBLIC_STUDENT_SITE
    : "https://web-param-param-lms-student-qa.vercel.app";

  const registrationUrl = `${baseUrl}/register?courseId=${courseId}`;
  const loginUrl = `${baseUrl}/login`;

  const fetchedData: IProjectAnalytics = await getEnrollments(courseId, true);
  const projectAnalytics: IProjectAnalytics = await getProjectAnalytics(
    courseId,
    false
  );
  const isFreemium = process.env.NEXT_PUBLIC_USER;
  const graphsData = isFreemium ? projectAnalytics : fetchedData;

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="d-flex card flex-column p-3 mb-3 text-success">
          <div className="d-flex align-items-center">
            <div className="font-weight-bolder text-underline mr-2">
              Student Registration:{" "}
            </div>{" "}
            <Link
              target="_blank"
              className="text-underline"
              href={registrationUrl}
            >
              {registrationUrl}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <div className="font-weight-bolder text-underline mr-2">
              Student Login:{" "}
            </div>{" "}
            <Link target="_blank" className="text-underline" href={loginUrl}>
              {loginUrl}
            </Link>
          </div>
        </div>
        <Graphs Graphdata={graphsData} />

        <div>
          <ApplicantsTable
            courseId={courseId}
            data={graphsData.courseApplicants}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
