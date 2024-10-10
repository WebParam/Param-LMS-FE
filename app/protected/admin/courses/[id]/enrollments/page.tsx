import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/analytics/graphs/enrolled-students/Graphs";
import EnrolledTable from "@/components/analytics/tables/enrolled-students/EnrolledTable";
import PageHeader from "./PageHeader";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, true);
  const data = {
    numberOfStudents: fetchedData.numberOfStudents,
    numbetOfStudentsEmployed: fetchedData.numbetOfStudentsEmployed,
    numberOfStudentsUnemployed: fetchedData.numberOfStudentsUnemployed,
    numberOfStudentsWithDisabilities: fetchedData.numberOfStudentsWithDisabilities,
  }
  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <Graphs graphData={data} />
        <div data-aos="slide-right">
        <EnrolledTable
          courseId={courseId}
          data={
            fetchedData && fetchedData.courseApplicants
              ? fetchedData.courseApplicants
              : []
          }
        />

        </div>
       
      </div>
    </>
  );
};

export default Body;
