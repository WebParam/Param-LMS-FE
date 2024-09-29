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
import { getCourseVideoAnalytics } from "@/app/lib/actions/course";
import { IVideoAnalytics } from "@/app/interfaces/analytics";

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
  const [videoData, setVideoData] = useState<IVideoAnalytics>();

  const fetchVideoAnalyticsData = async () => {
    try {
      const videoAnalytics = await getCourseVideoAnalytics(
        "6669f0ff8759b480859c10a7"
      );
      setVideoData(videoAnalytics as IVideoAnalytics);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchVideoAnalyticsData();
  }, []);

  return (
    <ErrorBoundary>
      <div className="container page__container page__container page-section">
        <Graphs Graphdata = {videoData?.videoWatchGroupedCharts!} />
        <div>
          <StudentsTable courseId={courseId} data={videoData?.videoWatchGroupedStudentsTable! || []} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Page;
