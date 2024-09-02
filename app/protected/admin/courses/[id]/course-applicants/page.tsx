import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/analytics/tables/course-applicants/ApplicantsTable";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { mockData } from "@/components/analytics/tables/enrolled-students/data";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, false);
  const baseUrl = process.env.NEXT_PUBLIC_STUDENT_SITE
    ? process.env.NEXT_PUBLIC_STUDENT_SITE
    : "https://web-param-param-lms-student-qa.vercel.app";

  const registrationUrl = `${baseUrl}/register?courseId=${courseId}`;
  const loginUrl = `${baseUrl}/login`;

  const useMockData = process.env.NEXT_PUBLIC_USER ? true : false;
  const tableData = useMockData ? mockData : (fetchedData && fetchedData.courseApplicants ? fetchedData.courseApplicants : []);

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
        <Graphs />

        <div>
        <ApplicantsTable
          courseId={courseId}
          data={tableData}
        />{" "}
        </div>
       
      </div>
    </>
  );
};

export default Body;
