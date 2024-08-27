import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/course/[id]/course-applicants/ApplicantsTable";
import Graphs from "@/components/course/[id]/course-applicants/graphs/Graphs";
import Link from "next/link";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, false);
  const baseUrl ="https://boundless.thooto.com"
  const registrationUrl = `${baseUrl}/register?courseId=${courseId}`;
  const loginUrl = `${baseUrl}/login`;

  return (
    <>
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
