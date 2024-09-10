"use client";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { getProjectAnalytics } from "@/app/lib/actions/project";
import { IProjectAnalytics } from "@/app/interfaces/project";
import { useEffect, useState } from "react";
import EnrolledTable from "@/components/analytics/tables/enrolled-students/EnrolledTable";

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any, errorInfo: any) => {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
}

function Page({ params }: { params: { id: string } }) {
  const courseId = params.id;
  const [courseData, setCourseData] = useState<IProjectAnalytics | undefined>(
    undefined
  );
  const [projectData, setProjectData] = useState<IProjectAnalytics | undefined>(
    undefined
  );
  const isFreemium = process.env.NEXT_PUBLIC_USER;

  const fetchCourseData = async () => {
    try {
      const fetchedData: IProjectAnalytics = await getEnrollments(
        courseId,
        true
      );
      console.log("Fetched Course Data:", fetchedData);
      setCourseData(fetchedData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const projectAnalytics: IProjectAnalytics = await getProjectAnalytics(
        courseId,
        true
      );
      console.log("Fetched Project Data:", projectAnalytics);
      setProjectData(projectAnalytics);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
    fetchProjectData();
  }, []);
  const graphsData = projectData;

  return (
    <ErrorBoundary>
      <PageHeader />
      <div className="container page__container page__container page-section">
        {graphsData ? (
          <>
            <Graphs Graphdata={graphsData} />
            <div>
              <EnrolledTable
                courseId={courseId}
                data={graphsData?.courseApplicants!}
              />
            </div>
          </>
        ) : (
          <div>Loading data...</div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default Page;
