import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/course/[id]/enrollments/graphs/Graphs";
import EnrolledTable from "@/components/course/[id]/enrollments/EnrolledTable";
import PageHeader from "./PageHeader";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, true);

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <Graphs />
        <EnrolledTable
          courseId={courseId}
          data={
            fetchedData && fetchedData.courseApplicants
              ? fetchedData.courseApplicants
              : []
          }
        />
      </div>
    </>
  );
};

export default Body;
