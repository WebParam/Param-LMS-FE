"use server"
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import EnrolledTable from "@/components/analytics/tables/enrolled-students/EnrolledTable";
import PageHeader from "./PageHeader";
import { mockData } from "@/components/analytics/tables/enrolled-students/data";
import { getProjectAnalytics } from "@/app/lib/actions/project";
import { IProjectAnalytics } from "@/app/interfaces/project";

const Body = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const fetchedData: IProjectAnalytics = await getEnrollments(courseId, true);
  const projectAnalytics: IProjectAnalytics = await getProjectAnalytics(
    "66d5967e6b0c61ffe2afaf76",
        true
  );
  const isFreemium = process.env.NEXT_PUBLIC_USER;
  const graphsData = isFreemium ? projectAnalytics : fetchedData;
  


  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
      <Graphs Graphdata={graphsData} />

        <div>
          <EnrolledTable
            courseId={courseId}
            data={graphsData.courseApplicants}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
