"use client";
import { getEnrollments } from "@/app/lib/actions/enrollments";
import ApplicantsTable from "@/components/analytics/tables/course-applicants/ApplicantsTable";
import Graphs from "@/components/analytics/graphs/course-applicants/Graphs";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { getProjectAnalytics } from "@/app/lib/actions/project";
import { IProjectAnalytics } from "@/app/interfaces/project";
import { useEffect, useState } from "react";
import SkeletonGraphs from "@/components/skeleton/graphs-skeleton/SkeletonGraphs";
import { useFlags } from "flagsmith/react";
import { useSearchParams } from "next/navigation";

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
  const flags = useFlags(["freemium"]); 
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId")!;
  //const isFreemium = flags.freemium.enabled && flags.freemium.value == true;
  const [isFreemium, setIsFreemium] = useState();





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
  }, [refreshId]);

  const graphsData: IProjectAnalytics = isFreemium ?  projectData! : courseData! ;
  useEffect(() => {
    const localValue = localStorage.getItem("isFreemium")!;
    const value = JSON.parse(localValue) ?? false;
    setIsFreemium(value);
  }, [refreshId]);

  return (
    <ErrorBoundary>
      <PageHeader />
      <div className="container page__container page__container page-section">
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
        {graphsData ? (
          <>
            <Graphs Graphdata={graphsData} />
            <div>
              <ApplicantsTable
                courseId={courseId}
                data={graphsData?.courseApplicants || []}
              />
            </div>
          </>
        ) : (
          <div>
          <SkeletonGraphs  />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default Page;
