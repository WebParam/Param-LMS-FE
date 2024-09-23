"use client";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/analytics/tables/course-applicants/ApplicantsTable";
import Link from "next/link";
import { getProjectAnalytics } from "@/app/lib/actions/project";
import { IProjectAnalytics } from "@/app/interfaces/project";
import { useEffect, useState } from "react";
import SkeletonGraphs from "@/components/skeleton/graphs-skeleton/SkeletonGraphs";
import Graphs from "@/components/analytics/graphs/videos/Graphs";
import StudentsTable from "@/components/analytics/tables/videos/StudentsTable";
import mockData from "@/components/analytics/tables/videos/data";

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
  const isFreemium = process.env.NEXT_PUBLIC_USER;
    const [tableData, setTableData] = useState(mockData)
  const baseUrl = isFreemium
    ? "https://freemium-student-qa.netlify.app"
    : "https://thooto-student-dev.netlify.app";

  const registrationUrl = `${baseUrl}/register?${isFreemium ? 'projectId' : 'courseId'}=${courseId}`;
  const loginUrl = `${baseUrl}/login`;
  const [courseData, setCourseData] = useState<IProjectAnalytics | undefined>(
    undefined
  );
  const [projectData, setProjectData] = useState<IProjectAnalytics | undefined>(
    undefined
  );

  const fetchCourseData = async () => {
    try {
      const fetchedData: IProjectAnalytics = await getEnrollments(
        courseId,
        false
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
        false
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

  const graphsData: IProjectAnalytics = isFreemium ?  projectData! : courseData! ;

  return (
    <ErrorBoundary>
      <div className="container page__container page__container page-section">

      <Graphs/>
            <div>
              <StudentsTable
                courseId={courseId}
                data={tableData}
              />
            </div>

        {/* {graphsData ? (
          <>
           
          </>
        ) : (
          <div>
          <SkeletonGraphs  />
          </div>
        )} */}
      </div>
    </ErrorBoundary>
  );
}

export default Page;
