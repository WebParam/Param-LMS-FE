import { IStudentsData } from "@/app/interfaces/courseApplicants";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/analytics/graphs/enrolled-students/Graphs";
import EnrolledTable from "@/components/analytics/tables/enrolled-students/EnrolledTable";
import PageHeader from "./PageHeader";
import { mockData } from "@/components/analytics/tables/enrolled-students/data";
import { getProjectApplicants } from "@/app/lib/actions/project";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const isFreemium = process.env.NEXT_PUBLIC_USER === "freemium"; 
  
  let tableData = [];

  if (isFreemium) {
    const projects = await getProjectApplicants(courseId);
    tableData = projects.filter((project:any) => project.status === 0);
  } else {
    const fetchedData: IStudentsData = await getEnrollments(courseId, true);
    tableData = fetchedData && fetchedData.courseApplicants ? fetchedData.courseApplicants : [];
  }
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
