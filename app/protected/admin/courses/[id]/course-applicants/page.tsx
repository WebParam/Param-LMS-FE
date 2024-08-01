import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/course/[id]/course-applicants/ApplicantsTable";
import Graphs from "@/components/course/[id]/course-applicants/graphs/Graphs";
import Link from "next/link";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, false);
  const devUrl = `https://web-param-param-lms-student-qa.vercel.app/register?courseId=${courseId}`;
  const prodUrl = `https://web-param-param-lms-student-main.vercel.app/register?courseId=${courseId}`;
  const registrationUrl =
    process.env.NEXT_PUBLIC_API_ENV == "production" ? prodUrl : devUrl;

  return (
    <>
      <div className="d-flex align-items-center px-3 mb-3">
        <div className="h5 mb-1 text-underline mr-2">
          Student Registration:{" "}
        </div>{" "}
        <Link target="_blank" className="text-underline" href={registrationUrl}>
          {registrationUrl}
        </Link>
      </div>

      <Graphs fetchedData={fetchedData} />
      <ApplicantsTable
        courseId={courseId}
        data={
          fetchedData && fetchedData.courseApplicants
            ? fetchedData.courseApplicants
            : []
        }
      />
    </>
  );
};

export default Body;
