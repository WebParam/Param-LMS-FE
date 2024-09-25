"use client";
import { useEffect, useState } from "react";
import Graphs from "@/components/analytics/graphs/videos/Graphs";
import StudentsTable from "@/components/analytics/tables/videos/StudentsTable";
import { getCourseWatchedVideos } from "@/app/lib/actions/watched-videos";

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
}

function Page({ params }: { params: { id: string } }) {
  const courseId = params.id;
  const [watchedVideosData, setWatchedVideosData] = useState<any>();

  const fetchWatchedVideosData = async () => {
    try {
      const fetchedData = await getCourseWatchedVideos(courseId);
      console.log("Fetched Wacthed Videos Data:", fetchedData);
      setWatchedVideosData(fetchedData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchWatchedVideosData();
  }, []);

  return (
    <ErrorBoundary>
      <div className="container page__container page__container page-section">
        <Graphs graphsData={watchedVideosData?.videoWatchGroupedCharts} />
        <div>
          <StudentsTable
            courseId={courseId}
            data={watchedVideosData?.videoWatchGroupedStudentsTable ?? []}
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
