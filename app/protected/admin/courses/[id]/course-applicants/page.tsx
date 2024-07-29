import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/course/[id]/course-applicants/ApplicantsTable";
import Graphs from "@/components/course/[id]/course-applicants/graphs/Graphs";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, false);

  return (
    <>
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
