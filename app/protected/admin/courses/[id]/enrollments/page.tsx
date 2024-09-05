import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import EnrolledTable from "@/components/analytics/tables/enrolled-students/EnrolledTable";
import PageHeader from "./PageHeader";
import { mockData } from "@/components/analytics/tables/enrolled-students/data";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IStudentsData = await getEnrollments(courseId, true);

  const useMockData = process.env.NEXT_PUBLIC_USER ? true : false;
  const tableData = useMockData
    ? mockData
    : fetchedData && fetchedData.courseApplicants
    ? fetchedData.courseApplicants
    : [];
  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
      <Graphs />
      <div>
          <EnrolledTable courseId={courseId} data={tableData} />
        </div>
      </div>
    </>
  );
};

export default Body;