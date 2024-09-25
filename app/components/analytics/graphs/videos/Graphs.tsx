"use client";
import ChartProvider from "@/components/analytics/graphs/ChartProvider";
import {
  options as studentProgressRateOptions,
  series as studentProgressRateSeries,
} from "@/app/components/analytics/graphs/course/StudentCourseProgress";
import PieChart from "@/components/analytics/graphs/PieChart";
import ChartLayout from "../ChartLayout";

type DataTiles = {
  name: string;
  icon: string;
  data: number;
};

export default function Graphs({Graphdata}:any) {

  return (
    <>
      <div className="row mb-lg-8pt">
        <div className=" col-md-12 card-group-row__col">
          <ChartLayout title="Progress Status" type="pie">
            <PieChart
              options={studentProgressRateOptions}
              series={studentProgressRateSeries}
            />
          </ChartLayout>
        </div>
      </div>
    </>
  );
}
