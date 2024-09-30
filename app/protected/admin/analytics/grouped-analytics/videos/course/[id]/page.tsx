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
import Cookies from "universal-cookie";
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

function Page() {
  const cookies = new Cookies();
  const [videoData, setVideoData] = useState<IVideoAnalytics>();
  const courseId = cookies.get("co-id");

  const fetchVideoAnalyticsData = async () => {
    try {
      const videoAnalytics = await getCourseVideoAnalytics(courseId);
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
        <Graphs Graphdata={videoData?.videoWatchGroupedCharts!} />
        <div>
          <StudentsTable
            data={videoData?.videoWatchGroupedStudentsTable! || []}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Page;
